<template>
  <Prompt v-model="show" action :title="title">
    <template #info>
      <div class="my-4 grid grid-cols-12 gap-4 items-center">
        <Label class="col-span-4">Status</Label>
        <Input v-model="form.status" class="col-span-8" />
        <Label class="col-span-4">Summary</Label>
        <Input v-model="form.content" textarea class="col-span-8" />
        <Label class="col-span-4">Location</Label>
        <Input v-model="form.location" class="col-span-8" :items="locations" />
      </div>
      {{ form }}
    </template>
  </Prompt>
</template>

<script lang="ts">
import { Tracking } from "@/@types/Interface";
import { ref, onMounted } from "vue";
import dataLoader from "@/hooks/dataLoader";
export default {
  props: {},
  setup(props, { emit }) {
    const show = ref(false);
    const title = ref();
    const form = ref<Tracking>({});
    onMounted(() => {
      dataLoader.initLocations();
    });
    const init = (tracking: Tracking) => {
      title.value = tracking.id ? "Edit Tracking" : "Create New Tracking";
      form.value = Object.assign({}, tracking);
      console.log(tracking);
      show.value = true;
    };

    return {
      show,
      form,
      title,
      ...dataLoader,
      init,
    };
  },
};
</script>

<style scoped></style>
