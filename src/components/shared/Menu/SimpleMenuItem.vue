<template>
  <!-- <TMenuItem v-slot="{ active }"> -->
  <button
    ref="btn"
    class="focus:outline-none flex rounded-md items-center w-full px-2 py-2 text-sm"
    :class="{
      'text-gray-900': !active && !focused && !disabled,
      'text-gray-400': disabled,
      'bg-purple-500 text-white': (active || focused) && !disabled,
    }"
    @mouseenter="focused = true"
    @mouseleave="focused = false"
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
import { ref, watch } from "vue";
import { MenuItem } from "@headlessui/vue";
export default {
  components: {
    TMenuItem: MenuItem,
  },
  props: {
    active: Boolean,
    disabled: Boolean,
  },
  setup(props, { emit }) {
    const focused = ref(false);
    const btn = ref<HTMLElement>();
    watch(props, (value, old) => {
      // props.active ? btn.value?.focus() : btn.value?.blur();
    });
    return {
      focused,
      btn,
    };
  },
};
</script>

<style scoped></style>
