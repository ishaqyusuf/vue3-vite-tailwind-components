<template>
  <DopeCard
    title="Default Address"
    subtitle="Setup addresses and default address to be used for different operations"
  >
  </DopeCard>
</template>

<script lang="ts">
import { ref } from "vue";
import DopeCard from "@/views/Settings/DopeCard.vue";
export default {
  props: {},
  components: {
    DopeCard,
  },
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
