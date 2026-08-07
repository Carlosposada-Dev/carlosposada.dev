import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import {
  CERTIFICATIONS,
  NAV_ITEMS,
  PROJECTS,
  SERVICES_DETAIL,
  SITE,
  SOCIAL_LINKS,
} from "@utils/constants";
import { formatDate } from "@utils/helpers";

export const prerender = true;

/**
 * Índice de búsqueda estático — se genera en build y lo consume el
 * Command Palette (Feature #18) y, más adelante, la búsqueda del blog (#22).
 *
 * Una sola fuente para ambos: si mañana hay una página /search, lee este mismo
 * JSON. Todo sale de constants.ts + la colección de blog, así que no hay nada
 * que sincronizar a mano.
 */
export interface SearchEntry {
  id: string;
  type: "page" | "post" | "project" | "service" | "certification" | "link";
  title: string;
  description: string;
  href: string;
  /** Material Symbol mostrado a la izquierda */
  icon: string;
  /** Texto extra buscable que no se muestra (tags, categoría, sinónimos) */
  keywords: string;
  /** Etiqueta corta a la derecha del resultado */
  meta?: string;
  /** true → abre en pestaña nueva */
  external?: boolean;
}

/** Sinónimos por página: lo que alguien teclearía sin saber cómo se llama la sección */
const PAGE_KEYWORDS: Record<string, string> = {
  "/": "home start landing index",
  "/about": "bio biography career timeline experience certifications resume cv",
  "/projects": "work portfolio repos labs github",
  "/services": "hire consulting freelance offering what i do",
  "/blog": "posts articles writing rss",
  "/contact": "email hire me get in touch message form",
};

export const GET: APIRoute = async () => {
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) =>
      new Date(b.data.publishedDate).getTime() -
      new Date(a.data.publishedDate).getTime()
  );

  const entries: SearchEntry[] = [
    // ── Páginas de navegación ──────────────────────────────
    ...NAV_ITEMS.map((item) => ({
      id: `page:${item.href}`,
      type: "page" as const,
      title: item.label,
      description: "",
      href: item.href,
      icon: item.mobileIcon,
      keywords: PAGE_KEYWORDS[item.href] ?? "",
    })),
    {
      id: "page:/now",
      type: "page",
      title: "Now",
      description: "What I'm building, learning and writing right now.",
      href: "/now",
      icon: "bolt",
      keywords: "current status update snapshot nownownow",
    },
    {
      id: "page:/privacy",
      type: "page",
      title: "Privacy Policy",
      description: "What data this site collects and where it goes.",
      href: "/privacy",
      icon: "shield",
      keywords: "gdpr data cookies legal",
    },

    // ── Posts del blog ─────────────────────────────────────
    ...posts.map((post) => ({
      id: `post:${post.slug}`,
      type: "post" as const,
      title: post.data.title,
      description: post.data.description,
      href: `/blog/${post.slug}`,
      icon: "article",
      keywords: [post.data.category, ...post.data.tags].join(" "),
      meta: formatDate(post.data.publishedDate),
    })),

    // ── Proyectos ──────────────────────────────────────────
    ...PROJECTS.map((project) => ({
      id: `project:${project.id}`,
      type: "project" as const,
      title: project.title,
      description: project.description,
      href: `/projects#${project.id}`,
      icon: project.icon,
      keywords: [project.category, ...project.tags].join(" "),
      meta: project.category,
    })),

    // ── Servicios ──────────────────────────────────────────
    ...SERVICES_DETAIL.map((service) => ({
      id: `service:${service.id}`,
      type: "service" as const,
      title: service.title,
      description: service.shortDescription,
      href: `/services#${service.id}`,
      icon: service.icon,
      keywords: service.bullets.join(" "),
    })),

    // ── Certificaciones (llevan a la credencial en Credly) ─
    ...CERTIFICATIONS.map((cert) => ({
      id: `cert:${cert.id}`,
      type: "certification" as const,
      title: cert.title,
      description: `${cert.issuer} · verify on Credly`,
      href: cert.credlyUrl,
      icon: "verified",
      keywords: `${cert.code} ${cert.issuer} certification badge credential`,
      meta: cert.code,
      external: true,
    })),

    // ── Enlaces y acciones ─────────────────────────────────
    {
      id: "link:cv",
      type: "link",
      title: "Download CV (PDF)",
      description: "The résumé, as a file.",
      href: "/carlos-posada-cv.pdf",
      icon: "download",
      keywords: "resume curriculum vitae pdf hire",
      external: true,
    },
    {
      id: "link:email",
      type: "link",
      title: `Email ${SITE.email}`,
      description: "Open a new message in your mail client.",
      href: `mailto:${SITE.email}`,
      icon: "mail",
      keywords: "contact write reach out mailto",
      external: true,
    },
    {
      id: "link:rss",
      type: "link",
      title: "RSS feed",
      description: "Subscribe to the blog without an algorithm in the middle.",
      href: "/rss.xml",
      icon: "rss_feed",
      keywords: "feed subscribe atom xml",
      external: true,
    },
    ...SOCIAL_LINKS.map((social) => ({
      id: `link:${social.label.toLowerCase()}`,
      type: "link" as const,
      title: social.label,
      description: social.href.replace(/^https?:\/\//, ""),
      href: social.href,
      icon: "open_in_new",
      keywords: `social profile ${social.label}`,
      external: true,
    })),
  ];

  return new Response(JSON.stringify({ entries }), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
