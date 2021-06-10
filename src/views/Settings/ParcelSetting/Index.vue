<template>
  <DefaultParcelStatus></DefaultParcelStatus>
  <DefaultParcel></DefaultParcel>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import DefaultParcelStatus from "./DefaultParcelStatus.vue";
import DefaultParcel from "./DefaultParcel.vue";
export default {
  components: {
    DefaultParcelStatus,
    DefaultParcel,
  },
  props: {},
  setup(props, { emit }) {
    onMounted(async () => {});
    return {};
  },
};
</script>

<style scoped></style>
