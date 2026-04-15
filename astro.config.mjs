import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://carlosposada.dev",
  integrations: [
    tailwind({
      configFile: "./tailwind.config.mjs",
    }),
    sitemap({
      filter: (page) => !page.includes("/404"),
    }),
  ],
  // static: páginas estáticas por defecto + API route server-side
  // En Astro v5 'hybrid' fue renombrado a 'static' (comportamiento idéntico)
  output: "static",
  adapter: cloudflare({
    // Workers de Cloudflare Pages (no Workers standalone)
    platformProxy: { enabled: true },
  }),
  build: {
    inlineStylesheets: "auto",
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  vite: {
    // Silenciar el warning de empty chunk de astro/env-setup (inofensivo)
    build: { chunkSizeWarningLimit: 1024 },
    resolve: {
      alias: {
        "@components": "/src/components",
        "@layouts": "/src/layouts",
        "@utils": "/src/utils",
        "@styles": "/src/styles",
        "@content": "/src/content",
      },
    },
  },
});
