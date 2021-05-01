<template>
  <div
    class="fixed w-full flex flex-col space-y-1 sm:right-0 sm:w-1/2 lg:w-1/3 xl:w-1/4 z-50"
  >
    <Alert :data="alert" v-for="(alert, index) in alerts" :key="index" />
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import alertHook from "@/hooks/alert";
export default {
  props: {},
  setup(props, { emit }) {
    return {
      alerts: alertHook.alerts,
    };
  },
};
</script>

<style scoped></style>
