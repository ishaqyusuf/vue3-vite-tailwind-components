<template>
  <TransitionRoot
    :as="as"
    show
    :enter="enter"
    :enter-from="enterFrom"
    :enter-to="enterTo"
    :leave="leave"
    :leave-from="leaveFrom"
    :leave-to="leaveTo"
  >
    <slot></slot>
  </TransitionRoot>
</template>

<script lang="ts">
import { ref } from "vue";
import { TransitionRoot } from "@headlessui/vue";
import { useModelWrapper } from "@/use/modelWrapper";
export default {
  children: {
    TransitionRoot,
  },
  props: {
    as: { default: "div" },
    enter: { default: "tranform transition duration-75 ease-out" },
    enterFrom: { default: "scale-95 opacity-0" },
    enterTo: { default: "scale-100 opacity-100" },
    leave: { default: "transform transition duration-75 ease-in" },
    leaveFrom: { default: "scale-100 opacity-100" },
    leaveTo: { default: "scale-95 opacity-0" },
    modelValue: { default: true, type: Boolean },
  },
  setup(props, { emit }) {
    const isOpen = useModelWrapper(props, emit);
    return {
      isOpen,
    };
  },
};
</script>

<style scoped></style>
