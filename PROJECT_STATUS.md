# carlosposada.dev — Project Status & Context

> Archivo de contexto maestro. Compartir al inicio de cada nuevo chat.
> Última actualización: Fase 3 completa, pendiente deploy + Fase 4.

---

## 🧠 Stack de decisiones

| Decisión | Elección | Razón |
|---|---|---|
| Framework | **Astro 4** (hybrid output) | 95% estático + island para contacto |
| CSS | **Tailwind CSS 3** | Design System mapeado directo |
| Hosting | **Cloudflare Pages** | Dominio ya en CF, $0, Workers integrados |
| Backend contact | **Cloudflare Worker + Resend API** | Serverless edge, sin infra |
| Blog content | **Astro Content Collections** | Markdown nativo, git-based |
| Newsletter | **Buttondown / Resend Audiences** | Externo, gratis <1000 subs |
| Node.js target | **v22** | ⚠️ PENDIENTE — actualizar deps |
| IaC showcase | **Terraform en /infra** | Primer post del blog |

---

## 📁 Estructura actual del proyecto

```
carlosposada-dev/
├── astro.config.mjs          # hybrid output + Cloudflare adapter + Tailwind + Sitemap
├── tailwind.config.mjs       # Design System completo (colores, fuentes, shadows, animations)
├── tsconfig.json             # strict + path aliases (@components, @layouts, @utils, etc.)
├── wrangler.toml             # Config Cloudflare Workers para dev local
├── _headers                  # Headers de seguridad Cloudflare Pages (CSP, cache)
├── _redirects                # www → apex redirect
├── package.json              # ⚠️ deps en versiones antiguas, pendiente update a Node 22
│
├── public/
│   ├── favicon.svg           # Terminal SVG: brackets cyan + slash verde
│   └── robots.txt
│   # PENDIENTE agregar:
│   # ├── images/portrait.webp    (foto profesional real)
│   # ├── images/og-default.png   (imagen SEO redes sociales)
│   # └── carlos-posada-cv.pdf    (CV para descargar)
│
└── src/
    ├── layouts/
    │   ├── BaseLayout.astro   # HTML shell, meta tags OG, fuentes Google, sitemap link
    │   └── PageLayout.astro   # Navbar + Footer + BottomNav wrapper
    │
    ├── styles/
    │   └── global.css         # Tailwind base/components/utilities + clases custom DS
    │
    ├── utils/
    │   ├── constants.ts       # TODA la data del sitio (nav, skills, services, projects, career)
    │   └── helpers.ts         # getReadingTime, formatDate, slugify
    │
    ├── components/
    │   ├── global/
    │   │   ├── Navbar.astro       # Top nav responsive + hamburger animado
    │   │   ├── Footer.astro       # Links + copyright
    │   │   └── BottomNav.astro    # Mobile bottom navigation (4 items)
    │   │
    │   ├── home/
    │   │   ├── HeroSection.astro      # Badge status + headline + terminal card decorativa
    │   │   ├── SkillsBar.astro        # Stack tecnológico (grayscale→color hover)
    │   │   ├── ServicesPreview.astro  # 3 cards de servicios con acento de color
    │   │   ├── FeaturedProjects.astro # 3 proyectos con imagen, tags, CTA
    │   │   ├── Testimonials.astro     # 4 métricas + testimonial + avatares
    │   │   └── CTABanner.astro        # Banner final reutilizable (usado en About y Services)
    │   │
    │   ├── about/
    │   │   ├── ProfileCard.astro   # Foto (URL Google LH3) + badge OpenToWork + social links
    │   │   ├── BioSection.astro    # Headline editorial + 2 párrafos bio
    │   │   └── CareerTimeline.astro # Timeline 3 entradas, nodo activo cyan
    │   │
    │   ├── services/
    │   │   └── ServiceTile.astro  # Tile reutilizable, layout normal/reverse por servicio
    │   │
    │   ├── projects/
    │   │   ├── ProjectCard.astro   # Card con imagen zoom, tags coloreados, GitHub+demo
    │   │   └── ProjectFilter.astro # Filtros JS vanilla (All/DevOps/Cloud/QA/AI) + animación
    │   │
    │   └── contact/
    │       ├── ContactForm.astro    # Form 4 campos + validación client-side + 4 estados UI
    │       ├── ContactMethods.astro # Email / LinkedIn / GitHub con flecha animada
    │       └── LocationCard.astro   # Medellín + COT (UTC-5)
    │
    └── pages/
        ├── index.astro         # ✅ Home completa (6 secciones)
        ├── about.astro         # ✅ ProfileCard sticky + BioSection + CareerTimeline
        ├── services.astro      # ✅ Header editorial + 3 ServiceTiles + CTABanner
        ├── projects.astro      # ✅ Hero + filtros JS + 5 ProjectCards + card CTA
        ├── contact.astro       # ✅ 2 columnas: info+canales | formulario sticky
        ├── 404.astro           # ✅ Terminal style error page
        ├── blog/
        │   └── index.astro     # ⏳ Placeholder Fase 4
        └── api/
            └── contact.ts      # ✅ Cloudflare Worker λ → Resend API → email HTML
```

---

## 🎨 Design System "Architectural Pulse"

**Paleta de colores:**
- `primary`: `#6dddff` — Electric Cyan (acciones principales, links activos)
- `secondary`: `#2ff801` — Neon Green (status, success, build passed)
- `tertiary`: `#82a3ff` — Periwinkle Blue (keywords, acentos secundarios)
- `surface`: `#0a0e1a` — Deep space (fondo base)
- `on-surface`: `#e2e4f6` — Texto principal

