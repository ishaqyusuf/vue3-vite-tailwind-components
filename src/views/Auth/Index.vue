<template>
  <div class="h-screen mx-auto sm:flex items-center justify-center">
    <div
      class="max-w-xs flex flex-col justify-center w-full sm:max-w-lg mx-auto space-y-6"
    >
      <Logo dark />
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {},
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
