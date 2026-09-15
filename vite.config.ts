import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// If deploying to GitHub Pages at https://USERNAME.github.io/REPO/,
// set base to "/REPO/". For a user/organization page
// (https://USERNAME.github.io) or a custom domain, use "/".
// You can also set it via the BASE_PATH env var in CI.
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
