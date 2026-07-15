import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";
import { vitePluginOgp } from "./plugins/vite-plugin-ogp";

export default defineConfig({
  // VITEST 実行時は jsdom environment と Workers environment が競合するため cloudflare() を無効化
  plugins: [
    tailwindcss(),
    react(),
    vitePluginOgp(),
    !process.env.VITEST && cloudflare(),
  ],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/front/test-setup.ts"],
    exclude: ["**/node_modules/**", "**/dist/**"],
  },
  fmt: {
    // 他リポジトリからのコピーで元ファイルを変更しない方針のため対象外
    ignorePatterns: ["public/slides/**"],
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: false,
    trailingComma: "es5",
    bracketSpacing: true,
  },
  lint: {
    plugins: ["typescript", "unicorn", "oxc"],
    categories: {
      correctness: "error",
      suspicious: "warn",
    },
    rules: {
      "no-console": "warn",
      "sort-imports": "off",
      "sort-keys": "off",
      "no-magic-numbers": "off",
      "no-ternary": "off",
      "func-style": "off",
      yoda: "off",
      "unicorn/filename-case": "off",
      "import/no-namespace": "off",
      "import/group-exports": "off",
      "import/exports-last": "off",
    },
    ignorePatterns: [
      "dist",
      "**/dist",
      "node_modules",
      "**/index.css",
      ".wrangler",
      "worker-configuration.d.ts",
    ],
    overrides: [
      {
        files: ["**/*.test.ts", "**/*.spec.ts"],
        rules: {
          "typescript/no-explicit-any": "off",
        },
      },
    ],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
});
