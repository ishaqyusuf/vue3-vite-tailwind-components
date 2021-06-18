<template>
  <InvoiceTemplates></InvoiceTemplates>
  <DefaultStatus
    readonly
    title="Invoice Status"
    subtitle="Set default invoice status list"
    :type="MetaDataType.INVOICE_STATUS"
  ></DefaultStatus>
</template>

<script lang="ts">
import { ref } from "vue";
import InvoiceTemplates from "./InvoiceTemplates.vue";
import { MetaDataType } from "@/use/api/use-meta-data-api";
import DefaultStatus from "../Components/DefaultStatus.vue";
export default {
  components: { InvoiceTemplates, DefaultStatus },
  props: {},
  setup(props, { emit }) {
    return {
      MetaDataType,
    };
  },
};
</script>

<style scoped></style>
