import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  commonjsOptions: {
    esmExternals: true,
 },
  define: {
    global: "globalThis",
    "process.env": {},
  },
  
});