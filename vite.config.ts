import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      // cualquier petición a /elevacion será proxificada
      "/elevacion": {
        target: "https://api.opentopodata.org",
        changeOrigin: true,
        //   /elevacion?locations=... -> /v1/srtm90m?locations=...
        rewrite: (path) => path.replace(/^\/elevacion/, "/v1/srtm90m"),
      },
    },
  },
});
