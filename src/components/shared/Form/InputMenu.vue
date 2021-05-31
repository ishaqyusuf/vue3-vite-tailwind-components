<template>
  <transition
    enter-active-class="transition transform duration-100 ease-out"
    enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100 opacity-100"
    leave-active-class="transition duration-75 ease-in"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0"
    class="origin-bottom-left w-full z-50 mt-1 absolute rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
  >
    <!-- @keydown.up="up"
      @keydown.down="down" -->
    <ul ref="root" class="overflow-y-auto py-1 max-h-56">
      <SimpleMenuItem
        @click.prevent="select(item)"
        v-for="(item, index) in results"
        :key="index"
        :active="index == state.index"
        @mouseenter="state.index = index"
      >
        <Truncify class="text-left">
          {{ getObjectValue(item, itemText, item) }}
        </Truncify>
      </SimpleMenuItem>
    </ul>
  </transition>
</template>

<script lang="ts">
import input from "@/hooks/input";
import { ref, onMounted, onUnmounted } from "vue";
import ClickOutside from "vue-click-outside";
import time from "@/hooks/time";
export default {
  props: {
    ...input.props,
    results: { type: Array, required: true },
    state: { type: Object, required: true },
  },
  directives: { ClickOutside },
  setup(props, { emit }) {
    const root = ref();
    onMounted(async function () {
      await time.delay(200);
      document.addEventListener("click", outsideClickListener);
      // root.value?.focus();
    });
    onUnmounted(() => {
      removeClickListener();
    });
    const outsideClickListener = (event) => {
      const element = root.value;
      !element?.contains(event.target) &&
        isVisible(element) &&
        (props.state.listOpened = false);
    };
    const removeClickListener = () => {
      document.removeEventListener("click", outsideClickListener);
    };
    const isVisible = (elem) =>
      !!elem &&
      !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length); // source (2018-03-11): https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js

    return {
      root,
      select(item) {
        emit("selected", item);
        props.state.listOpened = false;
      },
      getObjectValue(item, key, defaultValue: any = null) {
        return typeof item === "object" && key && item
          ? item[key]
          : defaultValue;
      },
    };
  },
};
</script>

<style scoped></style>
