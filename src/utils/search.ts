/**
 * Motor de búsqueda del sitio.
 *
 * Compartido por el command palette (⌘K, `components/global/CommandPalette.astro`)
 * y el terminal de la 404. El índice lo genera `pages/search-index.json.ts` en
 * build a partir de `constants.ts` + la colección de blog.
 *
 * Corre en el cliente: nada de imports de `astro:*` aquí.
 */

export interface SearchEntry {
  id: string;
  type: "page" | "post" | "project" | "service" | "certification" | "link";
  title: string;
  description: string;
  href: string;
  /** Material Symbol */
  icon: string;
  /** Texto extra buscable que no se muestra */
  keywords: string;
  /** Etiqueta corta a la derecha del resultado */
  meta?: string;
  /** true → abre en pestaña nueva */
  external?: boolean;
}

export interface RankedEntry {
  entry: SearchEntry;
  score: number;
  /** Índices de los caracteres del título que hicieron match (para resaltar) */
  indices: number[];
}

/**
 * Match por subsecuencia con bonus por coincidencias consecutivas y por inicio
 * de palabra. Devuelve null si algún carácter de la query no aparece en orden.
 */
export function fuzzy(
  query: string,
  text: string
): { score: number; indices: number[] } | null {
  const haystack = text.toLowerCase();
  const indices: number[] = [];
  let cursor = 0;
  let score = 0;
  let streak = 0;

  for (const char of query) {
    const found = haystack.indexOf(char, cursor);
    if (found === -1) return null;

    if (found === cursor && indices.length > 0) {
      streak += 1;
      score += 8 + streak * 2;
    } else {
      streak = 0;
      score += 1;
    }
    if (found === 0 || /[\s\-_/#.]/.test(haystack[found - 1])) score += 6;

    indices.push(found);
    cursor = found + 1;
  }

  // Penaliza ligeramente los textos largos para que gane el match más ceñido
  score -= Math.min(haystack.length - query.length, 40) * 0.1;
  return { score, indices };
}

/** Puntúa una entrada: el título pesa el triple que la descripción */
function rank(query: string, entry: SearchEntry): RankedEntry | null {
  const title = fuzzy(query, entry.title);
  const description = entry.description ? fuzzy(query, entry.description) : null;
  const keywords = entry.keywords ? fuzzy(query, entry.keywords) : null;

  let score = Math.max(
    (title?.score ?? 0) * 3,
    (keywords?.score ?? 0) * 1.5,
    description?.score ?? 0
  );
  if (score === 0) return null;

  // Un substring exacto siempre debe ganarle a una subsecuencia dispersa
  if (entry.title.toLowerCase().includes(query)) score += 40;

  return { entry, score, indices: title?.indices ?? [] };
}

export interface RankOptions {
  limit?: number;
  /**
   * Descarta lo que puntúe por debajo de esta fracción del mejor match.
   * Sin este corte, una query de 3 letras arrastra decenas de coincidencias
   * de subsecuencia que son puro ruido.
   */
  relativeCutoff?: number;
}

/**
 * Suelo absoluto de puntuación.
 *
 * El corte relativo no basta cuando *nada* hace buen match: si el mejor
 * resultado ya es ruido, el 35% de ese ruido sigue siendo ruido (buscar "eks",
 * que no existe en el sitio, devolvía "QA Automation"). Un match decente de n
 * caracteres puntúa muy por encima de 6n gracias a los bonus de consecutivos y
 * de inicio de palabra; una subsecuencia dispersa se queda en ~n.
 *
 * Se topa a 6 caracteres para no penalizar queries largas en lenguaje natural,
 * donde el match legítimo es necesariamente más disperso.
 */
function floorFor(query: string): number {
  return Math.min(query.length, 6) * 6;
}

/** Devuelve las entradas que hacen match, ordenadas por relevancia */
export function rankEntries(
  query: string,
  entries: SearchEntry[],
  { limit = 12, relativeCutoff = 0.35 }: RankOptions = {}
): RankedEntry[] {
  const floor = floorFor(query);
  const scored = entries
    .map((entry) => rank(query, entry))
    .filter((item): item is RankedEntry => item !== null && item.score >= floor)
    .sort((a, b) => b.score - a.score);

  const best = scored[0]?.score ?? 0;
  return scored.filter((item) => item.score >= best * relativeCutoff).slice(0, limit);
}

// ── Carga del índice ────────────────────────────────────────
// Cacheado a nivel de módulo: en la 404 conviven el palette y el terminal, y
// Vite les da el mismo chunk, así que sólo se descarga una vez.
let cache: SearchEntry[] | null = null;
let inflight: Promise<SearchEntry[] | null> | null = null;

export function loadSearchIndex(): Promise<SearchEntry[] | null> {
  if (cache) return Promise.resolve(cache);
  if (inflight) return inflight;

  inflight = fetch("/search-index.json")
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((data) => {
      cache = data.entries as SearchEntry[];
      return cache;
    })
    .catch(() => null)
    .finally(() => {
      inflight = null;
    });

  return inflight;
}
