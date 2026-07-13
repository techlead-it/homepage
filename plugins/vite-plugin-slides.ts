import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite-plus";
import { parseSlideEntry } from "../src/front/data/slideParser";
import { patchSlideBundler } from "./slideBundlerPatch";

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
 *
 * さらに、Claude Design が生成した Bundler HTML を配信/ビルド時に patch し、
 * Cloudflare Bot Fight Mode の inject などによる展開後の外部エラーが Bundler の
 * error handler で赤バナー化されないようにする。
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

      // /slides/*.html は Vite の public assets middleware より前で intercept し
      // patch 済み HTML を返す。
      server.middlewares.use("/slides/", (req, res, next) => {
        const url = req.url ?? "";
        if (!url.endsWith(".html")) {
          next();
          return;
        }
        const filename = path.basename(url.split("?")[0]);
        const filepath = path.join(SLIDES_DIR, filename);
        fs.readFile(filepath, "utf-8", (err, html) => {
          if (err) {
            next();
            return;
          }
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.end(patchSlideBundler(html));
        });
      });
    },

    async writeBundle(options) {
      if (!options.dir) return;
      const slidesDist = path.resolve(options.dir, "slides");
      if (!fs.existsSync(slidesDist)) return;
      const files = fs
        .readdirSync(slidesDist)
        .filter((file) => file.endsWith(".html"));
      for (const file of files) {
        const filepath = path.join(slidesDist, file);
        const html = fs.readFileSync(filepath, "utf-8");
        const patched = patchSlideBundler(html);
        if (patched !== html) {
          fs.writeFileSync(filepath, patched);
        }
      }
    },
  };
}
