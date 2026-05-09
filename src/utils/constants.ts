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
  { label: "Sitemap", href: "/sitemap-index.xml" },
  { label: "Privacy Policy", href: "/privacy" },
];

// ─────────────────────────────────────────────────────────
// Certifications
// ─────────────────────────────────────────────────────────
export interface Certification {
  id: string;
  title: string;
  /** Short credential code shown as badge label */
  code: string;
  issuer: "AWS" | "Google Cloud" | "CNCF" | "HashiCorp";
  /** Credly or Google credential URL to verify */
  credlyUrl: string;
  /** Official badge image URL (Credly CDN or Google) */
  badgeUrl: string;
  /** Issuer brand color */
  accentColor: string;
  /** SimpleIcons SVG path for the issuer logo */
  svgPath: string;
}

// AWS SVG path (SimpleIcons)
const AWS_SVG = "M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.272-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.607zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z";
// Google Cloud SVG path (SimpleIcons)
const GCP_SVG = "M12.19 2.38a9.344 9.344 0 0 0-9.234 6.893c.053-.02-.055.013 0 0-3.875 2.551-3.922 8.11-.247 10.941l.006-.007-.007.03a6.717 6.717 0 0 0 4.077 1.356h5.173l.03.03h5.192c6.687.053 9.376-8.605 3.835-12.35a9.365 9.365 0 0 0-2.821-4.552l-.043.043.006-.05A9.344 9.344 0 0 0 12.19 2.38zm-.358 4.146c1.244-.04 2.518.368 3.486 1.15a5.186 5.186 0 0 1 1.862 4.078v.518c3.53-.07 3.53 5.262 0 5.193h-5.193l-.008.009v-.04H6.785a2.59 2.59 0 0 1-1.067-.23h.001a2.597 2.597 0 1 1 3.437-3.437l3.013-3.012A6.747 6.747 0 0 0 8.11 8.24c.018-.01.04-.026.054-.023a5.186 5.186 0 0 1 3.67-1.69z";

export const CERTIFICATIONS: Certification[] = [
  // ── AWS ──────────────────────────────────────────────────
  {
    id: "aws-saa",
    title: "AWS Solutions Architect — Associate",
    code: "SAA-C03",
    issuer: "AWS",
    credlyUrl: "https://www.credly.com/badges/b9a1d29b-f8ce-421c-915b-6c3d3d49a2e2/public_url",
    badgeUrl: "https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png",
    accentColor: "#FF9900",
    svgPath: AWS_SVG,
  },
  {
    id: "aws-dva",
    title: "AWS Developer — Associate",
    code: "DVA-C02",
    issuer: "AWS",
    credlyUrl: "https://www.credly.com/badges/b2af596a-0a58-4782-9b51-65973bc34af0/public_url",
    badgeUrl: "https://images.credly.com/size/340x340/images/b9feab85-1a43-4f6c-99a5-631b88d5461b/image.png",
    accentColor: "#FF9900",
    svgPath: AWS_SVG,
  },
  {
    id: "aws-soa",
    title: "AWS CloudOps Engineer — Associate",
    code: "SOA-C03",
    issuer: "AWS",
    credlyUrl: "https://www.credly.com/badges/de0a31a7-ea42-4ae5-8ce9-3bc790ea8b6d/public_url",
    badgeUrl: "https://images.credly.com/size/220x220/images/88a6405e-0f26-442a-95ed-f9b9db4c857e/blob",
    accentColor: "#FF9900",
    svgPath: AWS_SVG,
  },
  {
    id: "aws-aif",
    title: "AWS AI Practitioner",
    code: "AIF-C01",
    issuer: "AWS",
    credlyUrl: "https://www.credly.com/badges/e9bd2911-dcf7-4345-a9af-74e83e15e3c2/public_url",
    badgeUrl: "https://images.credly.com/size/680x680/images/4d4693bb-530e-4bca-9327-de07f3aa2348/image.png",
    accentColor: "#FF9900",
    svgPath: AWS_SVG,
  },
  {
    id: "aws-clf",
    title: "AWS Cloud Practitioner",
    code: "CLF-C02",
    issuer: "AWS",
    credlyUrl: "https://www.credly.com/badges/12973993-e377-4a4b-9214-263343aeff19/public_url",
    badgeUrl: "https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png",
    accentColor: "#FF9900",
    svgPath: AWS_SVG,
  },
  // ── Google Cloud ─────────────────────────────────────────
  {
    id: "gcp-ace",
    title: "Google Cloud Associate Cloud Engineer",
    code: "ACE",
    issuer: "Google Cloud",
    credlyUrl: "https://www.credly.com/badges/4e241773-5bb7-4bea-8814-cc3e2460fa70/public_url",
    badgeUrl: "https://images.credly.com/size/340x340/images/08096465-cbfc-4c3e-93e5-93c5aa61f23e/image.png",
    accentColor: "#4285F4",
    svgPath: GCP_SVG,
  },
  {
    id: "gcp-pca",
    title: "Google Cloud Professional Cloud Architect",
    code: "PCA",
    issuer: "Google Cloud",
    credlyUrl: "https://www.credly.com/badges/0e4532bd-562e-43dd-9746-36561343ca7d/public_url",
    badgeUrl: "https://images.credly.com/size/220x220/images/71c579e0-51fd-4247-b493-d2fa8167157a/image.png",
    accentColor: "#4285F4",
    svgPath: GCP_SVG,
  },
  {
    id: "gcp-gail",
    title: "Google Cloud Generative AI Leader",
    code: "GAIL",
    issuer: "Google Cloud",
    credlyUrl: "https://www.credly.com/badges/your-gail-badge-id",
    badgeUrl: "https://images.credly.com/size/680x680/images/ec23e41a-0f32-4a98-9c00-28925621b281/blob",
    accentColor: "#4285F4",
    svgPath: GCP_SVG,
  },
];

