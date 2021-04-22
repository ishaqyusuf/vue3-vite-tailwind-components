<template>
  <div class="">
    <CardTitle v-if="title">{{ title }}</CardTitle>
    <CardSubtitle v-if="subtitle">{{ subtitle }}</CardSubtitle>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    title: {},
    subtitle: {},
  },
};
</script>

<style scoped></style>
