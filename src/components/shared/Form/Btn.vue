<template>
  <button :class="[styles]" @click="click" :disabled="isDisabled" :type="type">
    <div
      v-if="isLoading"
      :class="{
        'absolute left-0 inline-flex items-center justify-center top-0 bottom-0  right-0': true,
        'opacity-0': !isLoading,
        'text-gray-900': !primary,
        'text-white': primary,
      }"
    >
      <i-mdi-loading class="animate-spin" />
    </div>
    <div
      :class="{
        'inline-flex items-center justify-center w-full space-x-2': true,
        'opacity-0': isLoading,
        'px-4 h-9': !dense && !fab && !icon,
        'px-2': dense,
      }"
    >
      <slot></slot>
    </div>
  </button>
</template>

<script lang="ts">
import { ref, toRef, computed } from "vue";
import { btnMixins } from "@/mixins/btn";
export default {
  mixins: [btnMixins],
  setup(props, { emit }) {
    const nativeLoading = ref(false);
    const isLoading = computed(() => props.loading || nativeLoading.value); //(props, "loading");
    const {
      fab,
      tile,
      large,
      xLarge,
      small,
      color,
      secondary,
      tertiary,
      icon,
    } = props;
    const primary = !icon && !secondary && !tertiary;
    const isDisabled = computed(() => props.loading || props.disabled);
    const styles = computed(() => [
      isDisabled.value && "gray-scale",
      { "cursor-default": isLoading.value },
      { "border focus:ring-2 font-poppins shadow-lg": !tertiary && !icon },
      { "rounded-full w-9 h-9": fab },
      { "text-base focus:outline-none border-separate relative": true },
      { "rounded-lg": !tile },
      { "text-lg h-12": large },
      { "text-lg h-14": xLarge },
      { "text-sm h-7": small },
      primary && `bg-${color}-600 text-white hover:bg-${color}-700`,
      { "bg-white text-gray-700 hover:bg-gray-50": secondary },
    ]);
    const click = async () => {
      nativeLoading.value = true;
      if (props.action)
        emit("result", props.async ? await props.action() : props.action());
      nativeLoading.value = false;
    };
    return {
      click,
      isLoading,
      isDisabled,
      styles,
      primary,
    };
  },
};
</script>

<style scoped></style>
