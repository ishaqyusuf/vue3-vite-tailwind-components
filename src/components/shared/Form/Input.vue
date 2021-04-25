<template>
  <input
    :placeholder="placeholder"
    v-model="value"
    :required="required"
    :pattern="pattern"
    :oninvalid="oninvalid"
    @focus="toggleFocus()"
    @blur="toggleFocus(false)"
    ref="input"
    :class="[dense ? 'py-1' : 'py-2']"
    class="rounded-lg px-4 border-2 border-gray-300 focus:border-purple-700 focus:ring-2 focus:outline-none"
  />
  <div
    v-if="focused"
    style="min-width: 200px"
    class="origin-top-right rounded-lg shadow-lg absolute mt-2 bg-white"
  >
    <div
      class="p-2 border-b hover:bg-purple-700 hover:text-white"
      v-for="item in searchItems"
      :key="item"
    >
      Item {{ item }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { inputMixins } from "@/mixins/input";
export default defineComponent({
  mixins: [inputMixins],
  props: {},
  data() {
    return {
      focused: false,
      items: [1, 2, 3],
    };
  },
  computed: {
    searchItems() {
      return this.items;
    },
    inputWidth() {
      return this.$refs.input?.clientWidth;
    },
    isLoading() {
      return this.loader?.value || this.loading;
    },
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    toggleFocus(focus = true) {
      this.focused = focus;
    },
  },
  setup() {
    return {};
  },
  mounted() {},
});
</script>

<style scoped></style>
