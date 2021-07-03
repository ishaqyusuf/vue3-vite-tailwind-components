import { defineConfig, UserConfigExport } from "vite";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";

import ViteComponents from "vite-plugin-components";
import Icons from "vite-plugin-icons";
import { chromeExtension } from "vite-plugin-chrome-extension";
import Components from "vite-plugin-components";
import ViteIcons, { ViteIconsResolver } from "vite-plugin-icons";
import analyze from "rollup-plugin-analyzer";
export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [analyze()],
      input: "src/manifest.json",
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [
    chromeExtension(),
    vue(),
    ViteComponents({
      dirs: ["src/components/shared"],
      deep: true,
      // directoryAsNamespace: true,
      customComponentResolvers: ViteIconsResolver(),
    }),
    // Components({
    // }),
    ViteIcons(),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
  ],
  // ssgOptions: {
  //   script: "async",
  //   formatting: "minify",
  // },
});
