/* =============================================================================
 *  content.js  ——  全站唯一需要维护的文件
 *  ---------------------------------------------------------------------------
 *  · 所有文字都在这里，中英双语并排写：{ en: "...", zh: "..." }
 *  · 只写一种语言也可以，直接写字符串即可（会自动用于两种语言）
 *  · 数组为空 => 对应版块自动隐藏，导航里也不会出现
 *  · 改完保存刷新即可，无需构建、无需服务器
 * ============================================================================= */

window.SITE_CONTENT = {

  /* ==========================================================================
     1) 站点全局设置
     ========================================================================== */
  site: {
    /* 浏览器标签页/分享卡显示的网页标题 */
    title: "Jinliang Gao's Homepage",
    /* GitHub Pages 地址，用于 SEO / 分享卡片；如不是这个请改成你的真实地址 */
    url: "https://xtdzs.github.io/",
    /* 头像：assets/img/avatar.jpg（已放入）；留空则显示姓名缩写 */
    avatar: "assets/img/avatar.jpg",
    /* 想在论文里加粗显示的自己的名字（中英文都列上） */
    me: ["Jinliang Gao", "高锦梁"],
    /* Google Analytics 4 的 ID；留空则不启用 */
    analytics: ""
  },

  /* ==========================================================================
     2) 界面文案（按钮、栏目标题等）
     ========================================================================== */
  ui: {
    en: {
      nav: {
        about: "About",
        news: "News",
        publications: "Publications",
        projects: "Projects",
        experience: "Experience",
        service: "Honors",
        contact: "Contact"
      },
      sections: {
        news: "News",
        publications: "Publications",
        projects: "Projects",
        experience: "Experience",
        service: "Honors & Awards",
        contact: "Contact"
      },
      subheads: {
        interests: "Research Interests",
        education: "Education",
        work: "Experience",
        honors: "Honors & Awards",
        reviewing: "Professional Service",
        teaching: "Teaching"
      },
      filters: { all: "All", conference: "Conference", journal: "Journal", preprint: "Preprint", selected: "Selected" },
      linkLabels: {
        paper: "Paper", pdf: "PDF", arxiv: "arXiv", code: "Code", demo: "Demo",
        data: "Data", project: "Project", slides: "Slides", video: "Video",
        doi: "DOI", bibtex: "BibTeX", cv: "CV", scholar: "Scholar"
      },
      misc: {
        toLang: "中文",
        langLabel: "Switch to Chinese",
        themeLabel: "Toggle dark mode",
        backTop: "Back to top ↑",
        copyright: "© {year} {name}. All rights reserved.",
        updated: "Last updated",
        noPubs: "Nothing here yet.",
        items: "items",
        email: "Email",
        office: "Office",
        address: "Address",
        skip: "Skip to content",
        equalContribution: "† Equal contribution.",
        openScholar: "Full list on Google Scholar →"
      }
    },

    zh: {
      nav: {
        about: "关于",
        news: "动态",
        publications: "论文",
        projects: "项目",
        experience: "经历",
        service: "荣誉",
        contact: "联系"
      },
      sections: {
        news: "近期动态",
        publications: "学术论文",
        projects: "研究项目",
        experience: "学习与工作经历",
        service: "竞赛与荣誉",
        contact: "联系方式"
      },
      subheads: {
        interests: "研究方向",
        education: "教育经历",
        work: "科研与工作经历",
        honors: "竞赛与荣誉",
        reviewing: "学术服务",
        teaching: "助教与教学"
      },
      filters: { all: "全部", conference: "会议", journal: "期刊", preprint: "预印本", selected: "精选" },
      linkLabels: {
        paper: "论文", pdf: "PDF", arxiv: "arXiv", code: "代码", demo: "演示",
        data: "数据", project: "项目", slides: "幻灯片", video: "视频",
        doi: "DOI", bibtex: "BibTeX", cv: "简历", scholar: "谷歌学术"
      },
      misc: {
        toLang: "EN",
        langLabel: "切换到英文",
        themeLabel: "切换深色模式",
        backTop: "回到顶部 ↑",
        copyright: "© {year} {name}，保留所有权利。",
        updated: "最后更新",
        noPubs: "暂无内容。",
        items: "篇",
        email: "邮箱",
        office: "办公室",
        address: "地址",
        skip: "跳到正文",
        equalContribution: "† 表示共同贡献。",
        openScholar: "完整列表见谷歌学术 →"
      }
    }
  },

  /* ==========================================================================
     3) 个人信息（页面顶部）
     ========================================================================== */
  profile: {
    en: {
      name: "Jinliang Gao",
      shortName: "",
      eyebrow: "",
      role: "Ph.D. Student in Pattern Recognition and Intelligent Systems",
      affiliation: "Institute of Automation, Chinese Academy of Sciences",
      advisorLine: "",
      bio: "Ph.D. student at the Institute of Automation, CAS, working on reinforcement learning of large language models."
    },
    zh: {
      name: "高锦梁",
      shortName: "",
      eyebrow: "",
      role: "模式识别与智能系统 博士研究生",
      affiliation: "中国科学院自动化研究所",
      advisorLine: "",
      bio: "中国科学院自动化研究所博士研究生，研究方向为大模型强化学习。"
    }
  },

  /* 联系方式：填了才显示 */
  contact: {
    email: "gaojinliang26@ia.ac.cn",
    location: { en: "Beijing, China", zh: "中国 · 北京" },
    office: { en: "", zh: "" },
    links: [
      { icon: "mail",   label: { en: "Email", zh: "邮箱" }, url: "mailto:gaojinliang26@ia.ac.cn" },
      { icon: "github", label: "GitHub", url: "https://github.com/Xtdzs" },
      { icon: "scholar", label: { en: "Scholar", zh: "谷歌学术" }, url: "https://scholar.google.com/citations?user=N6iXADEAAAAJ" }
    ]
  },

  /* ==========================================================================
     4) 关于我（长文本）
     ========================================================================== */
  about: {
    en: {
      paragraphs: [
        "I am a Ph.D. student in Pattern Recognition and Intelligent Systems at the Institute of Automation, Chinese Academy of Sciences. I received my B.Eng. from the School of Computer Science, Sichuan University.",
        "My current research focuses on reinforcement learning for large models, and I am deeply interested in the emergence of machine intelligence.",
        "I am open to research collaboration and exchange — feel free to [contact me](#contact)."
      ],
      interests: [
        "Large Language Models",
        "Reinforcement Learning"
      ]
    },
    zh: {
      paragraphs: [
        "我是中国科学院自动化研究所模式识别与智能系统专业的博士研究生，本科毕业于四川大学计算机学院。",
        "当前研究方向为大模型强化学习，同时对机器的智能涌现有浓厚兴趣。",
        "欢迎交流与合作，随时[联系我](#contact)。"
      ],
      interests: [
        "大语言模型",
        "强化学习"
      ]
    }
  },

  /* ==========================================================================
     5) 动态 News —— 暂空，版块自动隐藏；以后有新动态再加
     ========================================================================== */
  news: [],

  /* ==========================================================================
     6) 论文 Publications
     ========================================================================== */
  publications: [
    {
      type: "preprint",
      title: "SDO: Structure-Aware Data Organization for Efficient LLM Post-Training",
      authors: { en: "Jinliang Gao, et al.", zh: "高锦梁 等" },
      venue: { en: "arXiv preprint", zh: "arXiv 预印本" },
      time: { "year": 2026, "month": 7},
      links: [
        { key: "arxiv", url: "https://arxiv.org/abs/2607.27273v1" }
      ]
    },
    {
      type: "journal",
      title: "MSG-Net: Structure-Guided Enhancement for Underwater Images based on Multi-view Feature Interaction",
      authors: { en: "Jinliang Gao, et al.", zh: "高锦梁 等" },
      venue: { en: "IEEE Transactions on Multimedia", zh: "IEEE Transactions on Multimedia, CCF-A, SCI Q1" },
      time: { "year": 2026, "month": 1},
      links: [
        { key: "doi", url: "https://doi.org/10.1109/TMM.2026.3664995" }
      ]
    },
    {
      type: "journal",
      title: "LLM-Driven Large-Scale Spectrum Access",
      authors: { en: "Jinliang Gao, et al.", zh: "高锦梁 等" },
      venue: { en: "IEEE Transactions on Mobile Computing", zh: "IEEE Transactions on Mobile Computing, CCF-A" },
      time: { "year": 2026, "month": 1},
      links: [
        { key: "arxiv", url: "https://arxiv.org/abs/2604.13132" }
      ]
    },
    {
      type: "journal",
      title: "Differences in the epidemiology and survival of patients with colorectal cancer between China and the United States: a large cross-sectional study",
      authors: { en: "Jinliang Gao, et al.", zh: "高锦梁 等" },
      venue: { en: "Updates in Surgery", zh: "Updates in Surgery, JCR Q2" },
      time: { "year": 2026, "month": 1},
      links: [
        { key: "doi", url: "https://doi.org/10.1007/s13304-024-02024-w" }
      ]
    }
  ],

  /* 论文列表底部「查看全部」链接；没有 Google Scholar 就留空 */
  publicationsMore: "",

  /* ==========================================================================
     7) 项目 Projects —— 暂空，版块自动隐藏
     ========================================================================== */
  projects: [],

  /* ==========================================================================
     8) 经历 Experience
     ========================================================================== */
  experience: {
    education: [
      {
        role: { en: "Ph.D. in Pattern Recognition and Intelligent Systems", zh: "模式识别与智能系统 博士研究生" },
        org:  { en: "Institute of Automation, Chinese Academy of Sciences", zh: "中国科学院自动化研究所" },
        date: "2026 — 2031 (expected)"
      },
      {
        role: { en: "B.Eng. in Computer Science and Technology", zh: "计算机科学与技术 工学学士" },
        org:  { en: "Sichuan University", zh: "四川大学" },
        date: "2022 — 2026"
      }
    ],

    work: [
      {
        role: { en: "Development Intern", zh: "开发实习生" },
        org:  { en: "Lenovo Chengdu R&D Center", zh: "联想成都研发中心" },
        date: "2025.05 — 2025.08",
        points: {
          en: ["AI Agent"],
          zh: ["AI Agent"]
        }
      },
      {
        role: { en: "Research Intern", zh: "科研实习" },
        org:  { en: "National Key Lab of Visual Synthesis of Graphic Images, Sichuan University", zh: "四川大学视觉合成图形图像技术国家级重点实验室" },
        date: "2024.02 — 2025.02",
        points: {
          en: ["Engaged in learning and research on reinforcement learning, computer vision, and related topics"],
          zh: ["参与学习并研究强化学习、计算机视觉等内容"]
        }
      }
    ]
  },

  /* ==========================================================================
     9) 荣誉 —— 只保留少量可信的竞赛结果；不展示学术服务/教学
     ========================================================================== */
  honors: [
    { date: "2026",    text: { en: "Outstanding Undergraduate Thesis, Sichuan University", zh: "本科优秀毕业论文" } },
    { date: "2024.09", text: { en: "CUMCM (Higher Education Cup) Mathematical Contest in Modeling, Sichuan First Prize", zh: "全国大学生数学建模竞赛（高教社杯）四川省一等奖" } },
    { date: "2024.08", text: { en: "Tencent AI Arena Global Open Competition, Intelligent Traffic Signal Scheduling Track — National 7th", zh: "腾讯开悟人工智能全球公开赛 智能交通信号灯调度赛道 全国第七" } },
    { date: "2024-05", text: { en: "The 21st (Tencent Cup) Sichuan University Programming Contest, Final Silver Award", zh: "第二十一届（腾讯杯）四川大学程序设计竞赛 决赛银奖" } },
    { date: "2023.12", text: { en: "Tencent AI Arena AI National Open Competition, Game-Theory Track (Advanced) — 3rd in National Final", zh: "腾讯开悟人工智能全国公开赛 算法博弈赛道高级组 总决赛全国第三" } },
    { date: "2023.09", text: { en: "CUMCM (Higher Education Cup) Mathematical Contest in Modeling, Sichuan Second Prize", zh: "全国大学生数学建模竞赛（高教社杯）四川省二等奖" } }
  ],

  service: { en: [], zh: [] },
  teaching: { en: [], zh: [] },

  /* ==========================================================================
     10) 联系版块正文 + 页脚
     ========================================================================== */
  contactText: {
    en: {
      paragraphs: [
        "I welcome conversations about reinforcement learning for large models, or research collaboration."
      ]
    },
    zh: {
      paragraphs: [
        "欢迎就大模型强化学习及相关科研合作与我交流。"
      ]
    }
  },

  footer: {
    en: { note: "Built with plain HTML, CSS and JavaScript. Hosted on GitHub Pages." },
    zh: { note: "本站由纯 HTML / CSS / JavaScript 构建，托管于 GitHub Pages。" }
  },

  lastUpdated: "2026-09-13"
};
