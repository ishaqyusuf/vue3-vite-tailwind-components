<template>
  <div class="relative">
    <div
      :class="{
        'absolute w-full h-full bg-gradient-to-b opacity-40 from-gray-400 via-red-500 to-gray-500': !noGradient,
      }"
    ></div>
    <img :src="imgSrc" class="" />
  </div>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import cloudinary from "@/hooks/cloudinary";
export default {
  props: {
    noGradient: Boolean,
    gradient: String,
    src: String,
  },
  setup(props, { emit }) {
    const imgSrc = computed(() => cloudinary.getUrl(props.src));
    return {
      imgSrc,
    };
  },
};
</script>

<style scoped></style>
