<template>
  <App vintage pad-y>
    <DocPage ref="docs"></DocPage>
  </App>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import DocPage from "@/views/Admin/Components/Documents/DocPage.vue";
import useShipmentOverview from "./use-shipment-overview";
import useShipmentsApi from "@/use/api/use-shipments-api";
import user from "@/use/user";
export default {
  props: {
    slug: String,
  },
  components: {
    DocPage,
  },
  setup(props, { emit }) {
    const docs = ref();
    onMounted(() => {
      docs.value.init(
        props.slug,
        useShipmentsApi.get,
        user.can("updateShipment")
      );
    });
    return {
      docs,
    };
  },
};
</script>

<style scoped></style>
