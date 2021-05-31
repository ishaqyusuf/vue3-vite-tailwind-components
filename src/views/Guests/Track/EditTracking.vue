<template>
  <Prompt v-model="show" action :okAction="saveTracking" :title="title">
    <template #info>
      <div class="my-4 px-4 grid grid-cols-12 gap-4 items-center">
        <Label class="col-span-4">Status</Label>
        <Input v-model="form.status" :items="trackNotes" class="col-span-8" />
        <Label class="col-span-4">Summary</Label>
        <Input
          v-model="form.content"
          :items="trackNotes"
          textarea
          class="col-span-8"
        />
        <Label class="col-span-4">Location</Label>
        <Input v-model="form.location" class="col-span-8" :items="locations" />
      </div>
    </template>
  </Prompt>
</template>

<script lang="ts">
import { Tracking } from "@/@types/Interface";
import { ref, onMounted } from "vue";
import dataLoader from "@/hooks/dataLoader";
import trackerHook from "@/hooks/tracker";
export default {
  props: {
    trackingsHook: Object,
    parcelsHook: Object,
  },
  setup(props, { emit }) {
    const show = ref(false);
    const title = ref();
    const form = ref<Tracking>({});
    onMounted(() => {
      dataLoader.initLocations();
      dataLoader.initStats();
      dataLoader.initTrackNotes();
    });
    const parcelId = ref();
    const init = (tracking: Tracking, extras = {}, _parcelId = null) => {
      title.value = tracking.id ? "Edit Tracking" : "Create New Tracking";
      // form.value = tracking;
      parcelId.value = _parcelId;
      form.value = Object.assign({}, tracking, extras);
      // console.log(form);
      show.value = true;
    };

    return {
      show,
      form,
      title,
      ...dataLoader,
      init,
      saveTracking: async () => {
        return new Promise((resolve, reject) => {
          trackerHook
            .save(form.value, (item) => {
              const { trackingsHook, parcelsHook } = props;
              if (trackingsHook) trackingsHook.updateItem(item.id, item, false);
              if (parcelsHook)
                parcelsHook.updateItem(parcelId.value, { status: item.status });
            })
            .then((data) => {
              return resolve(data);
            });
        });
      },
    };
  },
};
</script>

<style scoped></style>
