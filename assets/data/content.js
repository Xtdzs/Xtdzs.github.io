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
        doi: "DOI", bibtex: "BibTeX", cv: "简历", scholar: "学术"
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
        openScholar: "完整列表见 Google Scholar →"
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
      eyebrow: "Artificial Intelligence",
      role: "Ph.D. Student in Pattern Recognition and Intelligent Systems",
      affiliation: "Institute of Automation, Chinese Academy of Sciences",
      advisorLine: "",
      bio: "Ph.D. student at the Institute of Automation, CAS, working on efficient post-training of large language models."
    },
    zh: {
      name: "高锦梁",
      shortName: "",
      eyebrow: "人工智能",
      role: "模式识别与智能系统 博士研究生",
      affiliation: "中国科学院自动化研究所",
      advisorLine: "",
      bio: "中国科学院自动化研究所博士研究生，研究方向为大语言模型高效后训练与智能体应用。"
    }
  },

  /* 联系方式：填了才显示 */
  contact: {
    email: "gaojinliang666@gmail.com",
    location: { en: "Beijing, China", zh: "中国 · 北京" },
    office: { en: "", zh: "" },
    links: [
      { icon: "mail",   label: { en: "Email", zh: "邮箱" }, url: "mailto:gaojinliang666@gmail.com" },
      { icon: "github", label: "GitHub", url: "https://github.com/Xtdzs" }
    ]
  },

  /* ==========================================================================
     4) 关于我（长文本）
     ========================================================================== */
  about: {
    en: {
      paragraphs: [
        "I am a Ph.D. student in Pattern Recognition and Intelligent Systems at the Institute of Automation, Chinese Academy of Sciences. I received my B.Eng. from the School of Computer Science, Sichuan University, in 2026.",
        "My current research focuses on efficient post-training of large language models and their agent applications. Before that, I gained research experience in reinforcement learning, computer vision, and medical big data.",
        "I am open to research collaboration and exchange — feel free to [contact me](#contact)."
      ],
      interests: [
        "Efficient Post-training of LLMs",
        "LLM Agents & Applications",
        "Reinforcement Learning"
      ]
    },
    zh: {
      paragraphs: [
        "我是中国科学院自动化研究所模式识别与智能系统专业的博士研究生，2026 年本科毕业于四川大学计算机学院。",
        "目前的研究集中在大语言模型的高效后训练与智能体应用；此前在强化学习、计算机视觉与医学大数据方向有过一些研究经历。",
        "欢迎交流与合作，随时[联系我](#contact)。"
      ],
      interests: [
        "大语言模型高效后训练",
        "LLM 智能体与应用",
        "强化学习"
      ]
    }
  },

  /* ==========================================================================
     5) 动态 News（最新的放最上面）
     ========================================================================== */
  news: [
    {
      date: "2026.09",
      badge: { en: "News", zh: "动态" },
      text: {
        en: "Started the Ph.D. program at the Institute of Automation, Chinese Academy of Sciences.",
        zh: "开始在中国科学院自动化研究所攻读博士学位。"
      }
    },
    {
      date: "2026.06",
      text: {
        en: "Received the B.Eng. degree from Sichuan University.",
        zh: "本科毕业于四川大学。"
      }
    }
  ],

  /* ==========================================================================
     6) 论文 Publications
     ========================================================================== */
  publications: [
    {
      type: "journal",
      title: "MSG-Net: Structure-Guided Enhancement for Underwater Images based on Multi-view Feature Interaction",
      authors: { en: "Jinliang Gao (second author)", zh: "高锦梁（第二作者）" },
      venue: { en: "IEEE Transactions on Multimedia (SCI Q1)", zh: "IEEE Transactions on Multimedia（SCI 一区）" }
    },
    {
      type: "journal",
      title: "LLM-Driven Large-Scale Spectrum Access",
      authors: { en: "Jinliang Gao (second author)", zh: "高锦梁（第二作者）" },
      venue: { en: "IEEE Transactions on Mobile Computing (SCI Q1)", zh: "IEEE Transactions on Mobile Computing（SCI 一区）" }
    },
    {
      type: "journal",
      title: "Differences in the epidemiology and survival of patients with colorectal cancer between China and the United States: a large cross-sectional study",
      authors: { en: "Jinliang Gao (third author)", zh: "高锦梁（第三作者）" },
      venue: { en: "Updates in Surgery (JCR Q2)", zh: "Updates in Surgery（JCR 二区）" }
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
        date: "2026 — 2031 (expected)",
        loc:  { en: "Beijing", zh: "北京" },
        points: {
          en: ["Focus: efficient post-training and agent applications of large language models."],
          zh: ["研究方向：大语言模型高效后训练与智能体应用。"]
        }
      },
      {
        role: { en: "B.Eng. in Computer Science and Technology", zh: "计算机科学与技术 工学学士" },
        org:  { en: "Sichuan University", zh: "四川大学" },
        date: "2022 — 2026",
        loc:  { en: "Chengdu", zh: "成都" },
        points: {
          en: ["Honors track (\"Bajian\" program), School of Computer Science."],
          zh: ["计算机学院「拔尖计划」。"]
        }
      }
    ],

    work: [
      {
        role: { en: "AI Engineer (Intern)", zh: "AI 工程师（实习）" },
        org:  { en: "Lenovo Chengdu R&D Center", zh: "联想成都研发中心" },
        date: "2025.05 — 2025.08",
        points: {
          en: ["Developed machine-learning algorithms and AI-agent applications for product needs."],
          zh: ["面向产品需求进行机器学习算法与 AI Agent 应用的开发。"]
        }
      },
      {
        role: { en: "Research Intern", zh: "科研实习" },
        org:  { en: "National Key Lab of Visual Synthesis of Graphic Images, Sichuan University", zh: "四川大学视觉合成图形图像技术国家级重点实验室" },
        date: "2024.02 — 2025.02",
        points: {
          en: ["Research on reinforcement learning and computer vision."],
          zh: ["参与强化学习与计算机视觉方向的研究工作。"]
        }
      }
    ]
  },

  /* ==========================================================================
     9) 荣誉 —— 只保留少量可信的竞赛结果；不展示学术服务/教学
     ========================================================================== */
  honors: [
    { date: "2024", text: { en: "National Undergraduate Mathematical Contest in Modeling (CUMCM), Sichuan First Prize", zh: "全国大学生数学建模竞赛（高教社杯）四川赛区一等奖" } },
    { date: "2024", text: { en: "Tencent Kaiwu AI Global Open Competition, Traffic-Signal Scheduling track, National 7th", zh: "腾讯开悟人工智能全球公开赛 智能交通信号灯调度赛道 全国第七名" } },
    { date: "2023", text: { en: "Tencent Kaiwu AI National Open Competition, Game-Theory track, National 3rd", zh: "腾讯开悟人工智能全国公开赛 算法博弈赛道 全国第三名" } }
  ],

  service: { en: [], zh: [] },
  teaching: { en: [], zh: [] },

  /* ==========================================================================
     10) 联系版块正文 + 页脚
     ========================================================================== */
  contactText: {
    en: {
      paragraphs: [
        "I welcome conversations about large language models, agents, or research collaboration. **Email** is the fastest way to reach me."
      ]
    },
    zh: {
      paragraphs: [
        "欢迎就大语言模型、智能体或相关科研合作与我交流，**邮件**是最快的联系方式。"
      ]
    }
  },

  footer: {
    en: { note: "Built with plain HTML, CSS and JavaScript. Hosted on GitHub Pages." },
    zh: { note: "本站由纯 HTML / CSS / JavaScript 构建，托管于 GitHub Pages。" }
  },

  lastUpdated: "2026-09-13"
};
