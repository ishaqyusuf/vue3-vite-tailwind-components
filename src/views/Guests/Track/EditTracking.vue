<template>
  <Prompt v-model="show" action :title="title">
    <template #info>
      <div class="my-4 grid grid-cols-12 gap-4 items-center">
        <Label class="col-span-4">Label</Label>
        <Input class="col-span-8" />
        <Label class="col-span-4">Courier</Label>
        <Input class="col-span-8" select :items="loader.couriers" />
      </div>
    </template>
  </Prompt>
</template>

<script lang="ts">
import { Tracking } from "@/@types/Interface";
import { ref, onMounted } from "vue";
import dataLoader from "@/hooks/dataLoader";
import { data } from "cypress/types/jquery";
export default {
  props: {},
  setup(props, { emit }) {
    const show = ref(false);
    const title = ref();
    onMounted(() => {
      dataLoader.initCouriers();
    });
    const open = (tracking: Tracking) => {
      title.value = tracking.id ? "Edit Tracking" : "Create New Tracking";
      show.value = true;
    };

    return {
      show,
      title,
      loader: dataLoader,
      open,
    };
  },
};
</script>

<style scoped></style>
