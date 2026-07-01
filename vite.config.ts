
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  server: {
    host: "::",
    port: 5173,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Down-level modern syntax (optional chaining `?.`, nullish `??`) so the
    // older Chromium bundled with react-snap's puppeteer can parse the bundle
    // during prerendering. es2019 is supported by all current browsers too.
    target: 'es2019',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
}));
