<template>
  <ActivityComponent ref="activity"></ActivityComponent>
</template>

<script lang="ts">
import useShipmentsApi from "@/use/api/use-shipments-api";
import user from "@/use/user";
import { onMounted, ref } from "vue";
import useShipmentOverview from "./use-shipment-overview";
export default {
  props: {},
  setup(props, { emit }) {
    const activity = ref();
    onMounted(() => {
      activity.value.init(
        useShipmentOverview.slug,
        useShipmentsApi.get,
        user.can("updateShipment")
      );
    });
    return {
      activity,
    };
  },
};
</script>

<style scoped></style>
