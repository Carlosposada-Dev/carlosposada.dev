/** @type {import('tailwindcss').Config} */
// Tailwind Config — migrado directamente del Design System en hyper_scale_syntax/DESIGN.md
// Paleta: Deep-space dark con Electric Cyan (primary), Neon Green (secondary) y Periwinkle (tertiary)
export default {
  // Dark mode controlado por clase en <html>
  darkMode: "class",

  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],

  theme: {
    extend: {
      // ─────────────────────────────────────────────
      // COLORES — Design System "Architectural Pulse"
      // ─────────────────────────────────────────────
      colors: {
        // Superficies (jerarquía de profundidad — "The Stack Rule")
        surface: {
          DEFAULT: "#0a0e1a", // Level 0: fondo infinito
          dim: "#0a0e1a",
          bright: "#252b3f",
          variant: "#202537",
          tint: "#6dddff",
        },
        "surface-container": {
          lowest: "#000000",
          low: "#0e1320", // Level 1: bloques de contenido
          DEFAULT: "#141928", // Level 2: capa interactiva primaria
          high: "#1a1f2f",
          highest: "#202537", // Level 3: popovers / modals
        },
        background: "#0a0e1a",

        // Primary — Electric Cyan
        primary: {
          DEFAULT: "#6dddff",
          dim: "#00c3eb",
          fixed: "#00d2fd",
          "fixed-dim": "#00c3eb",
          container: "#00d2fd",
        },
        "on-primary": {
          DEFAULT: "#004c5e",
          fixed: "#002c37",
          "fixed-variant": "#004c5d",
          container: "#004352",
        },
        "inverse-primary": "#00687e",

        // Secondary — Neon Green (Status: success / build passed)
        secondary: {
          DEFAULT: "#2ff801",
          dim: "#2be800",
          fixed: "#2ff801",
          "fixed-dim": "#2be800",
          container: "#106e00",
        },
        "on-secondary": {
          DEFAULT: "#0b5800",
          fixed: "#064200",
          "fixed-variant": "#0d6200",
          container: "#e7ffd9",
        },

        // Tertiary — Periwinkle Blue (keywords / accents)
        tertiary: {
          DEFAULT: "#82a3ff",
          dim: "#759aff",
          fixed: "#92aeff",
          "fixed-dim": "#7da0ff",
          container: "#6f94fa",
        },
        "on-tertiary": {
          DEFAULT: "#002363",
          fixed: "#001442",
          "fixed-variant": "#003388",
          container: "#001747",
        },

        // On-surface
        "on-surface": {
          DEFAULT: "#e2e4f6",
          variant: "#a7aabb",
        },
        "on-background": "#e2e4f6",
        "inverse-surface": "#faf8ff",
        "inverse-on-surface": "#515463",

        // Borders y outlines
        outline: {
          DEFAULT: "#717584",
          variant: "#444756",
        },

        // Error
        error: {
          DEFAULT: "#ff716c",
          dim: "#d7383b",
          container: "#9f0519",
        },
        "on-error": {
          DEFAULT: "#490006",
          container: "#ffa8a3",
        },
      },

      // ─────────────────────────────────────────────
      // BORDER RADIUS — "Sharp-but-Smooth" (estilo Vercel/Linear)
      // ─────────────────────────────────────────────
      borderRadius: {
        DEFAULT: "0.125rem", // 2px — tags, pequeños elementos
        sm: "0.125rem",
        md: "0.25rem",
        lg: "0.25rem", // 4px — botones, inputs
        xl: "0.5rem", // 8px — cards, contenedores
        "2xl": "1rem", // 16px — secciones grandes
        "3xl": "1.5rem", // 24px — hero containers
        full: "0.75rem", // 12px (NO pill shapes según Design System)
      },

      // ─────────────────────────────────────────────
      // FUENTES — "Monospace Editorial"
      // ─────────────────────────────────────────────
      fontFamily: {
        headline: ["Space Grotesk", "sans-serif"], // Display, títulos
        body: ["Inter", "sans-serif"], // Cuerpo de texto
        label: ["Space Grotesk", "sans-serif"], // Tags, metadata
        mono: ["JetBrains Mono", "Fira Code", "monospace"], // Código
      },

      // ─────────────────────────────────────────────
      // BOX SHADOW — "Ambient Glows" (no drop shadows)
      // ─────────────────────────────────────────────
      boxShadow: {
        "glow-primary": "0 0 20px rgba(109, 221, 255, 0.15)",
        "glow-primary-md": "0 0 30px rgba(109, 221, 255, 0.25)",
        "glow-primary-lg": "0 0 40px rgba(109, 221, 255, 0.4)",
        "glow-secondary": "0 0 20px rgba(47, 248, 1, 0.1)",
        "glow-secondary-md": "0 0 25px rgba(47, 248, 1, 0.2)",
        "glow-tertiary": "0 0 20px rgba(130, 163, 255, 0.1)",
        "nav-glow": "0 0 20px rgba(0, 212, 255, 0.15)",
        "input-glow": "0 0 12px rgba(109, 221, 255, 0.4)",
        card: "0 0 0 1px rgba(68, 71, 86, 0.2)",
      },

      // ─────────────────────────────────────────────
      // ANIMACIONES
      // ─────────────────────────────────────────────
      keyframes: {
        blink: {
          "from, to": { color: "transparent" },
          "50%": { color: "#6dddff" },
        },
        ping: {
          "75%, 100%": { transform: "scale(2)", opacity: "0" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        "slide-up": "slide-up 0.5s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
      },

      // ─────────────────────────────────────────────
      // SPACING — Base-4 grid
      // ─────────────────────────────────────────────
      spacing: {
        // Secciones: 80px-120px vertical padding
        section: "5rem", // 80px
        "section-lg": "7.5rem", // 120px
      },
    },
  },

  plugins: [
    // Typography para el blog (prose classes)
    require("@tailwindcss/typography"),
  ],
};
