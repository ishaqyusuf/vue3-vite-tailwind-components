import { defineConfig, UserConfigExport } from "vite";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";

import ViteComponents from "vite-plugin-components";
import Icons from "vite-plugin-icons";

import Components from "vite-plugin-components";
import ViteIcons, { ViteIconsResolver } from "vite-plugin-icons";
import analyze from "rollup-plugin-analyzer";
export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [analyze()],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@components": resolve(__dirname, "src/components"),
      "@views": resolve(__dirname, "src/views"),
      "@services": resolve(__dirname, "src/core/services"),
      "@use": resolve(__dirname, "src/use"),
      "@utils": resolve(__dirname, "src/utils"),
      "@locales": resolve(__dirname, "src/locales"),
      "@mixins": resolve(__dirname, "src/mixins"),
      "@core": resolve(__dirname, "src/core"),
      "@assets": resolve(__dirname, "src/assets"),
    },
  },
  plugins: [
    vue(),
    ViteComponents({
      // dirs: ["src/components/shared"],
      // deep: true,
      directoryAsNamespace: true,
    }),
    Components({
      customComponentResolvers: ViteIconsResolver(),
    }),
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
