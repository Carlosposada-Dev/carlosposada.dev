// ─────────────────────────────────────────────────────────
// Constantes globales del sitio
// Centraliza metadata, navegación y links externos
// ─────────────────────────────────────────────────────────

export const SITE = {
  name: "carlosposada.dev",
  title: "Carlos Posada | Cloud & DevOps Engineer",
  description:
    "Architecting high-velocity deployment pipelines and resilient cloud ecosystems. Specializing in IaC, automated quality gates, and AI-driven operations.",
  url: "https://carlosposada.dev",
  author: "Carlos Posada",
  locale: "en_US",
  twitterHandle: "@carlosposada",
  location: "Medellín, Colombia",
  timezone: "COT (UTC-5)",
  email: "hello@carlosposada.dev",
  openToWork: true,
} as const;

// ─────────────────────────────────────────────────────────
// Open Graph / SEO defaults
// ─────────────────────────────────────────────────────────
export const OG = {
  image: "/images/og-default.png",
  imageAlt: "carlosposada.dev — Cloud & DevOps Engineer",
  type: "website",
} as const;

// ─────────────────────────────────────────────────────────
// Navegación principal
// ─────────────────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  mobileIcon: string; // Material Symbol name
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", mobileIcon: "home" },
  { label: "About", href: "/about", mobileIcon: "person" },
  { label: "Projects", href: "/projects", mobileIcon: "account_tree" },
  { label: "Services", href: "/services", mobileIcon: "settings_input_component" },
  { label: "Blog", href: "/blog", mobileIcon: "article" },
  { label: "Contact", href: "/contact", mobileIcon: "mail" },
];

// Navegación bottom bar mobile (solo 4 items)
export const MOBILE_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", mobileIcon: "home" },
  { label: "Projects", href: "/projects", mobileIcon: "account_tree" },
  { label: "Blog", href: "/blog", mobileIcon: "article" },
  { label: "Contact", href: "/contact", mobileIcon: "mail" },
];

// ─────────────────────────────────────────────────────────
// Redes sociales
// ─────────────────────────────────────────────────────────
export interface SocialLink {
  label: string;
  href: string;
  icon: string; // Material Symbol name
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/Carlosposada-Dev",
    icon: "code",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/carlos-andres-posada-chica-software-engineer/",
    icon: "link",
  },
  {
    label: "Email",
    href: "mailto:hello@carlosposada.dev",
    icon: "mail",
  },
];

export const FOOTER_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/carlos-andres-posada-chica-software-engineer/" },
  { label: "GitHub", href: "https://github.com/Carlosposada-Dev" },
  { label: "Sitemap", href: "/sitemap-index.xml" },
  { label: "Privacy Policy", href: "/privacy" },
];

// ─────────────────────────────────────────────────────────
// Stack de habilidades (Skills Bar en Home)
// ─────────────────────────────────────────────────────────
export interface Skill {
  label: string;
  icon: string; // Material Symbol name
}

export const SKILLS: Skill[] = [
  { label: "AWS", icon: "cloud" },
  { label: "GCP", icon: "storage" },
  { label: "Terraform", icon: "architecture" },
  { label: "Kubernetes", icon: "hub" },
  { label: "Docker", icon: "package" },
  { label: "GitHub Actions", icon: "terminal" },
  { label: "Playwright", icon: "bug_report" },
  { label: "Python", icon: "code" },
  { label: "LLM / AI", icon: "psychology" },
];

// ─────────────────────────────────────────────────────────
// Servicios (preview en Home + detalle en /services)
// ─────────────────────────────────────────────────────────
export interface Service {
  id: string;
  title: string;
  icon: string; // Material Symbol name
  accentColor: "primary" | "secondary" | "tertiary";
  shortDescription: string;
  bullets: string[];
}

export const SERVICES: Service[] = [
  {
    id: "devops-cloud",
    title: "DevOps & Cloud",
    icon: "settings_input_component",
    accentColor: "primary",
    shortDescription:
      "Implementation of CI/CD pipelines, Infrastructure as Code (Terraform), and container orchestration (Kubernetes) for scalable, secure environments.",
    bullets: ["AWS / GCP Architecture", "Dockerization", "Site Reliability"],
  },
  {
    id: "qa-automation",
    title: "QA Automation",
    icon: "fact_check",
    accentColor: "secondary",
    shortDescription:
      "End-to-end testing frameworks that catch bugs before production. Automated regression, performance, and API testing solutions.",
    bullets: ["Selenium / Playwright", "API Testing (Postman)", "Test Data Mgmt"],
  },
  {
    id: "ai-solutions",
    title: "AI Solutions",
    icon: "auto_awesome",
    accentColor: "tertiary",
    shortDescription:
      "Integrating LLMs and machine learning into existing workflows. Developing AI agents for automated operations and data analysis.",
    bullets: ["LLM Fine-tuning", "RAG Implementations", "AI Ops Pipelines"],
  },
];

