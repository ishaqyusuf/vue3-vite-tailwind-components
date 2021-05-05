<template>
  <router-link to="/" :class="imgSize">
    <img class="h-full" v-if="src" :src="src" />
  </router-link>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import cloudinary from "@/hooks/cloudinary";
import _default from "@fingerprintjs/fingerprintjs";
export default {
  props: {
    md: Boolean,
    xl: Boolean,
    lg: Boolean,
    dark: Boolean,
    sm: Boolean,
  },
  setup(props, { emit }) {
    const { sm, md, lg, xl } = props;
    const _sm = [16, 8];
    const size =
      [sm && _sm, md && [24, 12], lg && [32, 16], xl && [48, 24]].filter(
        Boolean
      )[0] ?? _sm;
    const imgSize = size
      .map((s, i) => (i == 0 ? "w-" : "h-") + `${s}`)
      .join(" ");
    const src = computed(() =>
      [
        cloudinary.url,
        props.dark ? cloudinary.dark_logo : cloudinary.light_logo,
      ].join("")
    );
    return { src, imgSize };
  },
};
</script>

<style scoped></style>
