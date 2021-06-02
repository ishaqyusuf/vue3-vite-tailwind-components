<template>
  <Container pilot
    ><ActivityComponent slim ref="activity"></ActivityComponent>
  </Container>
</template>

<script lang="ts">
import useShipmentsApi from "@/use/api/use-shipments-api";
import user from "@/use/user";
import { onMounted, ref } from "vue";
import useShipmentOverview from "./use-shipment-overview";
import ActivityComponent from "@/views/Guests/Track/ActivityComponent.vue";
export default {
  components: {
    ActivityComponent,
  },
  props: {},
  setup(props, { emit }) {
    const activity = ref();
    onMounted(() => {
      activity.value.init(
        useShipmentOverview.slug.value,
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