// ─────────────────────────────────────────────────────────
// Proyectos destacados (Featured en Home)
// ─────────────────────────────────────────────────────────
export interface FeaturedProject {
  id: string;
  title: string;
  description: string;
  tags: Array<{ label: string; color: "primary" | "secondary" | "tertiary" }>;
  badge: string;
  badgeColor: "primary" | "secondary" | "tertiary";
  href: string;
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "multi-cloud-drifting",
    title: "Automated Multi-Cloud Drifting Engine",
    description:
      "A real-time monitoring tool that detects configuration drift across AWS and GCP environments using Terraform state analysis.",
    badge: "DEVOPS",
    badgeColor: "primary",
    tags: [
      { label: "Terraform", color: "primary" },
      { label: "Python", color: "secondary" },
      { label: "Prometheus", color: "tertiary" },
    ],
    href: "/projects#multi-cloud-drifting",
  },
  {
    id: "self-healing-framework",
    title: "Self-Healing Automation Framework",
    description:
      "AI-powered Selenium framework that automatically updates selectors and heals flaky tests using LLM-based element analysis.",
    badge: "QA",
    badgeColor: "secondary",
    tags: [
      { label: "Selenium", color: "primary" },
      { label: "OpenAI API", color: "secondary" },
      { label: "Java", color: "tertiary" },
    ],
    href: "/projects#self-healing-framework",
  },
  {
    id: "infra-intelligence-bot",
    title: "Infrastructure Intelligence Bot",
    description:
      "A Slack-integrated AI agent that troubleshoots production logs and provides root cause analysis for incident response.",
    badge: "AI",
    badgeColor: "tertiary",
    tags: [
      { label: "LangChain", color: "primary" },
      { label: "AWS Lambda", color: "secondary" },
      { label: "Docker", color: "tertiary" },
    ],
    href: "/projects#infra-intelligence-bot",
  },
];

// ─────────────────────────────────────────────────────────
// Career Timeline (About page)
// ─────────────────────────────────────────────────────────
export interface CareerEntry {
  title: string;
  period: string;
  description: string;
  tags: string[];
  isCurrent: boolean;
}

export const CAREER: CareerEntry[] = [
  {
    title: "AI Solutions Lead",
    period: "2022 — PRESENT",
    description:
      "Spearheading the integration of LLMs into enterprise CI/CD pipelines. Developed self-healing test suites and predictive analytics for deployment risk assessment.",
    tags: ["PyTorch", "LangChain", "AutoGPT"],
    isCurrent: true,
  },
  {
    title: "Senior Cloud / DevOps Engineer",
    period: "2018 — 2022",
    description:
      "Orchestrated large-scale Kubernetes migrations and implemented Infrastructure as Code across AWS and Azure environments for Fortune 500 fintech clients.",
    tags: ["Terraform", "K8s", "GitHub Actions"],
    isCurrent: false,
  },
  {
    title: "QA Automation Specialist",
    period: "2014 — 2018",
    description:
      "Established automated testing frameworks from scratch, reducing regression testing cycles by 70%. Pioneered Shift-Left testing culture.",
    tags: ["Selenium", "Jenkins", "TypeScript"],
    isCurrent: false,
  },
];

// ─────────────────────────────────────────────────────────
// Proyectos completos (Projects page)
// ─────────────────────────────────────────────────────────
export type ProjectCategory = "All" | "DevOps" | "Cloud" | "QA" | "AI";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: Exclude<ProjectCategory, "All">;
  tags: string[];
  githubUrl: string;
  demoUrl: string;
  demoLabel: string;
  icon: string; // Material Symbol
  image: string;
  imageAlt: string;
}

export const PROJECTS: Project[] = [
  {
    id: "kubestreamer",
    title: "KubeStreamer v2",
    description:
      "Automated CI/CD pipeline for high-availability Kubernetes clusters with real-time log streaming and thermal monitoring.",
    category: "DevOps",
    tags: ["#k8s", "#terraform", "#go"],
    githubUrl: "https://github.com/carlosposada",
    demoUrl: "#",
    demoLabel: "View Demo",
    icon: "terminal",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    imageAlt: "Futuristic server room with neon blue and green data stream overlays",
  },
  {
    id: "sentinel-qa",
    title: "Sentinel QA Hub",
    description:
      "End-to-end testing orchestration platform using Playwright and Python, featuring automated regression reports and Slack integration.",
    category: "QA",
    tags: ["#playwright", "#python", "#github_actions"],
    githubUrl: "https://github.com/carlosposada",
    demoUrl: "#",
    demoLabel: "Live Report",
    icon: "bug_report",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&q=80",
    imageAlt: "Close-up of complex circuit board with glowing green traces",
  },
  {
    id: "cloudnexus-api",
    title: "CloudNexus API",
    description:
      "Multi-region AWS infrastructure deployment for low-latency serverless APIs with integrated DDoS protection and WAF rules.",
    category: "Cloud",
    tags: ["#aws", "#lambda", "#cdk"],
    githubUrl: "https://github.com/carlosposada",
    demoUrl: "#",
    demoLabel: "Docs",
    icon: "cloud_sync",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
    imageAlt: "Abstract digital cloud formation rendered in electric cyan particles",
  },
  {
    id: "pulsepredict-ai",
    title: "PulsePredict AI",
    description:
      "Predictive maintenance model for data center hardware using machine learning to forecast component failures with 94% accuracy.",
    category: "AI",
    tags: ["#pytorch", "#pandas", "#docker"],
    githubUrl: "https://github.com/carlosposada",
    demoUrl: "#",
    demoLabel: "Notebook",
    icon: "psychology",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
    imageAlt: "Neural network visualization with glowing connections",
  },
  {
    id: "titan-mesh",
    title: "Titan Mesh",
    description:
      "Service mesh implementation focusing on zero-trust networking and mTLS encryption across distributed microservices.",
    category: "DevOps",
    tags: ["#istio", "#envoy", "#vault"],
    githubUrl: "https://github.com/carlosposada",
    demoUrl: "#",
    demoLabel: "Explore",
    icon: "security",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80",
    imageAlt: "Deep blue network with glowing optical fiber connections",
  },
];

