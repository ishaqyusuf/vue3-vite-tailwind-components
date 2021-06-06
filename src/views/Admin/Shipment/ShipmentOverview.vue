<template>
  <App fs class="py-10">
    <ShipmentForm grid ref="form"></ShipmentForm>
  </App>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import useShipmentOverview from "./use-shipment-overview";
import ShipmentForm from "@/views/Admin/Shipment/Components/ShipmentForm.vue";
import router from "@/router";

export default {
  props: {},
  components: {
    ShipmentForm,
  },
  setup(props, { emit }) {
    const form = ref();
    onMounted(() => {
      var slug = useShipmentOverview.slug.value;
      form.value.editShipment(slug).then((result) => {
        if (result && result.slug != slug) {
          router.push({
            name: "shipment",
            params: { slug },
          });
        } else {
          // useShipmentOverview.refresh(result);
        }
        console.log(result);
      });
    });
    return {
      form,
    };
  },
};
</script>

<style scoped></style>
