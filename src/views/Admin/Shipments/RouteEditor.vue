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
    const editRoute = async (route: any = {}, list = null) => {
      title.value = route.title ?? "Create Route";
      return new Promise((resolve, reject) => {
        resolver.value = resolve;
        rejecter.value = reject;
      });
    };
    const saveRoute = async () => {
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
      editRoute,
      saveRoute,
    };
  },
};
</script>

<style scoped></style>
