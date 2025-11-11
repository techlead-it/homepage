import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
	plugins: [tailwindcss(), react()],
	base: mode === "production" ? "/homepage/" : "/",
	build: {
		outDir: "dist",
	},
}));
