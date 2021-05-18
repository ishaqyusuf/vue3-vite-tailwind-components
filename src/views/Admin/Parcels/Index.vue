<template>
  <Container class="">
    <div class="flex">
      <Menu>
        <Avatar></Avatar>
        <template v-slot:items> <MenuItem>Hello</MenuItem></template>
      </Menu>
    </div>
  </Container>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {},
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
