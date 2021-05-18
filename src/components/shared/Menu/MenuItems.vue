<template>
  <div>
    <!-- <template v-slot:items>
      <slot />
    </template> -->
  </div>
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
