import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {
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
    ignorePatterns: ["dist", "**/dist", "node_modules", "**/index.css"],
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
