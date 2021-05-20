<template>
  <!-- <TMenuItem v-slot="{ active }"> -->
  <button
    class="hover:bg-purple-500 hover:text-white text-gray-900"
    :class="['group flex rounded-md items-center w-full px-2 py-2 text-sm']"
  >
    <!-- <EditIcon
                  :active="active"
                  class="w-5 h-5 mr-2 text-violet-400"
                  aria-hidden="true"
                /> -->
    <slot />
  </button>
  <!-- </TMenuItem> -->
</template>

<script lang="ts">
import { ref } from "vue";
import { MenuItem } from "@headlessui/vue";
export default {
  components: {
    TMenuItem: MenuItem,
  },
  props: {},
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
