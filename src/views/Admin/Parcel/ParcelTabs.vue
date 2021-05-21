<template>
  <Card class="inline-flex space-x-2 items-start px-4">
    <div class="flex space-x-2">
      <Link
        :to="{ query: { tab: 'tracking' } }"
        class="border-b-4 py-1 inline-flex space-x-2 items-center px-2 border-purple-500"
      >
        <i-mdi-map-marker-outline />
        <span>Tracking</span></Link
      >
      <Link
        :to="{ query: { tab: 'tracking' } }"
        class="border-b-4 py-1 px-2 border-transparent hover:border-purple-500"
        >Documents</Link
      >
    </div>
  </Card>
</template>

<script lang="ts">
import { ref } from "vue";
import useParcel from "@/use/parcels/parcel";
export default {
  props: {},
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
