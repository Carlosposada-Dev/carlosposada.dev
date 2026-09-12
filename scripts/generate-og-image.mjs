/**
 * Generates public/images/og-default.png (1200x630) for carlosposada.dev
 * Design System: surface #0a0e1a, primary #6dddff, secondary #2ff801, tertiary #82a3ff
 * Run: node gen-og.mjs   (cwd = project root)
 */
import sharp from "sharp";

const W = 1200;
const H = 630;

const gridLines = () => {
  let out = "";
  for (let x = 0; x <= W; x += 60) {
    out += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="#6dddff" stroke-opacity="0.05" stroke-width="1"/>`;
  }
  for (let y = 0; y <= H; y += 60) {
    out += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="#6dddff" stroke-opacity="0.05" stroke-width="1"/>`;
  }
  return out;
};

const SANS = "Segoe UI, Arial, Helvetica, sans-serif";
const MONO = "Consolas, Courier New, monospace";

/**
 * Tira de certificaciones.
 *
 * Duplica a mano lo que hay en `CERTIFICATIONS` (src/utils/constants.ts) porque
 * este script corre en Node plano y no puede importar TypeScript. **Al añadir o
 * quitar una certificación, actualizar esta lista y correr `npm run og`** — si
 * no, la preview social queda mintiendo (así se quedó sin Microsoft entre el
 * 2026-08-15 y el 2026-09-12).
 *
 * Las posiciones se calculan: añadir un chip es una línea, no recolocar todo.
 */
const CERT_STRIP = [
  { label: "K8S x1", color: "#5B8DEF" },
  { label: "AWS x5", color: "#FF9900" },
  { label: "GCP x3", color: "#4285F4" },
  { label: "AZURE x1", color: "#00A4EF" },
  { label: "ANTHROPIC x1", color: "#D97757" },
];

/** Ancho del chip a partir del texto: ~13px por carácter (mono 21 + tracking 2) + padding */
const chipWidth = (label) => label.length * 13 + 44;

const certStrip = (() => {
  const GAP = 16;
  let x = 0;
  const parts = CERT_STRIP.map(({ label, color }) => {
    const w = chipWidth(label);
    const chip = `
    <rect x="${x}" y="0" width="${w}" height="44" rx="10" fill="${color}" fill-opacity="0.12" stroke="${color}" stroke-opacity="0.4"/>
    <text x="${x + w / 2}" y="30" fill="${color}" text-anchor="middle">${label}</text>`;
    x += w + GAP;
    return chip;
  });
  const total = x - GAP;
  // 80px de margen a cada lado: si se pasa, hay que acortar etiquetas
  if (total > W - 160) {
    throw new Error(
      `Cert strip mide ${total}px y no cabe en ${W - 160}px. Acorta alguna etiqueta en CERT_STRIP.`
    );
  }
  return parts.join("\n");
})();

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glowA" cx="15%" cy="12%" r="55%">
      <stop offset="0%" stop-color="#6dddff" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="#6dddff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="88%" cy="88%" r="50%">
      <stop offset="0%" stop-color="#82a3ff" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#82a3ff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#6dddff" stop-opacity="0.9"/>
      <stop offset="60%" stop-color="#82a3ff" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#82a3ff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="topbar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#6dddff"/>
      <stop offset="55%" stop-color="#82a3ff"/>
      <stop offset="100%" stop-color="#2ff801"/>
    </linearGradient>
  </defs>

  <!-- Base -->
  <rect width="${W}" height="${H}" fill="#0a0e1a"/>
  ${gridLines()}
  <rect width="${W}" height="${H}" fill="url(#glowA)"/>
  <rect width="${W}" height="${H}" fill="url(#glowB)"/>

  <!-- Accent bar -->
  <rect x="0" y="0" width="${W}" height="6" fill="url(#topbar)"/>

  <!-- Terminal mark: [ / ] -->
  <g transform="translate(980, 92)" font-family="${MONO}" font-weight="700">
    <text x="0" y="0" font-size="120" fill="#6dddff" fill-opacity="0.9">[</text>
    <text x="46" y="0" font-size="120" fill="#2ff801" fill-opacity="0.9">/</text>
    <text x="104" y="0" font-size="120" fill="#6dddff" fill-opacity="0.9">]</text>
  </g>

  <!-- Eyebrow -->
  <text x="80" y="212" font-family="${MONO}" font-size="24" letter-spacing="6"
        fill="#6dddff" fill-opacity="0.85">CLOUD &#183; DEVOPS &#183; AI</text>

  <!-- Name -->
  <text x="80" y="318" font-family="${SANS}" font-size="96" font-weight="700"
        fill="#e2e4f6" letter-spacing="-2">Carlos Posada</text>

  <!-- Rule -->
  <rect x="80" y="352" width="600" height="3" fill="url(#rule)"/>

  <!-- Tagline -->
  <text x="80" y="412" font-family="${SANS}" font-size="34" font-weight="600" fill="#a9b3d6">
    Infrastructure as Code &#183; Kubernetes &#183; CI/CD &#183; Platform Engineering
  </text>

  <!-- Cert strip — posiciones calculadas, no a mano (ver CERT_STRIP arriba) -->
  <g transform="translate(80, 470)" font-family="${MONO}" font-size="21" font-weight="700" letter-spacing="2">
    ${certStrip}
  </g>

  <!-- Footer: status + domain -->
  <g transform="translate(80, 572)">
    <circle cx="8" cy="-7" r="7" fill="#2ff801"/>
    <circle cx="8" cy="-7" r="13" fill="#2ff801" fill-opacity="0.18"/>
    <text x="32" y="0" font-family="${MONO}" font-size="27" font-weight="700"
          fill="#e2e4f6" letter-spacing="1">carlosposada.dev</text>
  </g>
  <text x="${W - 80}" y="572" text-anchor="end" font-family="${MONO}" font-size="22"
        letter-spacing="3" fill="#8b93b8">MEDELL&#205;N, CO &#183; UTC-5</text>
</svg>`;

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9, palette: false })
  .toFile("public/images/og-default.png");

const meta = await sharp("public/images/og-default.png").metadata();
console.log(`og-default.png ${meta.width}x${meta.height} ${Math.round(meta.size / 1024)}KB`);
