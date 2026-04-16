/// <reference path="../.astro/types.d.ts" />

// Declara el tipo del runtime de Cloudflare Workers para Astro.
// Esto permite acceder a locals.runtime.env con tipado correcto
// en los API routes del adapter @astrojs/cloudflare.
type CloudflareEnv = {
  RESEND_API_KEY: string;
  CONTACT_TO_EMAIL: string;
};

declare namespace App {
  interface Locals {
    runtime: import("@astrojs/cloudflare").Runtime<CloudflareEnv>;
  }
}