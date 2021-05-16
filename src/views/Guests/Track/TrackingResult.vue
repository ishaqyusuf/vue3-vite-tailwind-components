<template>
  <div class="bg-white">
    <div class="sm:max-w-6xl lg:max-w-5xl mx-auto p-4 py-6 sm:py-10 space-y-6">
      <div v-if="isLoading" class="flex justify-center items-center">
        <Spinner />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import trackerHook from "@/hooks/tracker";

export default {
  props: {},
  setup(props, { emit }) {
    return {
      ...trackerHook,
    };
  },
};
</script>

<style scoped></style>
