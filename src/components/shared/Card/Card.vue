<template>
  <div
    class="font-poppins flex flex-col"
    :class="[
      !tile && 'rounded-lg',
      styles,
      {
        'text-white': dark,
        'py-4': pad,
      },
    ]"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed } from "@vue/runtime-core";

export default {
  props: {
    tile: Boolean,
    styleMobile: Boolean,
    dark: Boolean,
    pad: Boolean,
    pilot: Boolean,
  },
  setup(props, { emit }) {
    const pref = props.styleMobile ? "" : "sm:";
    const styles = props.pilot
      ? []
      : [
          [pref, "shadow-xl"],
          [pref, !props.dark ? "bg-white" : "bg-white"],
        ]
          .filter(Boolean)
          .map((f) => f.filter(Boolean).join(""))
          .join(" ");
    return {
      styles,
    };
  },
};
</script>

<style scoped></style>
