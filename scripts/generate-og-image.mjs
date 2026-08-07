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

  <!-- Cert strip -->
  <g transform="translate(80, 470)" font-family="${MONO}" font-size="21" font-weight="700" letter-spacing="2">
    <rect x="0" y="0" width="128" height="44" rx="10" fill="#FF9900" fill-opacity="0.12" stroke="#FF9900" stroke-opacity="0.4"/>
    <text x="64" y="30" fill="#FF9900" text-anchor="middle">AWS x5</text>

    <rect x="144" y="0" width="128" height="44" rx="10" fill="#4285F4" fill-opacity="0.12" stroke="#4285F4" stroke-opacity="0.4"/>
    <text x="208" y="30" fill="#4285F4" text-anchor="middle">GCP x3</text>

    <rect x="288" y="0" width="188" height="44" rx="10" fill="#D97757" fill-opacity="0.12" stroke="#D97757" stroke-opacity="0.4"/>
    <text x="382" y="30" fill="#D97757" text-anchor="middle">ANTHROPIC x1</text>
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
