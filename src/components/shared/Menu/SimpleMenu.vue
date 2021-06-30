<template>
  <span class="relative" v-click-outside="clickOutside">
    <span
      @mouseenter="mouseEnter"
      class="cursor-pointer"
      @mouseleave="mouseLeave"
      @click="click"
    >
      <slot></slot>
      <!-- <slot name="activator" v-bind:on="on" v-bind:attrs="$attrs"></slot> -->
    </span>
    <transition
      enter-active-class="transition transform duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        @click="menuClick"
        ref="menu"
        v-if="on"
        @mouseenter="menuMouseEnter"
        @mouseleave="menuMouseLeave"
        :class="[
          !noWidth && width,
          on
            ? 'transition ease-out duration-200 opacity-100 translate-y-0'
            : '',
        ]"
        class="origin-top-right absolute right-0 z-10 mt-1 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="">
          <slot name="items"></slot>
        </div>
      </div>
    </transition>
  </span>
</template>

<script lang="ts">
import { ref } from "vue";

import ClickOutside from "vue-click-outside";
import time from "@/hooks/time";
export default {
  props: {
    value: { type: Boolean, default: false },
    openOnHover: Boolean,
    persistent: Boolean,
    plain: Boolean,
    noWidth: Boolean,
    closeOnClick: { type: Boolean, default: true },
    closeOnContentClick: Boolean,
    width: { default: "w-48" },
  },
  directives: { ClickOutside },
  setup(props, { emit }) {
    const on = ref(false);
    const listen = ref(false);
    const menuHover = ref(false);
    const click = () => {
      if (!props.openOnHover) {
        on.value = !on.value;
      }
    };
    const mouseLeave = () => {
      time.delay(200).then((d) => {
        if (!props.persistent && props.openOnHover && !menuHover.value)
          on.value = false;
      });
    };
    return {
      on,
      listen,
      menuHover,
      mouseEnter() {
        if (props.openOnHover) {
          on.value = true;
        }
      },
      mouseLeave,
      click,
      clickOutside() {
        if (on.value) click();
      },
      menuMouseEnter() {
        menuHover.value = true;
      },
      menuClick() {
        if (props.closeOnClick) {
          on.value = false;
        }
      },
      menuMouseLeave() {
        menuHover.value = false;
        mouseLeave();
      },
    };
  },
};
</script>

<style scoped></style>
