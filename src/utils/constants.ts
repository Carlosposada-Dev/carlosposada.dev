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
  twitterHandle: "@CarlosposadaDev",
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
  /** SVG path(s) para el ícono de marca — viewBox 24x24 salvo que se indique */
  svgPath: string;
  /** viewBox del SVG (default "0 0 24 24") */
  svgViewBox?: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/Carlosposada-Dev",
    // SVG oficial de GitHub (SimpleIcons)
    svgPath:
      "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/carlos-andres-posada-chica-software-engineer/",
    // SVG oficial de LinkedIn (SimpleIcons)
    svgPath:
      "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "X",
    href: "https://x.com/CarlosposadaDev",
    // SVG oficial de X / Twitter (SimpleIcons)
    svgPath:
      "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/573106207381",
    // SVG oficial de WhatsApp (SimpleIcons)
    svgPath:
      "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z",
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
