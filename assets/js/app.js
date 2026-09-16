/* =============================================================================
 *  app.js  ——  渲染引擎（一般不需要修改）
 *  读取 assets/data/content.js，按当前语言渲染整个页面。
 * ============================================================================= */
(function () {
  'use strict';

  var C = window.SITE_CONTENT;
  if (!C) { console.error('[homepage] content.js 未加载'); return; }

  /* ---------------------------------------------------------------- 状态 */
  var LANG_KEY = 'hp-lang';
  var THEME_KEY = 'hp-theme';
  var root = document.documentElement;

  var lang = readStore(LANG_KEY) || (
    (navigator.language || 'en').toLowerCase().indexOf('zh') === 0 ? 'zh' : 'en'
  );
  if (lang !== 'zh') lang = 'en';

  var pubFilter = 'all';

  /* ------------------------------------------------------------- 工具函数 */
  function readStore(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function writeStore(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  function $(sel, el) { return (el || document).querySelector(sel); }
  function $id(id) { return document.getElementById(id); }

  /* 双语取值：字符串直接用，对象按当前语言取，缺失回退英文 */
  function t(v) {
    if (v === null || v === undefined) return '';
    if (typeof v === 'string' || typeof v === 'number') return String(v);
    if (Array.isArray(v)) return v;
    if (v[lang] !== undefined && v[lang] !== null && v[lang] !== '') return v[lang];
    if (v.en !== undefined && v.en !== null) return v.en;
    if (v.zh !== undefined && v.zh !== null) return v.zh;
    return '';
  }

  function ui(group, key) {
    var src = (C.ui && C.ui[lang] && C.ui[lang][group]) || {};
    return src[key] || '';
  }

  /* 取「整块按语言组织」的对象，如 profile / about / contactText / footer */
  function L(block) {
    if (!block) return {};
    return block[lang] || block.en || block.zh || {};
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* 轻量行内标记：**加粗**、[文字](链接) */
  function inline(s) {
    var out = esc(s);
    out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (m, txt, url) {
      var hash = url.charAt(0) === '#';
      return '<a href="' + url + '"' + (hash ? '' : ' target="_blank" rel="noopener"') + '>' + txt + '</a>';
    });
    out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    return out;
  }

  /* 段落数组 -> HTML */
  function paragraphs(arr) {
    if (!arr || !arr.length) return '';
    return arr.map(function (p) { return '<p>' + inline(p) + '</p>'; }).join('');
  }

  /* 图标 */
  var ICONS = {
    mail: '<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3 7 9 6 9-6"/>',
    pin: '<path d="M12 21.5s7.5-6 7.5-11.5a7.5 7.5 0 1 0-15 0C4.5 15.5 12 21.5 12 21.5Z"/><circle cx="12" cy="10" r="2.6"/>',
    user: '<circle cx="12" cy="8" r="3.7"/><path d="M4.6 20.2a7.4 7.4 0 0 1 14.8 0"/>',
    home: '<path d="M3.2 10.6 12 3.4l8.8 7.2"/><path d="M5.6 9.4v10.2h12.8V9.4"/>',
    scholar: '<path d="M12 3.8 1.8 9 12 14.2 22.2 9 12 3.8Z"/><path d="M6.2 11.4v4.4c0 1.6 2.6 3 5.8 3s5.8-1.4 5.8-3v-4.4"/><path d="M22.2 9v5"/>',
    github: '<path fill="currentColor" stroke="none" d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.7 0C17 4.6 18 4.9 18 4.9c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5Z"/>',
    orcid: '<circle cx="12" cy="12" r="9.3"/><circle cx="8.1" cy="7.7" r="1.05" fill="currentColor" stroke="none"/><path d="M8.1 10.4v6.1M12 10.4v6.1m0-6.1h2.3a3.05 3.05 0 0 1 0 6.1H12"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="2.4"/><path d="M7.2 10.4v6.4M7.2 7.4v.01M11.4 16.8v-3.9a2.5 2.5 0 0 1 5 0v3.9"/>',
    twitter: '<path d="M4 4h3.7l4.4 6 5.2-6H20l-6.7 7.7L20.5 20h-3.7l-4.7-6.4L6.6 20H4l7-8L4 4Z"/>',
    cv: '<path d="M14 3H7.2A2.2 2.2 0 0 0 5 5.2v13.6A2.2 2.2 0 0 0 7.2 21h9.6a2.2 2.2 0 0 0 2.2-2.2V8l-5-5Z"/><path d="M14 3v5h5"/><path d="M8.6 13h6.8M8.6 16.4h4.6"/>',
    dblp: '<path d="M12 3.2 2.8 8 12 12.8 21.2 8 12 3.2Z"/><path d="M2.8 13.2 12 18l9.2-4.8"/>',
    zhihu: '<path d="M5 4.6h8.6M9.3 4.6c0 4-.6 7.2-3.6 10.4M6.6 10.4h5.4c0 4.4-2 7.4-5.4 9"/><path d="M14.6 8.2h5.2v9.4h-5.2z"/><path d="M17.2 17.6 15 21M17.2 17.6 19.4 21"/>',
    external: '<path d="M14 4h6v6"/><path d="m20 4-9 9"/><path d="M18.5 14v4.8a1.2 1.2 0 0 1-1.2 1.2H5.2A1.2 1.2 0 0 1 4 18.8V6.7a1.2 1.2 0 0 1 1.2-1.2H10"/>',
    star: '<path fill="currentColor" stroke="none" d="m12 3.4 2.65 5.42 5.95.86-4.3 4.2 1.02 5.93L12 16.98l-5.32 2.83 1.02-5.93-4.3-4.2 5.95-.86L12 3.4Z"/>',
    arrow: '<path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/>',
    sun: '<circle cx="12" cy="12" r="4.1"/><path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6"/>',
    moon: '<path d="M20.4 14.6A8.6 8.6 0 0 1 9.4 3.6a8.6 8.6 0 1 0 11 11Z"/>',
    code: '<path d="m9.2 6.4-5.4 5.6 5.4 5.6M14.8 6.4l5.4 5.6-5.4 5.6"/>'
  };

  function icon(name, size, cls) {
    var d = ICONS[name] || ICONS.external;
    return '<svg class="' + (cls || 'ico') + '" viewBox="0 0 24 24" width="' + (size || 14) +
      '" height="' + (size || 14) + '" fill="none" stroke="currentColor" stroke-width="1.6" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';
  }

  /* 链接图标推断 */
  function iconForLink(key, url) {
    if (ICONS[key]) return key;
    if (/github\.com/.test(url)) return 'github';
    if (/arxiv\.org/.test(url)) return 'external';
    if (/scholar\.google/.test(url)) return 'scholar';
    if (/^mailto:/.test(url)) return 'mail';
    if (/\.pdf(\?|$)/.test(url)) return 'cv';
    return 'external';
  }

  function linkObj(item) {
    return {
      label: item.label ? t(item.label) : (ui('linkLabels', item.key) || item.key || 'Link'),
      url: item.url,
      icon: item.icon || iconForLink(item.key, item.url)
    };
  }

  function chipHtml(raw, extraClass) {
    var l = linkObj(raw);
    if (!l.url) return '';
    return '<a class="chip ' + (extraClass || '') + '" href="' + esc(l.url) + '"' +
      (isExternal(l.url) ? ' target="_blank" rel="noopener"' : '') + '>' +
      icon(l.icon, 13) + '<span>' + esc(l.label) + '</span></a>';
  }

  function plinkHtml(raw) {
    var l = linkObj(raw);
    if (!l.url) return '';
    return '<a class="plink" href="' + esc(l.url) + '"' +
      (isExternal(l.url) ? ' target="_blank" rel="noopener"' : '') + '>' +
      icon(l.icon, 12) + '<span>' + esc(l.label) + '</span></a>';
  }

  /* 站外链接才开新标签页 */
  function isExternal(url) {
    if (!/^(https?:)?\/\//.test(url)) return false;
    try { return new URL(url, location.href).hostname !== location.hostname; }
    catch (e) { return true; }
  }

  /* 作者串：加粗本人 + 处理共同贡献符号 */
  function authorsHtml(str) {
    var out = esc(str || '');
    var names = (C.site && C.site.me) || [];
    names.forEach(function (n) {
      if (!n) return;
      var re = new RegExp('(^|[^\\w>])(' + n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')(?![\\w<])', 'g');
      out = out.replace(re, '$1<span class="me">$2</span>');
    });
    out = out.replace(/([*†‡])/g, '<span class="eq">$1</span>');
    return out;
  }

  function empty(arr) { return !arr || !arr.length; }

  /* ---------------------------------------------------------------- 主题 */
  function currentTheme() { return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }

  function applyTheme(theme, persist) {
    root.setAttribute('data-theme', theme);
    if (persist !== false) writeStore(THEME_KEY, theme);
    syncThemeBtn();
    var meta = $('meta[name="color-scheme"]');
    if (meta) meta.setAttribute('content', theme);
  }

  function syncThemeBtn() {
    var btn = $id('themeBtn');
    if (!btn) return;
    btn.innerHTML = icon(currentTheme() === 'dark' ? 'sun' : 'moon', 15);
    btn.setAttribute('aria-label', ui('misc', 'themeLabel'));
    btn.title = ui('misc', 'themeLabel');
  }

  /* ---------------------------------------------------------------- 语言 */
  function applyLang(next) {
    lang = next === 'zh' ? 'zh' : 'en';
    writeStore(LANG_KEY, lang);
    root.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
    render();
  }

  /* ================================================================ 渲染 */
  function render() {
    renderHead();
    renderAbout();
    renderNews();
    renderPubs();
    renderProjects();
    renderExperience();
    renderService();
    renderContact();
    renderFooter();
    renderNav();   /* 必须在各版块显隐确定之后 */
    bindSpy();
  }

  /* --- 顶部 / SEO --- */
  function renderHead() {
    var p = L(C.profile);
    var name = t(p.name) || 'Homepage';
    var role = t(p.role);

    root.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
    $id('brandName').textContent = t(p.shortName) || name;
    $id('brandSub').textContent = t(p.eyebrow) || role;

    /* 优先用 site.title（如 "Jinliang Gao's Homepage"），留空则回退为「姓名 · 头衔」 */
    document.title = (C.site && C.site.title) || (role ? name + ' · ' + role : name);
    var desc = t(p.bio) || '';
    var m = $('meta[name="description"]'); if (m) m.setAttribute('content', desc);
    var ogt = $('meta[property="og:title"]'); if (ogt) ogt.setAttribute('content', document.title);
    var ogd = $('meta[property="og:description"]'); if (ogd) ogd.setAttribute('content', desc);
    var can = $('link[rel="canonical"]');
    if (can && C.site && C.site.url) can.setAttribute('href', C.site.url);

    var lb = $id('langBtn');
    if (lb) {
      $id('langBtnText').textContent = ui('misc', 'toLang');
      lb.setAttribute('aria-label', ui('misc', 'langLabel'));
      lb.title = ui('misc', 'langLabel');
    }
    var skip = $('[data-skip]'); if (skip) skip.textContent = ui('misc', 'skip');
    syncThemeBtn();
  }

  /* --- 导航 --- */
  var NAV_ORDER = ['about', 'news', 'publications', 'projects', 'experience', 'service', 'contact'];

  function visibleSections() {
    return NAV_ORDER.filter(function (id) {
      var el = $id(id);
      return el && !el.hasAttribute('hidden');
    });
  }

  function renderNav() {
    var nav = $id('nav');
    nav.innerHTML = visibleSections().map(function (id) {
      var label = id === 'about' ? ui('nav', 'about') : ui('nav', id);
      return '<a href="#' + id + '" data-nav="' + id + '">' + esc(label || id) + '</a>';
    }).join('');
  }

  /* --- 关于 --- */
  function renderAbout() {
    var p = L(C.profile);
    var name = t(p.name) || '';
    $id('aboutName').textContent = name;
    /* eyebrow 留空则不显示该行 */
    var eb = t(p.eyebrow);
    var ebEl = $id('about-eyebrow');
    ebEl.textContent = eb;
    ebEl.style.display = eb ? '' : 'none';
    $id('aboutRole').textContent = t(p.role);

    /* 头像：始终渲染姓名缩写做兜底，照片加载失败时自动露出缩写 */
    var av = $id('avatar');
    var src = C.site && C.site.avatar;
    av.innerHTML = monogram(name) + (src
      ? '<img src="' + esc(src) + '" alt="' + esc(name) + '" onerror="this.remove();">'
      : '');

    /* 元信息 */
    var meta = [];
    if (t(p.affiliation)) meta.push([icon('home', 14), esc(t(p.affiliation)), '']);
    if (t(p.advisorLine)) meta.push([icon('user', 14), esc(t(p.advisorLine)), '']);
    if (C.contact) {
      if (t(C.contact.location)) meta.push([icon('pin', 14), esc(t(C.contact.location)), '']);
      if (C.contact.email) meta.push([icon('mail', 14), '<a href="mailto:' + esc(C.contact.email) + '">' + esc(C.contact.email) + '</a>', '']);
    }
    $id('aboutMeta').innerHTML = meta.map(function (m) {
      return '<li>' + m[0] + '<span>' + m[1] + '</span></li>';
    }).join('');

    /* 社交链接 */
    var links = ((C.contact && C.contact.links) || []).filter(function (l) { return l && l.url; });
    $id('aboutLinks').innerHTML = links.map(function (l) { return chipHtml(l); }).join('');

    /* 正文 + 兴趣 */
    var ab = L(C.about);
    $id('aboutBody').innerHTML = paragraphs(t(ab.paragraphs));

    var ints = t(ab.interests);
    var box = $id('aboutInterests');
    if (!empty(ints)) {
      box.hidden = false;
      box.innerHTML = '<p class="subhead">' + esc(ui('subheads', 'interests')) + '</p>' +
        '<div class="tag-row">' + ints.map(function (x) {
          return '<span class="tag">' + esc(t(x)) + '</span>';
        }).join('') + '</div>';
    } else {
      box.hidden = true; box.innerHTML = '';
    }
  }

  function monogram(name) {
    var s = String(name || '?').trim();
    var g;
    if (/[\u3400-\u9fff]/.test(s)) {
      g = s.charAt(0);                       /* 中文名取姓 */
    } else {
      var parts = s.split(/\s+/);
      g = (parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : s.slice(0, 2)).toUpperCase();
    }
    return '<span class="avatar-fallback">' + esc(g) + '</span>';
  }

  /* --- 动态 --- */
  function renderNews() {
    var sec = $id('news');
    var list = C.news || [];
    if (empty(list)) { sec.hidden = true; return; }
    sec.hidden = false;
    $id('news-h').textContent = ui('sections', 'news');
    $id('newsList').innerHTML = list.map(function (n) {
      var badge = t(n.badge);
      return '<li><span class="news-date">' + esc(n.date || '') + '</span>' +
        '<span class="news-text">' + (badge ? '<span class="news-badge">' + esc(badge) + '</span>' : '') +
        inline(t(n.text)) + '</span></li>';
    }).join('');
  }

  /* --- 论文 --- */
  function renderPubs() {
    var sec = $id('publications');
    var list = C.publications || [];
    if (empty(list)) { sec.hidden = true; return; }
    sec.hidden = false;
    $id('pub-h').textContent = ui('sections', 'publications');

    /* 有哪些类型 */
    var types = [];
    list.forEach(function (p) { if (p.type && types.indexOf(p.type) === -1) types.push(p.type); });
    var hasSel = list.some(function (p) { return p.selected; });

    var chips = [['all', ui('filters', 'all')]];
    ['conference', 'journal', 'preprint'].forEach(function (ty) {
      if (types.indexOf(ty) !== -1) chips.push([ty, ui('filters', ty)]);
    });
    if (hasSel) chips.push(['selected', ui('filters', 'selected')]);

    var shown = filterPubs(list);

    /* 只有一种类型且无精选时，筛选条没有意义，隐藏 */
    var showFilter = types.length > 1 || hasSel;
    $id('pubFilter').innerHTML = showFilter
      ? chips.map(function (c) {
          return '<button type="button" class="chip' + (pubFilter === c[0] ? ' is-on' : '') +
            '" data-filter="' + c[0] + '">' + esc(c[1]) + '</button>';
        }).join('') + '<span class="filter-count">' + shown.length + ' / ' + list.length + '</span>'
      : '';

    var ol = $id('pubList');
    if (!shown.length) {
      ol.innerHTML = '<li class="empty-hint">' + esc(ui('misc', 'noPubs')) + '</li>';
    } else {
      ol.innerHTML = shown.map(function (p, i) { return pubHtml(p, i + 1); }).join('');
    }

    /* 底部「查看全部」 */
    var more = C.publicationsMore;
    var existing = ol.parentNode.querySelector('.pub-more');
    if (existing) existing.remove();
    if (more && pubFilter === 'all') {
      var a = document.createElement('p');
      a.className = 'pub-more';
      a.style.cssText = 'margin-top:1.4rem;font-size:.86rem;';
      a.innerHTML = '<a class="richlink" href="' + esc(more) + '" target="_blank" rel="noopener">' +
        esc(ui('misc', 'openScholar')) + '</a>';
      ol.parentNode.insertBefore(a, ol.nextSibling);
    }

    /* 事件委托：筛选 */
    if (!$id('pubFilter').dataset.bound) {
      $id('pubFilter').dataset.bound = '1';
      $id('pubFilter').addEventListener('click', function (e) {
        var b = e.target.closest('[data-filter]');
        if (!b) return;
        pubFilter = b.dataset.filter;
        renderPubs();
      });
    }
  }

  function filterPubs(list) {
    var out = list.slice();
    out.sort(function (a, b) { return (b.year || 0) - (a.year || 0); });
    if (pubFilter === 'all') return out;
    if (pubFilter === 'selected') return out.filter(function (p) { return p.selected; });
    return out.filter(function (p) { return p.type === pubFilter; });
  }

  function pubHtml(p, idx) {
    var links = (p.links || []).filter(function (l) { return l && l.url; }).map(plinkHtml).join('');
    var title = inline(t(p.title));
    var url = (p.url || '');
    if (url) title = '<a href="' + esc(url) + '" target="_blank" rel="noopener">' + title + '</a>';
    var authors = t(p.authors) ? authorsHtml(t(p.authors)) : '';
    var venue = t(p.venue);

    /* 引用式排版：作者. 标题. 期刊（类别）. */
    return '<li class="pub">' +
      '<p class="pub-cite">' +
        (authors ? '<span class="pub-authors">' + authors + '</span>. ' : '') +
        (title ? '<span class="pub-title">' + title + '</span>. ' : '') +
        (venue ? '<span class="pub-venue">' + esc(venue) + '</span>' : '') +
      '</p>' +
      ((p.selected || p.note || links) ? '<div class="pub-meta">' +
        (p.selected ? '<span class="pub-star" title="Selected">' + icon('star', 12) + '</span>' : '') +
        (p.note ? '<span class="badge">' + esc(t(p.note)) + '</span>' : '') +
        links + '</div>' : '') +
    '</li>';
  }

  /* --- 项目 --- */
  function renderProjects() {
    var sec = $id('projects');
    var list = C.projects || [];
    if (empty(list)) { sec.hidden = true; return; }
    sec.hidden = false;
    $id('proj-h').textContent = ui('sections', 'projects');

    $id('projList').innerHTML = list.map(function (p) {
      var links = (p.links || []).filter(function (l) { return l && l.url; }).map(plinkHtml).join('');
      var name = esc(t(p.name));
      if (p.url) name = '<a href="' + esc(p.url) + '" target="_blank" rel="noopener">' + name + '</a>';
      return '<article class="proj">' +
        '<div class="proj-top">' +
          '<h3 class="proj-name">' + name + '</h3>' +
          (t(p.role) ? '<span class="proj-role">' + esc(t(p.role)) + '</span>' : '') +
          (p.period ? '<span class="proj-period">' + esc(p.period) + '</span>' : '') +
        '</div>' +
        (t(p.desc) ? '<p class="proj-desc">' + inline(t(p.desc)) + '</p>' : '') +
        ((p.tech || links) ? '<div class="proj-foot">' +
          (p.tech ? '<span class="proj-tech">' + esc(p.tech) + '</span>' : '') + links + '</div>' : '') +
      '</article>';
    }).join('');
  }

  /* --- 经历 --- */
  function renderExperience() {
    var sec = $id('experience');
    var ex = C.experience || {};
    var edu = ex.education || [], work = ex.work || [];
    if (empty(edu) && empty(work)) { sec.hidden = true; return; }
    sec.hidden = false;
    $id('exp-h').textContent = ui('sections', 'experience');

    var html = '';
    if (!empty(edu)) html += '<h3 class="subhead">' + esc(ui('subheads', 'education')) + '</h3>' + timelineHtml(edu);
    if (!empty(work)) html += '<h3 class="subhead">' + esc(ui('subheads', 'work')) + '</h3>' + timelineHtml(work);
    $id('expBody').innerHTML = html;
  }

  function timelineHtml(items) {
    return '<div class="timeline">' + items.map(function (it) {
      var pts = t(it.points);
      return '<div class="tl-item">' +
        '<div class="tl-top">' +
          '<span class="tl-role">' + esc(t(it.role)) + '</span>' +
          (t(it.org) ? '<span class="tl-org">' + esc(t(it.org)) + '</span>' : '') +
          (it.date ? '<span class="tl-date">' + esc(it.date) + '</span>' : '') +
        '</div>' +
        (t(it.loc) ? '<div class="tl-loc">' + icon('pin', 12) + ' ' + esc(t(it.loc)) + '</div>' : '') +
        (t(it.desc) ? '<p class="tl-desc">' + inline(t(it.desc)) + '</p>' : '') +
        (!empty(pts) ? '<div class="tl-desc"><ul>' + pts.map(function (x) {
          return '<li>' + inline(t(x)) + '</li>';
        }).join('') + '</ul></div>' : '') +
      '</div>';
    }).join('') + '</div>';
  }

  /* --- 荣誉与服务 --- */
  function renderService() {
    var sec = $id('service');
    var honors = C.honors || [];
    var svc = t(C.service), teach = t(C.teaching);
    if (empty(honors) && empty(svc) && empty(teach)) { sec.hidden = true; return; }
    sec.hidden = false;
    $id('svc-h').textContent = ui('sections', 'service');

    var html = '';
    if (!empty(honors)) {
      html += '<h3 class="subhead">' + esc(ui('subheads', 'honors')) + '</h3><ul class="plain-list">' +
        honors.map(function (h) {
          return '<li><span class="when">' + esc(h.date || '') + '</span><span>' + inline(t(h.text)) + '</span></li>';
        }).join('') + '</ul>';
    }

    var cols = '';
    if (!empty(svc)) {
      cols += '<div><h3 class="subhead">' + esc(ui('subheads', 'reviewing')) + '</h3><ul class="plain-list">' +
        svc.map(function (s) { return '<li><span>' + inline(t(s)) + '</span></li>'; }).join('') + '</ul></div>';
    }
    if (!empty(teach)) {
      cols += '<div><h3 class="subhead">' + esc(ui('subheads', 'teaching')) + '</h3><ul class="plain-list">' +
        teach.map(function (s) { return '<li><span>' + inline(t(s)) + '</span></li>'; }).join('') + '</ul></div>';
    }
    if (cols) html += '<div class="two-col">' + cols + '</div>';

    $id('svcBody').innerHTML = html;
  }

  /* --- 联系 --- */
  function renderContact() {
    var sec = $id('contact');
    var body = paragraphs(t(L(C.contactText).paragraphs));
    var ct = C.contact || {};

    var rows = '';
    if (ct.email) rows += row('mail', ui('misc', 'email'), '<a href="mailto:' + esc(ct.email) + '">' + esc(ct.email) + '</a>');
    if (t(ct.location)) rows += row('pin', ui('misc', 'address'), esc(t(ct.location)));
    if (t(ct.office)) rows += row('home', ui('misc', 'office'), esc(t(ct.office)));

    if (!body && !rows) { sec.hidden = true; return; }
    sec.hidden = false;
    $id('ct-h').textContent = ui('sections', 'contact');
    $id('contactBody').innerHTML = body + (rows ? '<div class="contact-card">' + rows + '</div>' : '');

    function row(ic, label, val) {
      return '<div class="contact-row">' + icon(ic, 15) + '<span>' + esc(label) + '</span><span>' + val + '</span></div>';
    }
  }

  /* --- 页脚 --- */
  function renderFooter() {
    var p = L(C.profile);
    var name = t(p.name) || '';
    var year = new Date().getFullYear();
    var left = ui('misc', 'copyright').replace('{year}', year).replace('{name}', esc(name));
    var note = t(L(C.footer).note);
    var upd = C.lastUpdated ? ' · ' + esc(ui('misc', 'updated')) + ' ' + esc(C.lastUpdated) : '';
    $id('footLeft').innerHTML = left + upd + (note ? '<br>' + esc(note) : '');
    $id('footTop').textContent = ui('misc', 'backTop');
  }

  /* ================================================================ 交互 */
  var spy = null;

  function bindSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll('[data-nav]'));
    var map = {};
    links.forEach(function (a) { map[a.dataset.nav] = a; });

    if (spy) spy.disconnect();
    var targets = visibleSections().map(function (id) { return $id(id); }).filter(Boolean);
    if (!targets.length || !('IntersectionObserver' in window)) return;

    spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('is-active'); });
        var a = map[en.target.id];
        if (a) a.classList.add('is-active');
      });
    }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

    targets.forEach(function (el) { spy.observe(el); });
  }

  function bind() {
    /* 语言 */
    $id('langBtn').addEventListener('click', function () {
      applyLang(lang === 'zh' ? 'en' : 'zh');
    });

    /* 主题 */
    $id('themeBtn').addEventListener('click', function () {
      applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
    });

    /* 顶栏阴影 */
    var head = $('.site-head');
    var onScroll = function () { head.classList.toggle('is-stuck', window.scrollY > 4); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* 键盘快捷键：L 切语言，D 切主题 */
    document.addEventListener('keydown', function (e) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      var tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;
      if (e.key === 'l' || e.key === 'L') applyLang(lang === 'zh' ? 'en' : 'zh');
      if (e.key === 'd' || e.key === 'D') applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
    });

    /* 跟随系统主题变化（仅当用户没手动选过） */
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var listen = function (ev) { if (!readStore(THEME_KEY)) applyTheme(ev.matches ? 'dark' : 'light'); };
    if (mq.addEventListener) mq.addEventListener('change', listen);
    else if (mq.addListener) mq.addListener(listen);
  }

  /* GA4（可选） */
  function analytics() {
    var id = C.site && C.site.analytics;
    if (!id) return;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', id);
  }

  /* ---------------------------------------------------------------- 启动 */
  var storedTheme = readStore(THEME_KEY);
  applyTheme(storedTheme || currentTheme(), !!storedTheme);
  bind();
  render();
  analytics();
})();
