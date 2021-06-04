<template>
  <div class="space-y-6">
    <Input
      label="Shipment Route"
      :grid="grid"
      v-model="sRoute"
      :items="sRoutes"
      select
      item-text="title"
      :dense="dense"
    />
    <Input
      label="Shipment #"
      :grid="grid"
      :dense="dense"
      :prefix="sRoute.prefix"
    />
    <Input
      :items="statusList"
      select
      label="Status"
      grid
      dense
      v-model="shipment.status"
    />
    <Input label="Status" :grid="grid" :dense="dense" prefix="JFK-" />
    <div class="grid grid-cols-12 w-full">
      <div class="col-span-5">
        <Label>Entry Mode</Label>
      </div>
      <div class="col-span-7">
        <RadioGroup v-model="mode">
          <RadioGroupLabel class="sr-only">Entry Mode</RadioGroupLabel>
          <div class="space-y-2">
            <RadioItem>
              <template v-slot:default="{ active, checked }"> abc </template>
            </RadioItem>
            <RadioGroupOption
              as="template"
              v-for="mode in pkgEntryModes"
              :key="mode.id"
              :value="mode"
              v-slot="{ active, checked }"
            >
              <div
                :class="[
                  active
                    ? 'ring-2 ring-offset-2 ring-offset-blue-300 ring-white ring-opacity-60'
                    : '',
                  checked
                    ? 'bg-blue-900 bg-opacity-75 text-white '
                    : 'bg-white ',
                ]"
                class="relative flex p-2 rounded-lg shadow-md cursor-pointer focus:outline-none"
              >
                <div class="flex items-center justify-between w-full">
                  <div class="flex items-center">
                    <div class="text-sm">
                      <RadioGroupLabel
                        as="p"
                        :class="checked ? 'text-white' : 'text-gray-900'"
                        class="font-medium"
                      >
                        {{ mode.title }}
                      </RadioGroupLabel>
                      <RadioGroupDescription
                        as="span"
                        :class="
                          checked ? 'text-light-blue-100' : 'text-gray-500'
                        "
                        class="inline"
                      >
                        <span> {{ mode.subtitle }}</span>
                      </RadioGroupDescription>
                    </div>
                  </div>
                  <div v-show="checked" class="flex-shrink-0 text-gray-300">
                    <i-mdi-checkbox-marked-circle />
                  </div>
                </div>
              </div>
            </RadioGroupOption>
          </div>
        </RadioGroup>
      </div>
    </div>
    <!-- <Input label="Parcel Entry Mode" grid select :items="" /> -->
    {{ shipment }}
    {{ form }}
    <template v-if="mode.automatic">
      <div class="cols-span-12 grid grid-cols-12">
        <Label class="col-span-5">Date</Label>
        <div class="col-span-7">
          <div class="inline-flex space-x-2">
            <Checkbox label="Range" />
            <Checkbox label="Multiple" />
            <Checkbox label="Single" />
          </div>
          <DatePicker class="col-span-8" v-model="form.date" />
        </div>
      </div>
      <Input
        label="Date"
        :grid="grid"
        v-model="sRoute"
        :items="sRoutes"
        select
        item-text="title"
        :dense="dense"
      />
    </template>
  </div>
</template>
<script lang="ts">
import useShipmentRoutesApi from "@/use/api/use-shipment-routes-api";
import useShipmentsApi from "@/use/api/use-shipments-api";
import useShipmentData from "@/use/data/use-shipment-data";
import { computed, ref } from "vue";
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
} from "@headlessui/vue";

import useShipmentOverview from "@/views/Admin/Shipment/use-shipment-overview";
export default {
  props: {
    grid: Boolean,
    dense: Boolean,
  },
  components: {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupDescription,
    RadioGroupOption,
  },
  setup(props, { emit }) {
    const form = ref<any>({});
    const resolver = ref();
    const title = ref();
    const rejecter = ref();

    const sRoutes = ref([]);
    const sRoute = ref<any>({});

    const mode = ref<any>({});

    const initialize = async () => {
      sRoutes.value =
        (await useShipmentRoutesApi.index({}, { cache: true }))?.items ?? [];
      console.log(sRoutes.value);
    };
    const editShipment = async (shipment: any = {}, list = null) => {
      title.value = shipment.title ?? "Create Shipment";
      form.value = shipment;
      initialize();
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
      sRoute,
      mode,
      sRoutes,
      form,
      title,
      show,
      closeEditor,
      editShipment,
      saveShipment,
      ...useShipmentOverview,
      ...useShipmentData,
    };
  },
};
</script>

<style scoped></style>
