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
  });
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
