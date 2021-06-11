<template>
  <DefaultStatus
    title="Shipment Status"
    subtitle="Set default shipment status list"
    :type="MetaDataType.SHIPMENT_STATUS"
  ></DefaultStatus>
</template>

<script lang="ts">
import { MetaDataType } from "@/use/api/use-meta-data-api";
import { ref } from "vue";
import DefaultStatus from "../Components/DefaultStatus.vue";

export default {
  props: {},
  setup(props, { emit }) {
    return {
      MetaDataType,
    };
  },
  components: { DefaultStatus },
};
</script>

<style scoped></style>
