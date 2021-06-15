<template>
  <Menu rtl>
    <div class="text-base text-gray-700">
      <i-mdi-bell-outline />
    </div>
    <template v-slot:items>
      <div
        class="p-4 inline-flex h-56 flex-col items-center w-full justify-center"
      >
        <span>No Notification</span>
      </div>
    </template>
  </Menu>
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
