/**
 * Generates the raster icons referenced by BaseLayout.astro and manifest.json
 * from public/favicon.svg (single source of truth).
 *
 * Run: npm run icons   (cwd = project root)
 *
 * Outputs:
 *   public/favicon-32x32.png    <link rel="icon" sizes="32x32">
 *   public/apple-touch-icon.png <link rel="apple-touch-icon"> (180x180, opaque)
 *   public/icon-192.png         manifest (any)
 *   public/icon-512.png         manifest (any)
 *   public/icon-maskable-512.png manifest (maskable — 20% safe-zone padding)
 */
import fs from "node:fs";
import sharp from "sharp";

const SVG = fs.readFileSync("public/favicon.svg");
const SURFACE = { r: 10, g: 14, b: 26, alpha: 1 }; // #0a0e1a

const render = (size) => sharp(SVG, { density: 384 }).resize(size, size);

/** Maskable icons need the mark inside a ~80% safe zone, on an opaque background */
const renderMaskable = async (size) => {
  const inner = Math.round(size * 0.6);
  const pad = Math.round((size - inner) / 2);
  const mark = await render(inner).png().toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background: SURFACE },
  }).composite([{ input: mark, top: pad, left: pad }]);
};

const outputs = [
  ["public/favicon-32x32.png", () => render(32).png()],
  ["public/apple-touch-icon.png", () => render(180).flatten({ background: SURFACE }).png()],
  ["public/icon-192.png", () => render(192).png()],
  ["public/icon-512.png", () => render(512).png()],
  ["public/icon-maskable-512.png", () => renderMaskable(512).then((s) => s.png())],
];

for (const [file, build] of outputs) {
  const pipeline = await build();
  const info = await pipeline.toFile(file);
  console.log(`${file} ${info.width}x${info.height} ${Math.round(info.size / 1024)}KB`);
}
