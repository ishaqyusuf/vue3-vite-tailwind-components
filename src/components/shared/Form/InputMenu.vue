<template>
  <div
    v-if="(items || menu) && data.inputFocus"
    class="absolute origin-bottom-left my-1 w-full bg-white text-gray-900 z-50"
  >
    <slot name="menu" v-bind="$props">
      <ul
        :class="[data.fadeList && 'opacity-0']"
        :style="data.listStyle"
        class="p-0 w-full overflow-y-auto max-h-56 rounded-b-lg shadow-xl border"
      >
        <!-- <template> -->
        <slot name="firstResult"></slot>
        <slot name="results" v-bind:items="data.results">
          <li
            v-for="(result, index) in data.results"
            :key="index"
            @click.prevent="data.selectItem(result)"
          >
            <slot name="resultItem" v-bind:item="result">
              <div
                :class="[data.selectedIndex == index && 'hover:bg-gray-400']"
                class="appearance-none border-b p-2 cursor-default hover:bg-gray-200"
              >
                <slot name="item" v-bind:item="result">
                  {{ data.displayValue(result, itemText, result) }}
                </slot>
              </div>
            </slot>
          </li>
        </slot>
        <slot name="lastResult"></slot>
        <!-- </template> -->
      </ul>
    </slot>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import input from "@/hooks/input";
export default {
  props: {
    ...input.props,
    data: { type: Object, required: true },
  },
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
