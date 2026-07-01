import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";
import { vitePluginOgp } from "./plugins/vite-plugin-ogp";
import { vitePluginSlides } from "./plugins/vite-plugin-slides";

// https://vite.dev/config/
export default defineConfig(() => ({
  plugins: [tailwindcss(), react(), vitePluginOgp(), vitePluginSlides()],
  build: {
    outDir: "dist",
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test-setup.ts"],
  },
}));
