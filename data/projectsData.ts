type ProjectCategory = 'website' | 'tools' | 'personal' | 'others'

type Project = {
  title: string
  description: string
  imgSrc: string
  href: string
  videoUrl?: string
  tags?: string[]
  feats?: string[]
  category: ProjectCategory
}

type ProjectsData = {
  [locale: string]: Project[]
}

const projectsData: ProjectsData = {
  en: [
    {
      title: 'ecomerce_demo for nextjs ',
      description: `Full stack ecomerce demo for nextjs+TypeScript+Tailwind CSS+Redis+PostgreSQL+MeiliSearch+Checkout with PayPal and Stripe`,
      imgSrc: '/static/images/QQ_1731220326601.png',
      href: 'https://github.com/JoeJoeyMa/ecomerce_demo',
      tags: ['NextJS', 'TypeScript', 'Tailwind CSS', 'Redis', 'PostgreSQL'],
      feats: ['PayPal Integration', 'Stripe Checkout', 'MeiliSearch'],
      category: 'website',
    },
    {
      title: 'ERP/OS/Business-Finance Integration/Inventory and Logistics Management SaaS',
      description: `Spearheaded the frontend refactoring of an ERP system (infrastructure, redevelopment, and deployment). Addressed legacy architecture complexities, high concurrency, and cross-department integrations in a containerized, disaster-tolerant deployment environment.`,
      imgSrc: '/static/images/QQ_1731221573772.png',
      href: '/blog/engineering/Logistics-system',
      category: 'website',
    },
    {
      title: 'AI Prompt-based Business Data Visualization & Analysis',
      description: `Managed the project from inception to deployment, covering both frontend and backend development of a chart platform. This system utilized AI Prompts to generate strategic analysis charts based on input data sets and business analysis requirements, significantly improving the efficiency of data visualization.This is a collection of AI-RAG project materials. Based on the research of the project, AI Prompt-based Business Data Visualization & Analysis was developed.`,
      imgSrc: '/static/images/QQ_1731226164306.png',
      href: 'https://github.com/JoeJoeyMa/AI-RAG-demo',
      tags: [ 'RAG', 'LLM', 'ChatGPT', 'LangChain'],
      category: 'tools',
    },
    {
      title: 'WebRTC IM based on Nodejs + socket.io + express',
      description: `WebRTC IM based on Nodejs + socket.io + express.suport p2p group mode video call and message,stands for Web Real-Time Communications  exchange connection data in the form of SDP objects but never touches the data itself, that is actually transmitted between the peers themselves via STUN and TURN servers`,
      imgSrc: '/static/images/QQ_1731225072141.png',
      href: 'https://github.com/JoeJoeyMa/p2p-video-call',
      category: 'personal',
    },
    {
      title: 'GitHub-Web-IDE-chrome-extension',
      description: `This extension enhances GitHub repositories by adding a convenient dropdown menu. This menu offers direct links to various online platforms that allow users to view and interact with the repository's source code in an environment reminiscent of an IDE.`,
      imgSrc: '/static/images/QQ_1731220788785.png',
      href: 'https://github.com/JoeJoeyMa/GitHub-Web-IDE',
      category: 'tools',
    },
  ],

  cn: [
    {
      title: '基于nextjs的前后端电商项目 ',
      description: `全栈开发 for nextjs+TypeScript+Tailwind CSS+Redis+PostgreSQL+MeiliSearch+Checkout with PayPal and Stripe`,
      imgSrc: '/static/images/QQ_1731220326601.png',
      href: 'https://github.com/JoeJoeyMa/ecomerce_demo',
      tags: ['NextJS', 'TypeScript', 'Tailwind CSS', 'Redis', 'PostgreSQL'],
      feats: ['PayPal Integration', 'Stripe Checkout', 'MeiliSearch'],
      category: 'website',
    },
    {
      title: 'ERP/业务财务一体化/进销存物流管理SAAS',
      description: `ERP系统(基建，重构，部署)旧系统架构复杂，技术栈老旧，数据流复杂、并发高，跨部门协作与系统集成，容器化部署容灾集成挑战。`,
      imgSrc: '/static/images/QQ_1731221573772.png',
      href: '/blog/cn/engineering/Logistics-system',
      category: 'website',
    },
    {
      title: 'AI prompt业务数据统筹数据可视化分析',
      description: `负责项目从0到1的搭建、开发、上线，涵盖前端、Web服务端Chart平台基于AI Prompt 实现集团战略分析需求导入原始数据集、并输入分析需求，就能自动生成可视化图表及分析结论，提高数据分析效率。`,
      imgSrc: '/static/images/QQ_1731226164306.png',
      href: 'https://github.com/JoeJoeyMa/AI-RAG-demo',
      category: 'tools',
    },
    {
      title: 'WebRTC IM based on Nodejs + socket.io + express',
      description: `WebRTC IM based on Nodejs + socket.io + express.suport p2p group mode video call and message,stands for Web Real-Time Communications  exchange connection data in the form of SDP objects but never touches the data itself, that is actually transmitted between the peers themselves via STUN and TURN servers`,
      imgSrc: '/static/images/QQ_1731225072141.png',
      href: 'https://github.com/JoeJoeyMa/p2p-video-call',
      category: 'personal',
    },
    {
      title: 'GitHub-Web-IDE 浏览器扩展',
      description: `此扩展在 GitHub 仓库中添加了一个便捷的下拉菜单，提供直接链接，允许用户在类似 IDE 的环境中查看和交互仓库的源代码。`,
      imgSrc: '/static/images/QQ_1731220788785.png',
      href: 'https://github.com/JoeJoeyMa/GitHub-Web-IDE',
      category: 'tools',
    },
  ],
}

export default projectsData
