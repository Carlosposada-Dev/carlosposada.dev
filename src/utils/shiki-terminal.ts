/**
 * shiki-terminal.ts — transformer de Shiki para los bloques de código del blog.
 *
 * Envuelve cada <pre> en una ventana de terminal: cabecera con el host donde se
 * ejecuta (`host=cp1`), un título opcional (`title="main.tf"`), el lenguaje y un
 * botón de copiar (lo activa el script de blog/[...slug].astro). Los dos valores
 * salen del meta del bloque en Markdown:
 *
 *   ```bash host=cp1 title="kubeadm init"
 *
 * Los bloques sin lenguaje (`plaintext`) se marcan como salida: son lo que el
 * lector debería ver, no lo que tiene que ejecutar. Mermaid se deja tal cual —
 * el script del post lo sustituye por el diagrama.
 */
import type { ShikiTransformer } from "shiki";
import type { Element, ElementContent } from "hast";

const OUTPUT_LANGS = new Set(["plaintext", "text", "txt"]);

const span = (cls: string, text: string): Element => ({
  type: "element",
  tagName: "span",
  properties: { className: [cls] },
  children: [{ type: "text", value: text }],
});

/** `host=cp1 title="main.tf"` → { host: "cp1", title: "main.tf" } */
export function parseMeta(raw = ""): Record<string, string> {
  const out: Record<string, string> = {};
  for (const m of raw.matchAll(/(\w+)=(?:"([^"]*)"|(\S+))/g)) out[m[1]] = m[2] ?? m[3];
  return out;
}

export const terminalBlocks: ShikiTransformer = {
  name: "terminal-blocks",
  root(root) {
    const lang = this.options.lang;
    const pre = root.children.find((n): n is Element => n.type === "element" && n.tagName === "pre");
    if (!pre || lang === "mermaid") return;

    const { host, title } = parseMeta(this.options.meta?.__raw);
    const isOutput = OUTPUT_LANGS.has(lang);
    const head: ElementContent[] = [];
    if (host) head.push(span("code-host", host));
    if (title) head.push(span("code-title", title));
    head.push(span("code-lang", isOutput ? "output" : lang));
    head.push({
      type: "element",
      tagName: "button",
      // Oculto hasta que el script lo enlace: sin JS no copia nada
      properties: { type: "button", className: ["code-copy"], dataCopy: "", hidden: true, ariaLabel: "Copy code" },
      children: [{ type: "text", value: "copy" }],
    });

    root.children = [{
      type: "element",
      tagName: "div",
      properties: { className: ["code-block", "not-prose", ...(isOutput ? ["is-output"] : [])], dataHost: host },
      children: [{ type: "element", tagName: "div", properties: { className: ["code-head"] }, children: head }, pre],
    }];
  },
};
