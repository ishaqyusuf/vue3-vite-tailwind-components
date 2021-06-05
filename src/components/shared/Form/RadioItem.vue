<template>
  <RadioGroupOption :value="value" v-slot="{ active, checked }">
    <slot :active="active" :checked="checked"></slot>
  </RadioGroupOption>
</template>
<script lang="ts">
import { computed, toRef, h, ref } from "vue";
import { RadioGroupOption } from "@headlessui/vue";
export default {
  components: {
    RadioGroupOption,
  },
  props: {
    value: [String, Object, Number, Boolean],
  },
  setup(props, { emit }) {
    return {};

    // const loading = toRef(props, "loading");
    // const isLoading = computed(() => loading.value);

    // const button = h("span", [
    //   props.label,
    //   isLoading.value &&
    //     h("div", { class: "bg-red-500 text-white p-4" }, "isLoading"),
    // ]);
    // return () => button;
  },
};
</script>

<style scoped></style>
