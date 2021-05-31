<template>
  <Container class="space-y-4">
    <CardTitle>Shipments</CardTitle>
    <StandardTable
      checkable
      action
      hide-actions
      dense
      deletable
      :structure=""
    ></StandardTable>
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
