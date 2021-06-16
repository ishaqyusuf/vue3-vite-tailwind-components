<template>
  <div>
    <Prompt
      v-model="show"
      @closed="closeEditor"
      ok="Create"
      :ok-action="saveShipment"
      :title="title"
    >
      <template #info>
        <div class="p-4 max-h-96 overflow-auto"></div>
      </template>
    </Prompt>
  </div>
</template>

<script lang="ts">
import time from "@/hooks/time";
import { useShipmentsApi } from "@/use/api/use-api";
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
        show.value = true;
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
      show.value = false;
    };
    const show = ref(false);
    const closeEditor = () => {
      resolver.value(null);
      show.value = false;
    };
    return {
      title,
      show,
      closeEditor,
      editShipment,
      saveShipment,
    };
  },
};
</script>

<style scoped></style>
