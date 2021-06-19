<template>
  <div class="">
    <tracking-section sectional></tracking-section>
    <shipping-calculator-form></shipping-calculator-form>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import TrackingSection from "@/views/Guests/Tracking/TrackingSection.vue";
import ShippingCalculatorForm from "@/views/Guests/ShippingCalculatorForm.vue";
export default {
  props: {},
  components: { TrackingSection, ShippingCalculatorForm },
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
