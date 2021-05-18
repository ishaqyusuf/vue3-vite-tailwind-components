<template>
  <img
    class="inline-block rounded-full ring-2 ring-white"
    :class="{
      'h-6 w-6': sm,
      'h-8 w-8': !sm && !md && !lg && !xl,
      'h-10 w-10': md,
      'h-16 w-16': lg,
      'h-24 w-24': xl,
    }"
    :src="source"
    alt=""
  />
</template>

<script lang="ts">
import { computed, ref } from "vue";
import cloudinary from "@/hooks/cloudinary";
export default {
  props: {
    sm: Boolean,
    md: Boolean,
    lg: Boolean,
    xl: Boolean,
    src: String,
  },
  setup(props, { emit }) {
    return {
      source: computed(() => props.src ?? cloudinary.getUrl("avatar.png")),
    };
  },
};
</script>

<style scoped></style>
