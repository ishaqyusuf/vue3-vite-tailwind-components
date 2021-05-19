<template>
  <button
    :name="name"
    :class="[styles]"
    @click="click"
    :disabled="isDisabled"
    :type="type"
  >
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
        'inline-flex items-center justify-center w-full py-2 space-x-2': true,
        'opacity-0': isLoading,
        'px-4': !dense && !fab && !icon && !text,
        'px-2': dense,
        'text-sm': !xLarge && !large,
      }"
    >
      <slot></slot>
    </div>
  </button>
</template>

<script lang="ts">
import { ref, toRef, computed } from "vue";
export default {
  // mixins: [btnMixins],
  props: {
    tile: Boolean,
    fab: Boolean,
    icon: { type: [Boolean] },
    dense: Boolean,
    secondary: Boolean,
    tertiary: Boolean,
    xLarge: Boolean,
    large: Boolean,
    xSmall: [Boolean, Object],
    rounded: Boolean,
    small: Boolean,
    disabled: {},
    to: {},
    loading: [Boolean, Object],
    action: Function,
    async: Boolean,
    prependIcon: {},
    appendIcon: {},
    color: { default: "blue" },
    textColor: { default: "gray" },
    type: { default: "button" },
    name: String,
    id: String,
    dark: Boolean,
    contrast: { type: Number, default: 600 },

    text: Boolean,
  },
  setup(props, { emit }) {
    const nativeLoading = ref(false);
    const isLoading = computed(() => nativeLoading.value); //(props, "loading");
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
      contrast,
      dark,
      text,
      rounded,
    } = props;
    const primary = !icon && !secondary && !tertiary && !text;
    const isDisabled = computed(
      () => props.loading || nativeLoading.value || props.disabled
    );
    const _color = computed(() =>
      color.includes("-") ? color : [color, contrast].join("-")
    );
    const styles = computed(() => [
      isDisabled.value && "gray-scale",
      { "cursor-default": isLoading.value },
      {
        "border focus:ring-2 font-poppins shadow-lg":
          !tertiary && !text && !icon,
      },
      { "border-black-800": dark },
      { "w-9 h-9": fab },
      { "rounded-full": rounded || fab },
      { "text-base focus:outline-none border-separate relative": true },
      { "rounded-lg": !tile },
      { "text-lg h-12": large },
      { "text-lg h-14": xLarge },
      { "text-sm h-7": small },
      primary && `bg-${_color.value} text-white hover:bg-opacity-80`,
      { "bg-white text-gray-700 hover:bg-opacity-80": secondary },
    ]);
    const click = async () => {
      if (props.action) {
        nativeLoading.value = true;
        if (props.async) {
          props.action().then((r) => {
            nativeLoading.value = false;
          });
        } else {
          emit("result", props.await ? await props.action() : props.action());
          nativeLoading.value = false;
        }
      }
    };
    return {
      click,
      isLoading,
      nativeLoading,
      isDisabled,
      styles,
      primary,
    };
  },
};
</script>

<style scoped></style>
