<template>
  <Input select tile :items="items" v-model="input1"></Input>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {},
  setup(props, { emit }) {
    const input1 = ref();
    return {
      input1,
      items: ["Item 1", "Item 2", "Item 3"],
    };
  },
};
</script>

<style scoped></style>
