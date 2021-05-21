<template>
  <div class="relative">
    <input
      @input="typing"
      @focus="inputFocus"
      @blur="inputBlur"
      v-model="valued"
      class="p-2"
    />
    <InputMenu v-if="focused && results" :results="results"></InputMenu>
  </div>
</template>

<script lang="ts">
import { reactive, ref, onMounted, toRefs, watch } from "vue";
import input from "@/hooks/input";
import { useModelWrapper } from "@/use/modelWrapper";
export default {
  props: {
    ...input.props,
  },
  setup(props, { emit }) {
    const valued = useModelWrapper(props, emit);
    function inputBlur() {
      state.isTyping = state.focused = false;
    }
    function inputFocus() {
      state.focused = true;
    }
    const data = reactive({
      inputBlur,
      inputFocus,
      results: [],
    });
    const state = reactive({
      isTyping: false,
      focused: false,
    });
    function typing() {
      state.isTyping = true;
    }
    function initResults() {
      data.results = props.items?.filter(
        (item) => !state.isTyping || item.startsWith(valued.value)
      );
    }

    onMounted(() => {
      initResults();
    });
    watch([valued, props.items, state], async (value, old) => {
      initResults();
    });

    return {
      valued,
      ...toRefs(data),
      ...toRefs(state),

      typing,
    };
  },
};
</script>

<style scoped></style>
