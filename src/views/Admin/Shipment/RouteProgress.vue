<template>
  <App vintage pad-y
    ><ActivityComponent slim ref="activity"></ActivityComponent>
  </App>
</template>

<script lang="ts">
import useShipmentsApi from "@/use/api/use-shipments-api";
import user from "@/use/user-account";
import { onMounted, ref } from "vue";
import ActivityComponent from "@/views/Guests/Track/ActivityComponent.vue";
export default {
  components: {
    ActivityComponent,
  },
  props: {
    slug: String,
  },
  setup(props, { emit }) {
    const activity = ref();
    onMounted(() => {
      activity.value.init(
        props.slug,
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
