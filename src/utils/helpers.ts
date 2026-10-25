import { CERTIFICATIONS, CERTIFICATION_TRACKS, PLANNED_CERTIFICATIONS } from "./constants";

/**
 * Calcula el tiempo estimado de lectura de un texto
 * Basado en velocidad promedio de lectura técnica: 200 palabras/min
 */
export function getReadingTime(content: string): string {
  const WORDS_PER_MINUTE = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / WORDS_PER_MINUTE);
  return `${minutes} min read`;
}

/**
 * Formatea una fecha al formato legible del blog
 * Ej: "Oct 24, 2024"
 */
export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    // Las fechas del frontmatter son medianoche UTC: sin esto, un build en UTC-5 pinta el día anterior
    timeZone: "UTC",
  });
}

/**
 * Progreso de cada programa de certificación (hoy sólo Kubestronaut):
 * obtenidas / total, calculado desde CERTIFICATIONS. Lo usan la home y /about.
 */
export function getTrackProgress() {
  return Object.entries(CERTIFICATION_TRACKS).map(([issuer, track]) => ({
    issuer,
    ...track,
    earned: CERTIFICATIONS.filter((cert) => cert.issuer === issuer).length,
  }));
}

/**
 * Un nodo por emisor, en el orden en que aparece en CERTIFICATIONS (Linux
 * Foundation primero a propósito), con sus códigos obtenidos y los del roadmap.
 * Alimenta el clúster de la etapa "apply" de la home.
 */
export function getIssuerNodes() {
  const nodes: Array<{ issuer: string; slug: string; earned: string[]; pending: string[] }> = [];
  for (const cert of CERTIFICATIONS) {
    const node = nodes.find((n) => n.issuer === cert.issuer);
    if (node) node.earned.push(cert.code);
    else nodes.push({ issuer: cert.issuer, slug: slugify(cert.issuer), earned: [cert.code], pending: [] });
  }
  for (const planned of PLANNED_CERTIFICATIONS) {
    nodes.find((n) => n.issuer === planned.issuer)?.pending.push(planned.code);
  }
  return nodes;
}

/**
 * Genera un slug desde un string
 * Ej: "My Blog Post" -> "my-blog-post"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
