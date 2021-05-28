<template>
  <Container>
    <DatePicker />
  </Container>
</template>

<script lang="ts">
import { reactive, ref } from "vue";

export default {
  props: {},
  setup(props, { emit }) {
    const form = reactive({});
    return {
      ...form,
    };
  },
};
</script>

<style scoped></style>
