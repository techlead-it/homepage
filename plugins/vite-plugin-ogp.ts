import path from "node:path";
import type { Plugin } from "vite-plus";
import {
  generateAllOgpImages,
  generateOgpForArticle,
  OGP_NEWS_DIR,
} from "../scripts/ogp-generator";

export function vitePluginOgp(): Plugin {
  return {
    name: "vite-plugin-ogp",

    async buildStart() {
      await generateAllOgpImages();
    },

    configureServer(server) {
      server.watcher.add(path.join(OGP_NEWS_DIR, "*.md"));

      const onChange = async (changedPath: string) => {
        if (
          !changedPath.startsWith(OGP_NEWS_DIR) ||
          !changedPath.endsWith(".md")
        ) {
          return;
        }
        try {
          await generateOgpForArticle(changedPath);
        } catch (error) {
          console.error("[OGP] Error generating image:", error);
        }
      };

      server.watcher.on("change", onChange);
      server.watcher.on("add", onChange);
    },
  };
}
