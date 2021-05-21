<template>
  <button
    :name="name"
    :class="[styles]"
    @click="click"
    :disabled="isDisabled"
    type="button"
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
        'inline-flex items-center justify-center w-full space-x-2': true,
        'opacity-0': isLoading,
        'px-4 py-2': !dense && !fab && !icon && !text,
        'px-2': dense,
        'text-sm': !xLarge && !large,
      }"
    >
      <slot></slot>
    </div>
  </button>
  <Prompt
    v-model="confirmAction"
    title="Are you sure you want to delete"
    action
    :info="promptInfo"
    @ok="click"
    ok="Yes"
    cancel="No"
  />
</template>

<script lang="ts">
import { ref, toRef, computed } from "vue";
import time from "@/hooks/time";
import PagerInterface from "@/@types/PagerInterface";
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
    promptInfo: String,
    color: { default: "blue" },
    textColor: { default: "gray" },
    type: {
      default: "button",
      validator: (value) => {
        return ["button", "submit", "reset", undefined].includes(value);
      },
    },
    name: String,
    id: String,
    confirm: Boolean,
    autoIgnore: Boolean,
    dark: Boolean,
    contrast: { type: Number, default: 600 },

    text: Boolean,
  },
  setup(props, { emit }) {
    const nativeLoading = ref(false);
    const isLoading = computed(() => nativeLoading.value); //(props, "loading");
    const {
      fab,
      confirm,
      tile,
      large,
      xLarge,
      small,
      color,
      secondary,
      tertiary,
      icon,
      contrast,
      autoIgnore,
      dark,
      text,
      rounded,
      textColor,
    } = props;
    const primary = !icon && !secondary && !tertiary && !text;
    const isDisabled = computed(
      () => props.loading || nativeLoading.value || props.disabled
    );
    const _color = computed(() =>
      color.includes("-") ? color : [color, contrast].join("-")
    );
    const _tcolor = computed(() =>
      color.includes("-") ? textColor : [textColor, contrast].join("-")
    );
    const styles = computed(() => [
      isDisabled.value && "gray-scale",
      { "cursor-default": isLoading.value },
      {
        "border focus:ring-2 font-poppins shadow-lg":
          !tertiary && !text && !icon,
      },
      icon && `text-${color == "blue" ? _tcolor.value : _color.value}`,
      { "border-black-800": dark },
      { "w-9 h-9": fab },
      { "rounded-full": rounded || fab },
      { "text-base focus:outline-none border-separate relative": true },
      { "rounded-lg": !tile },
      { "text-lg h-12": large },
      { "text-xl h-14": xLarge },
      { "text-sm h-7": small },
      primary && `bg-${_color.value} text-white`,
      { "hover:bg-opacity-80": icon || primary || secondary },
      { "bg-white text-gray-700": secondary },
    ]);
    const confirmAction = ref(false);
    const click = async () => {
      if (confirm && !confirmAction.value) {
        confirmAction.value = true;
        autoIgnore &&
          time.delay(3000).then((d) => {
            confirmAction.value = false;
          });
        return;
      }
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
      } else emit("click");
    };
    return {
      click,
      isLoading,
      confirmAction,
      nativeLoading,
      isDisabled,
      styles,
      primary,
    };
  },
};
</script>

<style scoped></style>
