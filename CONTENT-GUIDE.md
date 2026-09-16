# content.js 修改指南

只需要维护一个文件：**`assets/data/content.js`**。
`index.html`（页面骨架）、`assets/js/app.js`（渲染）、`assets/css/style.css`（样式）都无需改动。

改完保存后：`git add .` → `git commit -m "说明"` → `git push`，等约 1 分钟线上生效。

## 通用规则

- 文字写成 `{ en: "英文", zh: "中文" }`，两种语言都会显示；
  只写一个字符串（如 `"GitHub"`）则两种语言共用。
- **数组为空 / 字符串留空 => 对应区块自动隐藏**，导航里也不会出现该项。
- 部分文本支持简单标记：
  - `**加粗**` → 加粗
  - `[文字](#contact)` → 站内链接
  - `[文字](https://... )` → 站外链接（新标签页打开）

---

## 1) `site` — 站点全局设置

| 字段 | 含义 | 说明 |
|---|---|---|
| `url` | 网站地址 | 域名，如 `"https://xtdzs.github.io/"`，用于搜索引擎收录 |
| `avatar` | 头像路径 | 照片放 `assets/img/avatar.jpg` 后填路径；留空 `""` 则显示姓名缩写 |
| `me` | 你的中英文名 | 数组，如 `["Jinliang Gao", "高锦梁"]`；论文作者串命中会**加粗** |
| `analytics` | Google Analytics ID | 留 `""` 关闭；想统计访客填 `"G-XXXXXXXXXX"` |

## 2) `ui` — 界面文案

`en` / `zh` 两块，内容一一对应，一般不动，除非改按钮/标题文字：

| 子项 | 内容 |
|---|---|
| `nav` | 导航栏文字（关于/动态/论文…） |
| `sections` | 各版块大标题 |
| `subheads` | 版块内小标题（研究方向/教育经历…） |
| `filters` | 论文筛选按钮（全部/会议/期刊/预印本/精选） |
| `linkLabels` | 链接按钮文字（Paper/PDF/Code/代码…） |
| `misc` | 杂项（版权、回到顶部、邮箱等） |

## 3) `profile` — 页面顶部个人信息

| 字段 | 含义 |
|---|---|
| `name` | 姓名 |
| `shortName` | 导航栏左上角短名字；留空 `""` 自动用 `name` |
| `eyebrow` | 名字上方小标签，如「人工智能 / Artificial Intelligence」 |
| `role` | 职称，如「模式识别与智能系统 博士研究生」 |
| `affiliation` | 单位 |
| `advisorLine` | 导师信息；留空 `""` 不显示 |
| `bio` | 一句话自我介绍 |

## 4) `contact` — 联系方式

| 字段 | 含义 |
|---|---|
| `email` | 邮箱（顶部+联系版块都会显示） |
| `location` | 城市，如 `{ en: "Beijing, China", zh: "中国 · 北京" }` |
| `office` | 办公室；留空不显示 |
| `links` | 社交链接数组，每条 `{ icon, label, url }`；不需要的整行删除，`url` 留空自动隐藏 |

可用 `icon`：`mail / github / scholar / orcid / linkedin / twitter / cv / home / dblp / zhihu`

```js
{ icon: "mail",   label: { en: "Email", zh: "邮箱" }, url: "mailto:gaojinliang666@gmail.com" },
{ icon: "github", label: "GitHub",                    url: "https://github.com/Xtdzs" }
```

## 5) `about` — 关于我

| 字段 | 含义 |
|---|---|
| `paragraphs` | 段落数组，每段一个字符串，支持 `**加粗**` 与 `[文字](#链接)` |
| `interests` | 研究兴趣标签数组 |

## 6) `news` — 动态（最新放最上面）

```js
{
  date:  "2026.09",                  // 时间，纯展示随便写
  badge: { en: "News", zh: "动态" },  // 可选小徽章；不需要可删除该行
  text:  { en: "...", zh: "..." }     // 内容，支持 **加粗**
}
```

## 7) `publications` — 论文

每条对象：

```js
{
  type:    "journal",                            // conference 会议 / journal 期刊 / preprint 预印本
  title:   { en: "...", zh: "..." },             // 标题
  authors: { en: "...", zh: "..." },             // 作者串（命中 site.me 会自动加粗）
  venue:   { en: "...", zh: "..." },             // 发表处/期刊
  note:    { en: "Oral", zh: "口头报告" },        // （可选）右侧小徽章
  selected: true,                                 // （可选）打星标 ▸ 可被"精选"筛选
  links:   [ { key: "arxiv", url: "..." } ]       // （可选）链接按钮
}
```

`links` 可用 `key`：`paper / pdf / arxiv / code / demo / data / project / slides / video / doi / bibtex / cv`

## 8) `publicationsMore` — 「查看全部」

论文列表底部指向 Google Scholar 的链接；留 `""` 隐藏。

## 9) `experience` — 教育与经历

`education` 和 `work` 两个数组，每条：

```js
{
  role:   { en: "Ph.D. in ...", zh: "..." },   // 头衔
  org:    { en: "...", zh: "..." },            // 机构
  date:   "2026 — 2031 (expected)",            // 时间
  loc:    { en: "Beijing", zh: "北京" },        // 地点；可省略
  points: { en: ["要点1"], zh: ["要点1"] }      // 要点列表；可省略
}
```

两个数组都空 => 整版块隐藏。教育经历始终排在经历版块最上面。

## 10) `honors` — 荣誉

每条 `{ date: "2024", text: { en, zh } }`。

`service`（学术服务）与 `teaching`（助教教学）留空 `[]` 即不出现在页面上——**目前就是关闭状态**。

## 11) `contactText` — 联系版块正文

`paragraphs` 数组，支持 `**加粗**` 与 `[文字](#链接)`。

## 12) `footer` + `lastUpdated`

- `footer.note`: 页脚说明文字，可删
- `lastUpdated`: 「最后更新」日期，格式 `"2026-09-16"`；留空 `""` 隐藏

---

## 常见操作示例

**加一条论文**：复制 `publications` 里任意一项，改 `title / authors / venue`，按分量排好顺序。

**加一条经历**：往 `experience.education` 或 `experience.work` 数组加一个对象。

**展示项目版块**：给 `projects` 数组加内容即可，每条结构：

```js
{
  name:   { en: "...", zh: "..." },     // 项目名
  role:   { en: "...", zh: "..." },     // 你的角色（可选）
  period: "2025 — Now",                 // 时间（可选）
  desc:   { en: "...", zh: "..." },     // 一句话描述
  tech:   "PyTorch · CUDA",             // 技术栈（可选）
  links:  [ { key: "code", url: "..." } ]  // 链接按钮（可选）
}
```

`projects` 为空数组 => 项目版块与导航项自动隐藏。