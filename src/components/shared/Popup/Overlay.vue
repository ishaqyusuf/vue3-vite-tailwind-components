<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div
    v-if="!side"
    class="z-10 inset-0"
    :class="{ absolute: absolute, fixed: !absolute }"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-end justify-center text-center sm:block sm:p-0 h-full"
      :class="[bClass, { 'min-h-screen': screen }]"
    >
      <!-- pt-4 px-4 -->
      <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
      <div
        :class="{ absolute: absolute, fixed: !absolute }"
        @click="onOutClick"
        class="inset-0 bg-gray-800 bg-opacity-40 transition-opacity"
        aria-hidden="true"
      ></div>
      <span
        class="hidden sm:inline-block sm:align-middle"
        :class="{ 'sm:h-screen': screen }"
        aria-hidden="true"
        >&#8203;</span
      >

      <!--
      Modal panel, show/hide based on modal state.
      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->

      <!-- v-click-outside="onOutClick" -->
      <transition
        name="custom-classes-transition"
        enter-active-class="animated tada"
        leave-active-class="animated bounceOutRight"
      >
        <div
          :class="[
            'inline-block align-bottom text-left overflow-hidden shadow-xl transform transition-all sm:align-middle w-full',
            pClass,
          ]"
        >
          <!-- bg-white -->
          <slot></slot>
        </div>
      </transition>
    </div>
  </div>
  <ui-side-overlay v-else v-bind:props="$props"></ui-side-overlay>
</template>

<script lang="ts">
import Vue from "vue";
import { useModelWrapper } from "@use/modelWrapper";
export default {
  props: {
    side: Boolean,
    closable: Boolean,
    absolute: Boolean,
    screen: Boolean,
    bClass: {},
    pClass: {},
    modelValue: { type: [Boolean, Object, Function] },
    persistent: Boolean,
  },
  setup(props, { emit }) {
    return {
      open: useModelWrapper(props, emit, "update:modelValue"),
    };
  },
};
</script>

<style scoped></style>
