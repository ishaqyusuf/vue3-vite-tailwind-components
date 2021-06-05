<template>
  <App pad-y>
    <ShipmentForm grid ref="form"></ShipmentForm>
  </App>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import useShipmentOverview from "./use-shipment-overview";
import ShipmentForm from "@/views/Admin/Shipment/Components/ShipmentForm.vue";

export default {
  props: {},
  components: {
    ShipmentForm,
  },
  setup(props, { emit }) {
    const form = ref();
    onMounted(() => {
      console.log("mounted");
      form.value
        .editShipment(useShipmentOverview.shipment)
        .then((result) => {});
    });
    return {
      form,
    };
  },
};
</script>

<style scoped></style>
