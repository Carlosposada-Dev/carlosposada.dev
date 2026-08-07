# CLAUDE.md — carlosposada.dev

Guía de trabajo para Claude Code en este repositorio.

**Mapa de documentos** (los tres primeros están en `.gitignore`, son contexto local):

| Archivo | Qué contiene |
|---|---|
| `PROJECT_STATUS.md` | Stack, estructura, config de Cloudflare, qué está hecho y qué falta |
| `new-features.md` | **Sólo lo pendiente** del sitio, en orden de implementación |
| `blog-projects-roadmap.md` | Repos a construir + posts a escribir (una sesión por repo) |
| `CLAUDE.md` (este) | Cómo trabajar en el repo: comandos, convenciones, trampas |

---

## 1. Qué es este proyecto

Portfolio personal de Carlos Posada (Cloud / DevOps / AI). Sitio estático en
**Astro 5** con dos rutas SSR (API) desplegado en **Cloudflare Pages** sobre el
dominio `carlosposada.dev`. Dark mode únicamente — no hay theme toggle.

---

## 2. Comandos

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run preview
```

```bash
npm run og
```

```bash
npx wrangler pages deploy dist --project-name=carlosposada-dev
```

- `dev` → `astro dev` en http://localhost:4321
- `build` → `astro build` (salida en `dist/`, es la verificación real: no hay tests)
- `preview` → `wrangler pages dev dist` (simula el runtime de Cloudflare, necesario
  para probar las rutas `/api/*`)
- `og` → regenera `public/images/og-default.png` (1200×630) desde
  `scripts/generate-og-image.mjs` (SVG → PNG con `sharp`). Correr tras cambiar
  nombre, tagline o número de certificaciones
- `icons` → regenera los PNG de favicon/PWA desde `public/favicon.svg`
- Node **>= 22** (`engines` en package.json y `NODE_VERSION=22` en Cloudflare)

**Antes de dar por terminado un cambio, correr `npm run build`.** No hay suite de
tests; el build de Astro + TypeScript es el gate de calidad.

---

## 3. Arquitectura

```
src/
├── layouts/       BaseLayout (shell HTML + SEO/OG) → PageLayout (Navbar+Footer+BottomNav
│                  +CommandPalette)
├── components/    agrupados por página: global/ seo/ ui/ home/ about/ services/
│                  projects/ contact/ blog/
├── content/       Content Collections (blog en Markdown) + config.ts con el schema
├── pages/         una .astro por ruta + blog/[...slug].astro + api/ (SSR)
├── styles/        global.css — Design System en @layer components/utilities
└── utils/         constants.ts (TODOS los datos) + helpers.ts + search.ts (matcher,
                   corre en cliente)

public/images/     assets propios: portrait.webp, og-default.png
scripts/           utilidades de build fuera de Astro (generate-og-image.mjs)
```

**Imágenes propias**: van en `public/images/` y se referencian como
`/images/archivo.ext`. Nada de hotlinking a CDNs externos para assets del sitio
(el retrato colgaba de una URL de `lh3.googleusercontent.com` que podía caducar).
Siempre con `width`/`height` en el `<img>` para evitar CLS.

Alias de TS: `@components`, `@layouts`, `@utils`, `@styles` (ver `tsconfig.json`).

### Reglas que no se rompen

- **Nada inventado en el sitio.** Sin testimonios anónimos, avatares falsos, logos de
  clientes que no existen ni links a repos que no existen (`href="#"`). Si un dato no es
  verificable, no se publica: se deja el hueco o se muestra el estado real
  (`""` en `demoUrl` → chip "No live demo"; `PLANNED_CERTIFICATIONS` → card punteada).

- **Todo dato vive en `src/utils/constants.ts`.** Nav, skills, servicios, proyectos,
  timeline, certificaciones y social links. Nunca hardcodear contenido en un componente.
- Un componente = una responsabilidad; props tipadas con `interface Props`.
- JS interactivo: `<script>` vanilla dentro del `.astro`. Sin React/Vue/Svelte.
- Estilos nuevos: clases en `global.css` (`@layer components`), no CSS suelto.
- Rutas API: requieren `export const prerender = false` (Astro 5 con `output: "static"`).
- Env vars: tipadas en `src/env.d.ts`, se leen con `locals.runtime.env.VAR_NAME`
  (no `import.meta.env` en las rutas API).
- Scripts del Navbar: delegación de eventos sobre `document` para sobrevivir a
  View Transitions.
- Iconos de marca: SVG inline (formato SimpleIcons, `viewBox="0 0 24 24"`).
  Iconos de UI: `material-symbols-outlined` (CDN de Google, cargado en BaseLayout).

---

## 4. Design System — "Architectural Pulse"

| Token | Valor | Uso |
|---|---|---|
| `primary` | `#6dddff` cyan eléctrico | acciones, links activos |
| `secondary` | `#2ff801` verde neón | estados / éxito |
| `tertiary` | `#82a3ff` periwinkle | acentos secundarios |
| `surface` | `#0a0e1a` | fondo base |
| `on-surface` | `#e2e4f6` | texto |

Fuentes: Space Grotesk (headlines) · Inter (body) · JetBrains Mono (código/terminal).
Clases propias más usadas: `.glass-card`, `.card-hover`, `.card-scanner`,
`.btn-primary`, `.section-label`, `.text-gradient-animated`, `.scroll-reveal` +
`.fade-up/in/left/right` (con `--reveal-delay` en el `style`).

Las animaciones respetan `prefers-reduced-motion`.

---

## 5. Certificaciones

Fuente de verdad: `CERTIFICATIONS` en `src/utils/constants.ts`.
Se renderizan en `src/components/about/Certifications.astro` (About page), agrupadas
por `issuer` **en el orden en que aparecen en el array**. Los grupos se derivan de los
datos: para un emisor nuevo basta añadir su entrada en `ISSUER_STYLES` dentro del
componente (color de marca + tinte de fondo + borde); si falta, cae a un estilo neutro.

Campos de `Certification`: `id`, `title`, `code`, `issuer`, `credlyUrl`, `badgeUrl`,
`accentColor`, `svgPath` (logo del emisor, SimpleIcons).

### Cómo obtener la URL real del badge de Credly

La página pública de Credly es una SPA: el `<img>` no se ve en el HTML plano, pero el
`og:image` sí trae el id de la imagen.

```bash
curl -sL "https://www.credly.com/badges/<BADGE-ID>/public_url" | grep -o 'og:image" content="[^"]*"'
```

Del resultado (`https://images.credly.com/images/<IMAGE-ID>/linkedin_thumb_blob`) se
toma el `<IMAGE-ID>` y se construye el `badgeUrl` en alta resolución:

```
https://images.credly.com/size/680x680/images/<IMAGE-ID>/blob
```

Ojo: algunos badges responden `403` con el sufijo `/image.png` y `200` con `/blob`.
Verificar siempre con `curl -o /dev/null -w "%{http_code}"` antes de commitear.

### Inventario actual (9 activas)

| Emisor | Certificación | Código |
|---|---|---|
| AWS | Solutions Architect – Associate | SAA-C03 |
| AWS | Developer – Associate | DVA-C02 |
| AWS | CloudOps Engineer – Associate | SOA-C03 |
| AWS | AI Practitioner | AIF-C01 |
| AWS | Cloud Practitioner | CLF-C02 |
| Google Cloud | Associate Cloud Engineer | ACE |
| Google Cloud | Professional Cloud Architect | PCA |
| Google Cloud | Generative AI Leader | GAIL |
| Anthropic | Claude Certified Architect — Foundations | CCA-F |

### Roadmap de certificaciones

`PLANNED_CERTIFICATIONS` (mismo archivo) son las **no obtenidas todavía**. Se pintan
como cards fantasma (borde punteado, chip `In progress`, sin link, `hourglass_top`)
al final del grupo de su emisor. Nunca deben parecer obtenidas: no llevan `badgeUrl`
ni `credlyUrl`, y no son `<a>`.

Al aprobar una: moverla a `CERTIFICATIONS` con su `credlyUrl` + `badgeUrl` y borrarla
de `PLANNED_CERTIFICATIONS`. El grupo, el contador y la nota "N on the roadmap" se
actualizan solos.

Hoy hay 3, todas del track de Anthropic (4 exámenes en total, Foundations ya obtenida):
Claude Certified Associate — Foundations, Claude Certified Developer — Foundations y
Claude Certified Architect — Professional.

Notas de contexto (no se muestran en el sitio):

- **Claude Certified Architect — Foundations** y **Generative AI Leader**: obtenidas en
  **julio de 2026**. La interfaz `Certification` no tiene campo de fecha porque el
  diseño actual no muestra fechas; si algún día se quieren mostrar, añadir
  `earnedDate?: string` en formato `"2026-07"` y renderizarlo condicionalmente.
- Las certificaciones de AWS caducan (3 años) y las de Anthropic son válidas 12 meses
  con renovación gratuita a tiempo. Hoy el sitio no muestra vigencias; si se añaden,
  usar `expiresDate?: string` y no mostrar nada cuando falte el dato.
- Color de marca de Anthropic en el sitio: `#D97757` (el hex oficial de SimpleIcons es
  `#191919`, ilegible sobre fondo oscuro).
- El fallback de badge (si Credly no carga, se muestra el `code`) vive en el `<script>`
  del componente, con `data-cert-badge`. No volver a usar `onerror=` inline: un atributo
  de evento sólo se puede permitir con `'unsafe-inline'` + `'unsafe-hashes'`, mientras que
  un bloque `<script>` se cubre con un hash/nonce el día que se endurezca la CSP.

---

## 6. Backend (Cloudflare Workers)

| Ruta | Qué hace | Secret |
|---|---|---|
| `src/pages/api/contact.ts` | formulario de contacto → Resend API → email HTML | `RESEND_API_KEY` |
| `src/pages/api/newsletter.ts` | alta en Resend Audiences | `RESEND_API_KEY` |

Variables en Cloudflare (Workers & Pages → Settings → Variables and Secrets):
`NODE_VERSION=22`, `CONTACT_TO_EMAIL`, `RESEND_API_KEY` (secret).
En local se leen de `.dev.vars` (**no commitear**).

### Headers y CSP

`public/_headers` define la CSP y los headers de seguridad. **Tiene que vivir en
`public/`**, no en la raíz: Cloudflare Pages sólo lee el `_headers` que queda dentro del
directorio publicado (`dist/`). Un `_headers` en la raíz del repo no se despliega y se
ignora en silencio — así estuvo el sitio hasta 2026-08-06, sin CSP en producción.

La sintaxis **no es TOML**: patrón de ruta, y debajo líneas `Header: value` con dos
espacios de indentación. Reglas que coinciden se concatenan, así que dos patrones que
matcheen el mismo archivo duplican el header (no poner `/images/*` y `/*.png` a la vez).

Orígenes permitidos hoy (todos en uso real):

| Origen | Para qué |
|---|---|
| `fonts.googleapis.com` | hojas de Google Fonts + Material Symbols |
| `fonts.gstatic.com` | los archivos de fuente |
| `cdn.jsdelivr.net` | Mermaid, importado dinámicamente en `blog/[...slug].astro` |
| `*.cloudflareinsights.com` | beacon de Web Analytics (aún apagado) |
| `img-src https:` | badges de Credly, imágenes de Unsplash |

Si se agrega un CDN o endpoint externo, actualizar `script-src` / `connect-src` ahí o el
recurso se bloquea en producción. Verificar siempre con `npm run preview` (wrangler sí
aplica `_headers`; `astro dev` no).

**Ojo**: las rutas SSR (`/api/*`) las sirve el Worker y no pasan por `_headers`.

### Búsqueda: índice + matcher

Tres piezas, una sola fuente de datos:

| Archivo | Qué es |
|---|---|
| `src/pages/search-index.json.ts` | genera `/search-index.json` en build |
| `src/utils/search.ts` | tipo `SearchEntry`, matcher fuzzy y carga cacheada del índice |
| consumidores | command palette (⌘K) y terminal de la 404 (`ls`, `cd`, `cat`, `find`) |

El índice sale entero de `constants.ts` + la colección de blog, así que **no hay nada que
mantener a mano**: una página nueva en `NAV_ITEMS` o un post nuevo aparecen solos, tanto en
el palette como en el `ls` de la 404. Lo único manual es `PAGE_KEYWORDS` (sinónimos por
página) y `NavItem.summary` (la línea de descripción; no se pinta en el navbar).

`search.ts` corre en cliente: nada de imports de `astro:*` ahí.

Dos decisiones del ranking, ambas por un fallo real:

- **Con query el listado es plano y ordenado por score**, no agrupado por tipo. Agrupar
  enterraba el mejor match bajo la cabecera "Pages": buscar `saa` devolvía *Home* primero en
  lugar de la certificación SAA-C03. El agrupado sólo queda en el estado vacío del palette.
- Hay **dos cortes**: uno relativo (35% del mejor score) y un **suelo absoluto**
  (`min(len, 6) * 6`). El relativo no basta cuando nada hace buen match — si el mejor
  resultado ya es ruido, el 35% de ese ruido sigue siendo ruido: `find eks` devolvía
  "QA Automation". Con el suelo, `eks` no devuelve nada, que es la respuesta correcta.

Todos los listeners cuelgan de `document` — igual que el Navbar — para sobrevivir a las
View Transitions, y `astro:page-load` restaura `body.overflow` y reetiqueta el atajo.

### Terminal de la 404

`src/pages/404.astro`. Tres trampas ya pisadas:

- **No es un `<form>` a propósito.** Con un solo input de texto y sin botón de submit, el
  navegador hace implicit submission: pulsar Enter *antes de que cargue el JS* navegaba a
  `?command=ls` y recargaba la página. Enter se maneja en el `keydown` del input.
- **`Astro.url.pathname` no sirve aquí**: la página es prerenderizada, así que siempre
  horneaba `/404/`. La ruta real la rellena el script desde `location.pathname`.
- **`print()` escribe innerHTML**: un `<name>` literal se parseaba como etiqueta y
  desaparecía. Todo lo que lleve `<` pasa por `escapeHtml`.

### Contenido público que hay que mantener sincronizado

Al añadir una página, un servicio o una certificación, revisar también:

| Archivo | Qué contiene |
|---|---|
| `public/llms.txt` | resumen + lista de páginas (para crawlers de IA) |
| `public/llms-full.txt` | contexto completo: perfil, servicios, skills, carrera, certificaciones, proyectos |
| `public/humans.txt` | créditos + `Last updated` |
| `src/pages/privacy.astro` | si se añade un servicio externo nuevo (analytics, comentarios, embeds), va documentado ahí |
| `src/pages/now.astro` → `NOW` en constants | `NOW.updated`: la página se autodeclara desactualizada a los 90 días |
| `PAGE_KEYWORDS` en `search-index.json.ts` | sinónimos de la página nueva para el command palette |

Estos archivos son contenido público: aplica la misma regla de "nada inventado".

### Iconos

`npm run icons` regenera desde `public/favicon.svg`: `favicon-32x32.png`,
`apple-touch-icon.png` (180, opaco), `icon-192.png`, `icon-512.png` y
`icon-maskable-512.png`. Si cambias el favicon, corre el script — `BaseLayout` y
`manifest.json` referencian esos archivos por nombre.

---

## 7. Blog

- Posts en `src/content/blog/*.md`, schema en `src/content/config.ts`.
- Shiki para syntax highlighting, Mermaid renderizado en cliente, TOC flotante,
  barra de progreso de lectura y CTA de newsletter al final del post.
- El feed RSS se genera en `src/pages/rss.xml.ts`.
- Al añadir un post: respetar el frontmatter del schema (si falta un campo requerido,
  el build falla, que es el comportamiento deseado).

---

## 8. Convenciones de commits

Estilo Conventional Commits en inglés, referenciando el número de feature del
roadmap cuando aplica:

```
feat: add newsletter subscription CTA and API endpoint (Feature #6)
```

Al completar una feature del roadmap, marcarla ✅ en `new-features.md` y actualizar
la tabla de fases y la fecha de "Last updated" en `PROJECT_STATUS.md`.

---

## 9. Trampas conocidas

- Tailwind **v3** — no migrar a v4 (`@astrojs/tailwind` v6 aún depende de v3).
- `output: "static"` + adapter de Cloudflare: sin `prerender = false` una ruta API se
  prerenderiza y devuelve 405 en producción.
- Las imágenes de badges se sirven desde `images.credly.com`; `img-src 'self' data: https:`
  en la CSP ya lo permite.
- `.claude/worktrees/` contiene copias del repo creadas por sesiones anteriores:
  ignorar al buscar código, la fuente es la raíz.
