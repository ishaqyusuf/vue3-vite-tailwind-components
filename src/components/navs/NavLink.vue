<template>
  <Link :to="item.to" v-if="item.permission">{{ item.title }}</Link>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {
    item: {},
  },
  setup(props, { emit }) {
    return {
      //   item: props.item,
    };
  },
};
</script>

<style scoped></style>