**Fuentes:**
- `font-headline`: Space Grotesk (títulos, botones, labels)
- `font-body`: Inter (párrafos, descripciones)
- `font-mono`: JetBrains Mono / Fira Code (código, terminal)

**Clases utilitarias custom en global.css:**
- `.grid-mesh-lines` / `.grid-mesh-dots` — texturas de fondo blueprint
- `.glass-card` / `.glass-panel` — glassmorphism
- `.terminal-block` / `.terminal-cursor` / `.terminal-pre` — estilo terminal
- `.btn-primary` / `.btn-secondary` / `.btn-ghost` — botones
- `.card` / `.card-hover` — tarjetas
- `.tech-tag-primary/secondary/tertiary` — tags de tecnología
- `.input-base` — inputs del formulario
- `.section-label` — labels de sección uppercase
- `.status-dot` — indicador pulsante verde
- `.text-hero` — tipografía hero con clamp()

---

## 📊 Estado de las fases

### ✅ Fase 1 — Fundación (COMPLETA)
Scaffold Astro + Design System + Layouts + Navbar/Footer + Home page completa.

### ✅ Fase 2 — Páginas Core (COMPLETA)
About (ProfileCard sticky + timeline carrera), Services (3 tiles), Projects (filtros JS vanilla).

### ✅ Fase 3 — Contacto + Backend (COMPLETA — pendiente activar en producción)
Formulario con validación, Cloudflare Worker `/api/contact`, integración Resend API.

**Para activar el Worker en producción:**
1. Crear cuenta en resend.com → obtener API Key
2. Verificar dominio `carlosposada.dev` en Resend (registros DNS en Cloudflare)
3. En Cloudflare Pages → Settings → Environment Variables:
   - `RESEND_API_KEY` = `re_xxxx` (tipo **Secret**)
   - `CONTACT_TO_EMAIL` = `hello@carlosposada.dev`

### ⏳ Fase 4 — Blog (PENDIENTE)
**Archivos a crear:**
- `src/content/config.ts` — schema Content Collections
- `src/content/blog/*.md` — posts en Markdown
- `src/components/blog/` — PostCard, FeaturedPost, TagCloud, NewsletterForm
- `src/pages/blog/index.astro` — listing con featured + sidebar
- `src/pages/blog/[...slug].astro` — post individual dinámico
- `src/pages/rss.xml.ts` — feed RSS
- `infra/terraform/` — código IaC para primer post

**Primer post acordado:**
- Título: *"Deploy a Static Site on AWS: S3 + CloudFront + ACM + Lambda + SES — Full Terraform"*
- Compara arquitectura Cloudflare Pages (actual) vs AWS completo
- Incluye módulos Terraform oficiales de HashiCorp

### ⏳ Fase 5 — Polish + Deploy (PARCIALMENTE COMPLETA)
- ✅ Cloudflare Pages config (_headers, _redirects, wrangler.toml)
- ⚠️ **PENDIENTE: actualizar dependencias a Node.js 22**
- ⏳ OG images dinámicas
- ⏳ Schema.org structured data
- ⏳ Cloudflare Web Analytics
- ⏳ `public/carlos-posada-cv.pdf`
- ⏳ `public/images/portrait.webp` (foto real)
- ⏳ `public/images/og-default.png`

---

## ⚠️ Tareas pendientes prioritarias

### 1. Actualizar dependencias a Node.js 22 (PRÓXIMA TAREA)
El `package.json` tiene versiones antiguas. Hay que:
- Agregar `"engines": { "node": ">=22" }` al package.json
- Actualizar Astro a v5.x (compatible con Node 22)
- Actualizar `@astrojs/cloudflare`, `@astrojs/tailwind`, `@astrojs/sitemap`
- Actualizar TypeScript a 5.6+
- Agregar `NODE_VERSION=22` en Cloudflare Pages env vars

### 2. Primer deploy en Cloudflare Pages
```bash
git init
git add .
git commit -m "feat: initial site - Phases 1, 2 & 3 complete"
git branch -M main
git remote add origin https://github.com/Carlosposada-Dev/carlosposada-dev.git
git push -u origin main
```
Luego conectar en dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git.

### 3. Datos reales a actualizar en constants.ts
- URLs de proyectos en `PROJECTS[]` → repos reales de GitHub
- Foto del About → cambiar URL Google LH3 por `/images/portrait.webp` cuando tengas la foto
- Email en `SITE.email` → confirmar si es hello@carlosposada.dev

---

## 🔑 Links importantes del proyecto

| Recurso | URL |
|---|---|
| GitHub | https://github.com/Carlosposada-Dev |
| LinkedIn | https://www.linkedin.com/in/carlos-andres-posada-chica-software-engineer/ |
| Dominio | carlosposada.dev (en Cloudflare) |
| Resend | https://resend.com (para activar email del formulario) |

---

## 💡 Convenciones del código

- **Datos**: todo centralizado en `src/utils/constants.ts` — nunca hardcodear en componentes
- **Componentes**: un componente = una responsabilidad, props tipadas con `interface Props`
- **Imágenes externas**: referenciar por URL en constants.ts
- **Imágenes propias**: guardar en `public/images/` y referenciar como `/images/nombre.ext`
- **Estilos custom**: definir en `global.css` como `@layer components` o `@layer utilities`
- **JS interactivo**: script vanilla en el propio componente `.astro`, sin frameworks adicionales
- **API routes**: en `src/pages/api/` con `export const POST: APIRoute`
