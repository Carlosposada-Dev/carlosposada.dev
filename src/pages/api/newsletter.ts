/**
 * src/pages/api/newsletter.ts
 * Cloudflare Worker — endpoint POST /api/newsletter
 *
 * Adds a subscriber to the Resend Audience via the Contacts API.
 * Handles duplicates gracefully (Resend upserts on existing email).
 *
 * Required environment variables (Cloudflare Pages → Settings → Variables):
 *  - RESEND_API_KEY      → API key from resend.com
 *  - RESEND_AUDIENCE_ID  → Audience ID from resend.com/audiences
 */

import type { APIRoute } from "astro";

export const prerender = false;

const CORS_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "https://carlosposada.dev",
};

function isValidEmail(email: unknown): email is string {
  return (
    typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  );
}

export const POST: APIRoute = async ({ request, locals }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body." }), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  const email = (body as Record<string, unknown>)?.email;

  if (!isValidEmail(email)) {
    return new Response(JSON.stringify({ error: "A valid email address is required." }), {
      status: 422,
      headers: CORS_HEADERS,
    });
  }

  const { runtime } = locals;
  const RESEND_API_KEY = runtime?.env?.RESEND_API_KEY;
  const RESEND_AUDIENCE_ID = runtime?.env?.RESEND_AUDIENCE_ID;

  if (!RESEND_API_KEY || !RESEND_AUDIENCE_ID) {
    console.error("[newsletter] Missing RESEND_API_KEY or RESEND_AUDIENCE_ID");
    return new Response(
      JSON.stringify({ error: "Newsletter service not configured." }),
      { status: 503, headers: CORS_HEADERS }
    );
  }

  try {
    const res = await fetch(
      `https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim(), unsubscribed: false }),
      }
    );

    // Resend returns 200/201 on success and 409 if already subscribed (upsert).
    // Treat both as success — subscriber is already on the list.
    if (!res.ok && res.status !== 409) {
      const err = await res.json().catch(() => ({}));
      console.error("[newsletter] Resend error:", err);
      throw new Error("Failed to subscribe");
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: CORS_HEADERS,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[newsletter] Unexpected error:", message);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500, headers: CORS_HEADERS }
    );
  }
};

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

export const GET: APIRoute = () =>
  new Response(JSON.stringify({ error: "Method not allowed." }), { status: 405 });
