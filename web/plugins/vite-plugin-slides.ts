import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite-plus";
import { parseSlideEntry } from "../src/data/slideParser";

const VIRTUAL_ID = "virtual:slides";
const RESOLVED_ID = `\0${VIRTUAL_ID}`;
const SLIDES_DIR = path.resolve(import.meta.dirname, "../public/slides");

/**
 * public/slides/*.html を走査し、各HTMLの head メタから Slide 一覧を構築して
 * `export const slides = [...]` のモジュールソースを生成する。
 */
const buildSlidesModule = (): string => {
  const htmlFiles = fs.existsSync(SLIDES_DIR)
    ? fs.readdirSync(SLIDES_DIR).filter((file) => file.endsWith(".html"))
    : [];
  // ファイル名昇順で決定的な順序にする（走査順は環境依存のため）
  const entries = htmlFiles.toSorted().map((file) => {
    const id = file.slice(0, -".html".length);
    const html = fs.readFileSync(path.join(SLIDES_DIR, file), "utf-8");
    return parseSlideEntry(id, html);
  });
  return `export const slides = ${JSON.stringify(entries)};`;
};

/**
 * web/public/slides/*.html を置くだけで会社紹介資料の一覧に自動反映する。
 * `virtual:slides` として Slide[] を供給する。
 */
export function vitePluginSlides(): Plugin {
  return {
    name: "vite-plugin-slides",

    resolveId(id) {
      return VIRTUAL_ID === id ? RESOLVED_ID : undefined;
    },

    load(id) {
      return RESOLVED_ID === id ? buildSlidesModule() : undefined;
    },

    configureServer(server) {
      const invalidate = (changedPath: string) => {
        if (!changedPath.startsWith(SLIDES_DIR)) {
          return;
        }
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (mod) {
          server.moduleGraph.invalidateModule(mod);
        }
        server.ws.send({ type: "full-reload" });
      };

      server.watcher.add(path.join(SLIDES_DIR, "*.html"));
      server.watcher.on("add", invalidate);
      server.watcher.on("change", invalidate);
      server.watcher.on("unlink", invalidate);
    },
  };
}
