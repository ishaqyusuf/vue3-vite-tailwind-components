<template>
  <Container> </Container>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {
    slug: String,
  },
  setup(props, { emit }) {
    console.log(props.slug);
    return {};
  },
};
</script>

<style scoped></style>
