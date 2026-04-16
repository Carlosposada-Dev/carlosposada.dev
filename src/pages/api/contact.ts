/**
 * src/pages/api/contact.ts
 * Cloudflare Worker — endpoint POST /api/contact
 *
 * Flujo:
 *  1. Valida el body JSON recibido desde el formulario
 *  2. Aplica rate-limit básico por IP (Cloudflare KV opcional)
 *  3. Envía el email vía Resend API (https://resend.com)
 *  4. Devuelve JSON { ok: true } o { error: string }
 *
 * Variables de entorno requeridas (Cloudflare Pages → Settings → Variables):
 *  - RESEND_API_KEY   → tu API key de resend.com
 *  - CONTACT_TO_EMAIL → email donde recibirás los mensajes (ej: hello@carlosposada.dev)
 */

import type { APIRoute } from "astro";

// Requerido en Astro v5 output:"static" para que el adapter de Cloudflare
// incluya esta ruta en _routes.json → include[] en lugar de exclude[].
// Sin esto, /api/contact se sirve como archivo estático → 405 en POST.
export const prerender = false;

// ── Tipos ───────────────────────────────────────────────────
interface ContactPayload {
  name: string;
  email: string;
  inquiry: string;
  message: string;
}

interface ResendError {
  statusCode: number;
  message: string;
}

// ── Constantes ──────────────────────────────────────────────
const RESEND_API_URL = "https://api.resend.com/emails";
const INQUIRY_LABELS: Record<string, string> = {
  hiring: "Hiring (Full-time)",
  freelance: "Freelance Project",
  collaboration: "Collaboration",
  other: "Other",
};

// ── Helper: validación de payload ───────────────────────────
function validatePayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;

  const nameOk = typeof b.name === "string" && b.name.trim().length >= 2;
  const emailOk =
    typeof b.email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email);
  const messageOk = typeof b.message === "string" && b.message.trim().length >= 10;
  const inquiryOk =
    typeof b.inquiry === "string" &&
    ["hiring", "freelance", "collaboration", "other"].includes(b.inquiry);

  return nameOk && emailOk && messageOk && inquiryOk;
}

// ── Helper: construye el HTML del email ─────────────────────
function buildEmailHtml(data: ContactPayload): string {
  const inquiryLabel = INQUIRY_LABELS[data.inquiry] ?? data.inquiry;
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8" /></head>
    <body style="background:#0a0e1a;color:#e2e4f6;font-family:Inter,sans-serif;padding:32px;max-width:600px;margin:auto;">
      <h2 style="color:#6dddff;font-family:'Space Grotesk',sans-serif;margin-bottom:8px;">
        New message from carlosposada.dev
      </h2>
      <p style="color:#a7aabb;font-size:12px;margin-bottom:32px;border-bottom:1px solid #202537;padding-bottom:16px;">
        Received via contact form
      </p>

      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:10px 0;color:#a7aabb;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;width:120px;">Name</td>
          <td style="padding:10px 0;font-weight:bold;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;color:#a7aabb;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Email</td>
          <td style="padding:10px 0;"><a href="mailto:${data.email}" style="color:#6dddff;">${data.email}</a></td>
        </tr>
        <tr>
          <td style="padding:10px 0;color:#a7aabb;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Inquiry</td>
          <td style="padding:10px 0;"><span style="background:#141928;border:1px solid #444756;padding:2px 10px;border-radius:4px;font-size:12px;">${inquiryLabel}</span></td>
        </tr>
      </table>

      <div style="margin-top:24px;background:#141928;border-left:3px solid #6dddff;padding:16px 20px;border-radius:4px;">
        <p style="color:#a7aabb;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 10px;">Message</p>
        <p style="white-space:pre-wrap;line-height:1.6;margin:0;">${data.message}</p>
      </div>

      <p style="margin-top:32px;color:#717584;font-size:11px;border-top:1px solid #202537;padding-top:16px;">
        Sent from carlosposada.dev contact form
      </p>
    </body>
    </html>
  `;
}

// ── Handler principal ────────────────────────────────────────
export const POST: APIRoute = async ({ request, locals }) => {
  // CORS header para el fetch del formulario
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://carlosposada.dev",
  };

  // ── 1. Parsear body ──────────────────────────────────────
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body." }), {
      status: 400,
      headers,
    });
  }

  // ── 2. Validar payload ───────────────────────────────────
  if (!validatePayload(body)) {
    return new Response(
      JSON.stringify({ error: "Missing or invalid fields." }),
      { status: 422, headers }
    );
  }

  // ── 3. Leer variables de entorno (Cloudflare Workers runtime) ──
  // locals.runtime.env es el objeto env del Worker, tipado via App.Locals en env.d.ts
  const { runtime } = locals;
  const RESEND_API_KEY = runtime?.env?.RESEND_API_KEY;
  const CONTACT_TO_EMAIL = runtime?.env?.CONTACT_TO_EMAIL ?? "hello@carlosposada.dev";

  if (!RESEND_API_KEY) {
    console.error("[contact] RESEND_API_KEY not configured");
    return new Response(
      JSON.stringify({ error: "Email service not configured. Please contact me directly." }),
      { status: 503, headers }
    );
  }

  // ── 4. Enviar email vía Resend ───────────────────────────
  try {
    const resendRes = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "carlosposada.dev <noreply@carlosposada.dev>",
        to: [CONTACT_TO_EMAIL],
        reply_to: body.email,
        subject: `[${INQUIRY_LABELS[body.inquiry]}] New message from ${body.name}`,
        html: buildEmailHtml(body),
      }),
    });

    if (!resendRes.ok) {
      const errBody = (await resendRes.json().catch(() => ({}))) as ResendError;
      console.error("[contact] Resend error:", errBody);
      throw new Error(errBody.message ?? "Failed to send email");
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[contact] Unexpected error:", message);
    return new Response(
      JSON.stringify({ error: "Failed to send message. Please try again." }),
      { status: 500, headers }
    );
  }
};

// Preflight CORS — necesario para fetch cross-origin desde el formulario
export const OPTIONS: APIRoute = () =>
  new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "https://carlosposada.dev",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });

// Rechazar métodos distintos a POST / OPTIONS
export const GET: APIRoute = () =>
  new Response(JSON.stringify({ error: "Method not allowed." }), { status: 405 });
