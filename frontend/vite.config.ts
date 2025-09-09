import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Vite config for the Resume‑Scorecard frontend.
 * The default root is the folder containing this file (frontend/),
 * so the index.html we created above is automatically used.
 */
export default defineConfig({
  plugins: [react()],
  // Optional: if you want to serve on a custom port
  // server: { port: 5173 },
});