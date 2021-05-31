<template></template>

<script lang="ts">
import useShipmentsApi from "@/use/api/use-shipments-api";
import { ref } from "vue";

export default {
  props: {},
  setup(props, { emit }) {
    const form = ref<any>();
    const resolver = ref();
    const title = ref();
    const rejecter = ref();
    const editShipment = async (shipment: any = {}, list = null) => {
      title.value = shipment.title ?? "Create Shipment";
      return new Promise((resolve, reject) => {
        resolver.value = resolve;
        rejecter.value = reject;
      });
    };
    const saveShipment = async () => {
      const formData = {
        data: form.value,
      };
      const id = form.value.id;
      const data = (await id)
        ? useShipmentsApi.update(id, formData)
        : useShipmentsApi.create(formData);
      resolver.value(data);
    };
    return {
      title,
      editShipment,
      saveShipment,
    };
  },
};
</script>

<style scoped></style>