// ─────────────────────────────────────────────────────────
// Stack de habilidades (Skills Bar en Home)
// ─────────────────────────────────────────────────────────
export interface Skill {
  label: string;
  icon?: string; // Material Symbol name
  svgPath?: string;
  color?: string;
}

export const SKILLS: Skill[] = [
  { label: "AWS", svgPath: "M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.272-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.607zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z", color: "#FF9900" },
  { label: "GCP", svgPath: "M12.19 2.38a9.344 9.344 0 0 0-9.234 6.893c.053-.02-.055.013 0 0-3.875 2.551-3.922 8.11-.247 10.941l.006-.007-.007.03a6.717 6.717 0 0 0 4.077 1.356h5.173l.03.03h5.192c6.687.053 9.376-8.605 3.835-12.35a9.365 9.365 0 0 0-2.821-4.552l-.043.043.006-.05A9.344 9.344 0 0 0 12.19 2.38zm-.358 4.146c1.244-.04 2.518.368 3.486 1.15a5.186 5.186 0 0 1 1.862 4.078v.518c3.53-.07 3.53 5.262 0 5.193h-5.193l-.008.009v-.04H6.785a2.59 2.59 0 0 1-1.067-.23h.001a2.597 2.597 0 1 1 3.437-3.437l3.013-3.012A6.747 6.747 0 0 0 8.11 8.24c.018-.01.04-.026.054-.023a5.186 5.186 0 0 1 3.67-1.69z", color: "#4285F4" },
  { label: "Terraform", svgPath: "M1.44 0v7.575l6.561 3.79V3.787zm21.12 4.227l-6.561 3.791v7.574l6.56-3.787zM8.72 4.23v7.575l6.561 3.787V8.018zm0 8.405v7.575L15.28 24v-7.578z", color: "#844FBA" },
  { label: "Kubernetes", svgPath: "M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 0 1-2.075-2.597l2.578-.437.004.005a.44.44 0 0 1 .484.606zm-.833-2.129a.44.44 0 0 0 .173-.756l.002-.011L7.585 9.7a5.143 5.143 0 0 0-.73 3.255l2.514-.725.002-.009zm1.145-1.98a.44.44 0 0 0 .699-.337l.01-.005.15-2.62a5.144 5.144 0 0 0-3.01 1.442l2.147 1.523.004-.002zm.76 2.75l.723.349.722-.347.18-.78-.5-.623h-.804l-.5.623.179.779zm1.5-3.095a.44.44 0 0 0 .7.336l.008.003 2.134-1.513a5.188 5.188 0 0 0-2.992-1.442l.148 2.615.002.001zm10.876 5.97l-5.773 7.181a1.6 1.6 0 0 1-1.248.594l-9.261.003a1.6 1.6 0 0 1-1.247-.596l-5.776-7.18a1.583 1.583 0 0 1-.307-1.34L2.1 5.573c.108-.47.425-.864.863-1.073L11.305.513a1.606 1.606 0 0 1 1.385 0l8.345 3.985c.438.209.755.604.863 1.073l2.062 8.955c.108.47-.005.963-.308 1.34zm-3.289-2.057c-.042-.01-.103-.026-.145-.034-.174-.033-.315-.025-.479-.038-.35-.037-.638-.067-.895-.148-.105-.04-.18-.165-.216-.216l-.201-.059a6.45 6.45 0 0 0-.105-2.332 6.465 6.465 0 0 0-.936-2.163c.052-.047.15-.133.177-.159.008-.09.001-.183.094-.282.197-.185.444-.338.743-.522.142-.084.273-.137.415-.242.032-.024.076-.062.11-.089.24-.191.295-.52.123-.736-.172-.216-.506-.236-.745-.045-.034.027-.08.062-.111.088-.134.116-.217.23-.33.35-.246.25-.45.458-.673.609-.097.056-.239.037-.303.033l-.19.135a6.545 6.545 0 0 0-4.146-2.003l-.012-.223c-.065-.062-.143-.115-.163-.25-.022-.268.015-.557.057-.905.023-.163.061-.298.068-.475.001-.04-.001-.099-.001-.142 0-.306-.224-.555-.5-.555-.275 0-.499.249-.499.555l.001.014c0 .041-.002.092 0 .128.006.177.044.312.067.475.042.348.078.637.056.906a.545.545 0 0 1-.162.258l-.012.211a6.424 6.424 0 0 0-4.166 2.003 8.373 8.373 0 0 1-.18-.128c-.09.012-.18.04-.297-.029-.223-.15-.427-.358-.673-.608-.113-.12-.195-.234-.329-.349-.03-.026-.077-.062-.111-.088a.594.594 0 0 0-.348-.132.481.481 0 0 0-.398.176c-.172.216-.117.546.123.737l.007.005.104.083c.142.105.272.159.414.242.299.185.546.338.743.522.076.082.09.226.1.288l.16.143a6.462 6.462 0 0 0-1.02 4.506l-.208.06c-.055.072-.133.184-.215.217-.257.081-.546.11-.895.147-.164.014-.305.006-.48.039-.037.007-.09.02-.133.03l-.004.002-.007.002c-.295.071-.484.342-.423.608.061.267.349.429.645.365l.007-.001.01-.003.129-.029c.17-.046.294-.113.448-.172.33-.118.604-.217.87-.256.112-.009.23.069.288.101l.217-.037a6.5 6.5 0 0 0 2.88 3.596l-.09.218c.033.084.069.199.044.282-.097.252-.263.517-.452.813-.091.136-.185.242-.268.399-.02.037-.045.095-.064.134-.128.275-.034.591.213.71.248.12.556-.007.69-.282v-.002c.02-.039.046-.09.062-.127.07-.162.094-.301.144-.458.132-.332.205-.68.387-.897.05-.06.13-.082.215-.105l.113-.205a6.453 6.453 0 0 0 4.609.012l.106.192c.086.028.18.042.256.155.136.232.229.507.342.84.05.156.074.295.145.457.016.037.043.09.062.129.133.276.442.402.69.282.247-.118.341-.435.213-.71-.02-.039-.045-.096-.065-.134-.083-.156-.177-.261-.268-.398-.19-.296-.346-.541-.443-.793-.04-.13.007-.21.038-.294-.018-.022-.059-.144-.083-.202a6.499 6.499 0 0 0 2.88-3.622c.064.01.176.03.213.038.075-.05.144-.114.28-.104.266.039.54.138.87.256.154.06.277.128.448.173.036.01.088.019.13.028l.009.003.007.001c.297.064.584-.098.645-.365.06-.266-.128-.537-.423-.608zM16.4 9.701l-1.95 1.746v.005a.44.44 0 0 0 .173.757l.003.01 2.526.728a5.199 5.199 0 0 0-.108-1.674A5.208 5.208 0 0 0 16.4 9.7zm-4.013 5.325a.437.437 0 0 0-.404-.232.44.44 0 0 0-.372.233h-.002l-1.268 2.292a5.164 5.164 0 0 0 3.326.003l-1.27-2.296h-.01zm1.888-1.293a.44.44 0 0 0-.27.036.44.44 0 0 0-.214.572l-.003.004 1.01 2.438a5.15 5.15 0 0 0 2.081-2.615l-2.6-.44-.004.005z", color: "#326CE5" },
  { label: "Docker", svgPath: "M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z", color: "#2496ED" },
  { label: "GitHub Actions", svgPath: "M10.984 13.836a.5.5 0 0 1-.353-.146l-.745-.743a.5.5 0 1 1 .706-.708l.392.391 1.181-1.18a.5.5 0 0 1 .708.707l-1.535 1.533a.504.504 0 0 1-.354.146zm9.353-.147l1.534-1.532a.5.5 0 0 0-.707-.707l-1.181 1.18-.392-.391a.5.5 0 1 0-.706.708l.746.743a.497.497 0 0 0 .706-.001zM4.527 7.452l2.557-1.585A1 1 0 0 0 7.09 4.17L4.533 2.56A1 1 0 0 0 3 3.406v3.196a1.001 1.001 0 0 0 1.527.85zm2.03-2.436L4 6.602V3.406l2.557 1.61zM24 12.5c0 1.93-1.57 3.5-3.5 3.5a3.503 3.503 0 0 1-3.46-3h-2.08a3.503 3.503 0 0 1-3.46 3 3.502 3.502 0 0 1-3.46-3h-.558c-.972 0-1.85-.399-2.482-1.042V17c0 1.654 1.346 3 3 3h.04c.244-1.693 1.7-3 3.46-3 1.93 0 3.5 1.57 3.5 3.5S13.43 24 11.5 24a3.502 3.502 0 0 1-3.46-3H8c-2.206 0-4-1.794-4-4V9.899A5.008 5.008 0 0 1 0 5c0-2.757 2.243-5 5-5s5 2.243 5 5a5.005 5.005 0 0 1-4.952 4.998A2.482 2.482 0 0 0 7.482 12h.558c.244-1.693 1.7-3 3.46-3a3.502 3.502 0 0 1 3.46 3h2.08a3.503 3.503 0 0 1 3.46-3c1.93 0 3.5 1.57 3.5 3.5zm-15 8c0 1.378 1.122 2.5 2.5 2.5s2.5-1.122 2.5-2.5-1.122-2.5-2.5-2.5S9 19.122 9 20.5zM5 9c2.206 0 4-1.794 4-4S7.206 1 5 1 1 2.794 1 5s1.794 4 4 4zm9 3.5c0-1.378-1.122-2.5-2.5-2.5S9 11.122 9 12.5s1.122 2.5 2.5 2.5 2.5-1.122 2.5-2.5zm9 0c0-1.378-1.122-2.5-2.5-2.5S18 11.122 18 12.5s1.122 2.5 2.5 2.5 2.5-1.122 2.5-2.5zm-13 8a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0zm2 0a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0zm12 0c0 1.93-1.57 3.5-3.5 3.5a3.503 3.503 0 0 1-3.46-3.002c-.007.001-.013.005-.021.005l-.506.017h-.017a.5.5 0 0 1-.016-.999l.506-.017c.018-.002.035.006.052.007A3.503 3.503 0 0 1 20.5 17c1.93 0 3.5 1.57 3.5 3.5zm-1 0c0-1.378-1.122-2.5-2.5-2.5S18 19.122 18 20.5s1.122 2.5 2.5 2.5 2.5-1.122 2.5-2.5z", color: "#2088FF" },
  { label: "Playwright", svgPath: "M23.996 7.462c-.056.837-.257 2.135-.716 3.85-.995 3.715-4.27 10.874-10.42 9.227-6.15-1.65-5.407-9.487-4.412-13.201.46-1.716.934-2.94 1.305-3.694.42-.853.846-.289 1.815.523.684.573 2.41 1.791 5.011 2.488 2.601.697 4.706.506 5.583.352 1.245-.219 1.897-.494 1.834.455Zm-9.807 3.863s-.127-1.819-1.773-2.286c-1.644-.467-2.613 1.04-2.613 1.04Zm4.058 4.539-7.769-2.172s.446 2.306 3.338 3.153c2.862.836 4.43-.98 4.43-.981Zm2.701-2.51s-.13-1.818-1.773-2.286c-1.644-.469-2.612 1.038-2.612 1.038ZM8.57 18.23c-4.749 1.279-7.261-4.224-8.021-7.08C.197 9.831.044 8.832.003 8.188c-.047-.73.455-.52 1.415-.354.677.118 2.3.261 4.308-.28a11.28 11.28 0 0 0 2.41-.956c-.058.197-.114.4-.17.61-.433 1.618-.827 4.055-.632 6.426-1.976.732-2.267 2.423-2.267 2.423l2.524-.715c.227 1.002.6 1.987 1.15 2.838a5.914 5.914 0 0 1-.171.049Zm-4.188-6.298c1.265-.333 1.363-1.631 1.363-1.631l-3.374.888s.745 1.076 2.01.743Z", color: "#2EAD33" },
  { label: "Python", svgPath: "M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z", color: "#3776AB" },
  { label: "LLM / AI", svgPath: "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z", color: "#412991" },
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
