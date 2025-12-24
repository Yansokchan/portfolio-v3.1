import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/ollama": {
        target: "https://kaitlynn-nonreducing-stoloniferously.ngrok-free.dev",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ollama/, ""),
        headers: {
          "ngrok-skip-browser-warning": "true",
          "User-Agent": "PostmanRuntime/7.26.8", // Mimic a tool
        },
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