export const PROJECT_CATEGORIES: ProjectCategory[] = ["All", "DevOps", "Cloud", "QA", "AI"];

// ─────────────────────────────────────────────────────────
// Servicios detallados (Services page)
// ─────────────────────────────────────────────────────────
export interface ServiceDetail extends Service {
  longDescription: string;
  deliverables: Array<{ icon: string; label: string }>;
  accentBorder: string; // clase Tailwind border-color
  ctaStyle: "primary" | "secondary" | "tertiary";
  image: string;
  imageAlt: string;
  layout: "normal" | "reverse"; // alterna la dirección del tile
}

export const SERVICES_DETAIL: ServiceDetail[] = [
  {
    id: "devops-cloud",
    title: "DevOps & Cloud Engineering",
    icon: "cloud_done",
    accentColor: "primary",
    accentBorder: "border-primary",
    layout: "normal",
    ctaStyle: "primary",
    shortDescription:
      "Implementation of CI/CD pipelines, Infrastructure as Code (Terraform), and container orchestration (Kubernetes) for scalable, secure environments.",
    longDescription:
      "Architecting cloud-native ecosystems that prioritize resilience and speed. I focus on the structural pulse of your deployments, ensuring 99.9% availability through automated orchestration.",
    bullets: ["AWS / GCP Architecture", "Dockerization", "Site Reliability"],
    deliverables: [
      { icon: "terminal", label: "CI/CD Pipelines (GitHub Actions, GitLab)" },
      { icon: "architecture", label: "IaC (Terraform, Pulumi, CloudFormation)" },
      { icon: "hub", label: "Kubernetes Cluster Management" },
      { icon: "security", label: "DevSecOps & Security Hardening" },
    ],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    imageAlt: "Data center with glowing blue server racks",
  },
  {
    id: "qa-automation",
    title: "QA Automation",
    icon: "biotech",
    accentColor: "secondary",
    accentBorder: "border-secondary",
    layout: "reverse",
    ctaStyle: "secondary",
    shortDescription:
      "End-to-end testing frameworks that catch bugs before production. Automated regression, performance, and API testing solutions.",
    longDescription:
      "Ensuring zero-defect releases through end-to-end automated testing strategies. I build frameworks that act as the immune system for your software architecture.",
    bullets: ["Selenium / Playwright", "API Testing (Postman)", "Test Data Mgmt"],
    deliverables: [
      { icon: "bolt", label: "Playwright & Cypress Frameworks" },
      { icon: "api", label: "API Testing (RestAssured, Postman)" },
      { icon: "speed", label: "Performance & Load Testing (k6)" },
      { icon: "visibility", label: "Visual Regression Testing" },
    ],
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80",
    imageAlt: "Automated code analysis with circuit pattern overlays",
  },
  {
    id: "ai-solutions",
    title: "AI-powered Solutions",
    icon: "neurology",
    accentColor: "tertiary",
    accentBorder: "border-tertiary",
    layout: "normal",
    ctaStyle: "tertiary",
    shortDescription:
      "Integrating LLMs and machine learning into existing workflows. Developing AI agents for automated operations and data analysis.",
    longDescription:
      "Integrating machine intelligence into the engineering lifecycle. From LLM-assisted coding agents to predictive infrastructure scaling, I build the next generation of smart systems.",
    bullets: ["LLM Fine-tuning", "RAG Implementations", "AI Ops Pipelines"],
    deliverables: [
      { icon: "robot_2", label: "Custom LLM Implementation" },
      { icon: "analytics", label: "AIOps for Anomaly Detection" },
      { icon: "memory", label: "RAG Pipeline Architecture" },
      { icon: "model_training", label: "MLOps Training Workflows" },
    ],
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    imageAlt: "Abstract neural network with glowing blue and violet connections",
  },
];
