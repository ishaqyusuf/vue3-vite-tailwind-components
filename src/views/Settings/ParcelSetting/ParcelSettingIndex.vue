<template>
  <DefaultStatus
    title="Parcel Status"
    subtitle="Set default parcel status list"
    :type="MetaDataType.PARCEL_STATUS"
  ></DefaultStatus>
  <!-- <DefaultParcel></DefaultParcel> -->
</template>

<script lang="ts">
import { MetaDataType } from "@/use/api/use-meta-data-api";
import { onMounted } from "vue";
import DefaultParcel from "./DefaultParcel.vue";
import DefaultStatus from "../Components/DefaultStatus.vue";

export default {
  components: {
    DefaultParcel,
    DefaultStatus,
  },
  props: {},
  setup(props, { emit }) {
    onMounted(async () => {});
    return {
      MetaDataType,
    };
  },
};
</script>

<style scoped></style>
