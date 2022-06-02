import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "./../backend/views",
  },
  plugins: [vue(), svgLoader()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/styles/abstracts"; 
          @import "./src/styles/utils"; 
        `,
      },
    },
  },
});
