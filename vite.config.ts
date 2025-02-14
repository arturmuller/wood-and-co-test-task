import vue2 from "@vitejs/plugin-vue2";
import { resolve } from "path";
import { Plugin, defineConfig } from "vite";

// Typings don't match implementation.
const vue = vue2 as () => Plugin;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    // Until we update Portal to a newer version of Nuxt, we must target an
    // old EcmaScript version as otherwise Webpack cannot parse the data.
    target: "es2015",
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      fileName: "index",
      formats: ["cjs"],
    },
    rollupOptions: {
      external: ["vue", "vue-i18n"],
    },
  },
});
