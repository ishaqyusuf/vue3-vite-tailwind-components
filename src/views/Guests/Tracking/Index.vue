<template>
  <tracking-section sectional></tracking-section>
</template>

<script lang="ts">
import { ref } from "vue";
import TrackingSection from "@/views/Guests/Tracking/TrackingSection.vue";
export default {
  props: {},
  components: { TrackingSection },
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
