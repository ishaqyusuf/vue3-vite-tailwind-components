<template>
  <div
    class="
      fixed
      top-0
      z-10
      bg-gray-800 bg-opacity-70
      text-white
      shadow-xl
      w-full
      h-10
    "
  >
    <div class="mx-auto max-w-7xl flex justify-between">
      <span>0 <carbon-shopping-cart /></span>
    </div>
  </div>
</template>

<script lang="ts">
import useCore from "@/hooks/use-core";
import { onMounted, ref } from "vue";

export default {
  props: {},
  setup(props, { emit }) {
    onMounted(() => {
      useCore.website.value.initialize();
    });
    return {
      ...useCore,
    };
  },
};
</script>

<style scoped></style>
