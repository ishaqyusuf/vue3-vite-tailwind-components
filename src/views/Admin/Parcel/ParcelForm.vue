<template>
  <div class="flex flex-col">
    <CardContent
      class="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center pb-4"
    >
      <Label class="sm:col-span-1">Courier</Label>
      <Input
        combobox
        :items="dataLoader.couriers.value"
        dense
        class="sm:col-span-2"
        v-model="form.courier"
      />
      <Label class="sm:col-span-1">Dimension</Label>
      <div class="sm:col-span-2 inline-flex items-center space-x-1">
        <Input dense placeholder="L" v-model="form.length" />
        <span class="text-black-300">*</span>
        <Input dense placeholder="W" v-model="form.width" />
        <span class="text-black-300">*</span>
        <Input dense placeholder="H" suffix="in" v-model="form.height" />
      </div>
      <!-- <Input dense class="sm:col-span-2" v-model="form.dimension" /> -->
      <Label class="sm:col-span-1">Weight</Label>
      <Input
        dense
        class="sm:col-span-2"
        :suffix="form.weight_unit"
        v-model="form.weight"
      />
      <Label class="sm:col-span-1">Description</Label>
      <Input dense textarea class="sm:col-span-2" v-model="form.description" />
    </CardContent>
    <CardActions>
      <Btn secondary @click="close">Cancel</Btn>
      <Btn async :action="save">Save</Btn>
    </CardActions>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import { Parcel } from "@/@types/Interface";
import dataLoader from "@/hooks/dataLoader";
import parcel from "@/use/parcels/parcel";
import { pick } from "lodash";
export default {
  props: {
    parcel: Object,
  },
  setup(props, { emit }) {
    onMounted(() => {
      dataLoader.initCouriers();
      // dataLoader.initPkgData();
    });

    const form = ref<Parcel>(Object.assign({}, props.parcel));
    return {
      form,
      dataLoader,
      save: async () => {
        const data = pick(form.value, [
          "length",
          "width",
          "weight",
          "id",
          "weight_unit",
          "height",
          "dimension_unit",
          "track_code",
          "courier",
          "description",
        ]);
        const updated = await parcel.updateParcel(data.track_code, data);
        if (updated) emit("close");
      },
      close: () => emit("close"),
    };
  },
};
</script>

<style scoped></style>
