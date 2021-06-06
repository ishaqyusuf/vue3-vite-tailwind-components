<template>
  <div class="space-y-6">
    <Input
      label="Shipment Route"
      :grid="grid"
      v-model="sRoute"
      :items="sRoutes"
      select
      @selected="routeChange"
      item-text="title"
      :dense="dense"
    />
    <Input
      label="Shipment #"
      :grid="grid"
      :dense="dense"
      :prefix="sRoute.prefix"
      v-model="form.shipment_id"
    />
    <div class="grid grid-cols-12 w-full">
      <div class="col-span-5">
        <Label>Entry Mode</Label>
      </div>
      <div class="col-span-7">
        <RadioGroup v-model="mode">
          <!-- <RadioGroupLabel class="sr-only">Entry Mode</RadioGroupLabel> -->
          <div class="space-y-2">
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

    <template v-if="mode.automatic">
      <div class="cols-span-12 grid grid-cols-12">
        <Label class="col-span-5">Date</Label>
        <div class="col-span-7 flex flex-col">
          <div class="inline-flex space-x-2">
            <Checkbox v-model="meta.date_range" label="Date Range"></Checkbox>
          </div>
          <div class="inline-flex items-center space-x-2">
            <template v-if="meta.date_range == true">
              <DatePicker
                class=""
                :highlighted="{
                  from: meta.date,
                  to: meta.to_date,
                }"
                v-model="meta.date"
              />
              <i-mdi-unfold-more-vertical />
              <DatePicker
                class=""
                :highlighted="{
                  from: meta.date,
                  to: meta.to_date,
                }"
                v-model="meta.to_date"
              />
            </template>
            <template v-else>
              <DatePicker class="" v-model="meta.date" />
            </template>
          </div>
        </div>
      </div>
    </template>
    <Input
      :items="statusList"
      select
      label="Status"
      grid
      dense
      v-model="form.status"
    />

    <CardActions class="w-full px-0" v-if="!prompt">
      <Btn color="green-500" async :action="save">Save Changes</Btn>
    </CardActions>
    <RouteDialog ref="routeForm" />
  </div>
</template>
<script lang="ts">
import useShipmentRoutesApi from "@/use/api/use-shipment-routes-api";
import useShipmentsApi from "@/use/api/use-shipments-api";
import useShipmentData from "@/use/data/use-shipment-data";
import { ref } from "vue";
import RouteDialog from "@/views/Admin/ShipmentRoute/Components/RouteDialog.vue";
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
} from "@headlessui/vue";

import {
  ApiOptions,
  Shipment,
  ShipmentMeta,
  ShipmentRoute,
} from "@/@types/Interface";
import alert from "@/hooks/alert";
export default {
  props: {
    grid: Boolean,
    dense: Boolean,
    prompt: Boolean,
  },
  components: {
    RouteDialog,
    TRadioGroup: RadioGroup,
    RadioGroupLabel,
    RadioGroupDescription,
    RadioGroupOption,
  },
  setup(props, { emit }) {
    const form = ref<Shipment>({});
    const meta = ref<ShipmentMeta>({});

    const resolver = ref();
    const title = ref("Create Shipment");
    const rejecter = ref();

    const sRoutes = ref<ShipmentRoute[]>([]);
    const sRoute = ref<ShipmentRoute>({});

    const mode = ref<any>({});
    const dateType = ref<any>(useShipmentData.dateTypes[0]);
    const routeForm = ref();
    const routeChange = () => {
      if (!form.value.slug) form.value.shipment_id = sRoute.value.next_index;
      let srid = sRoute.value.id as any;
      if (srid < 0) {
        routeForm.value.open().then((data) => {
          if (data) {
            sRoutes.value = [
              sRoutes.value[0],
              data,
              ...sRoutes.value.splice(1),
            ];
            sRoute.value = data;
          }
        });
      }
    };
    const editShipment = async (slug: any, list = null) => {
      if (slug) {
        const { shipment, meta: _meta, route } = await useShipmentsApi.get(
          slug,
          {
            overview: true,
          }
        );
        form.value = shipment;
        meta.value = _meta;
        sRoute.value = route;
        dateType.value =
          useShipmentData.dateTypes.find(
            (dt) =>
              (_meta.date_range && dt.range) ||
              (_meta.multiple_date && dt.multi)
          ) ?? useShipmentData.dateTypes[0];
      }
      initialize();
      return new Promise((resolve, reject) => {
        resolver.value = resolve;
        rejecter.value = reject;
        show.value = true;
      });
    };
    const initialize = async () => {
      const _sroutes =
        (await useShipmentRoutesApi.index({}, { cache: true }))?.items ?? [];
      sRoutes.value = [
        {
          id: -1,
          title: "New Shipment Route",
          prefix: "?",
        },
        ..._sroutes,
      ];
      mode.value = useShipmentData.pkgEntryModes.find(
        (m) => m.automatic == form.value.automatic
      );
    };
    const save = async () => {
      var srid = sRoute.value.id as any;
      if (srid < 0) {
        alert.error("Invalid shipment route");
        return;
      }
      form.value.shipment_route_id = srid;
      const formData: any = {
        data: form.value,
        meta: { ...meta.value, from_date: meta.value.date },
      };
      !props.prompt && (formData.overview = true);
      const id = form.value.slug;
      const opts: ApiOptions = {
        success: id ? "Shipment updated" : "Shipment Created",
        showError: true,
        error: "Something went wrong.",
      };
      const data = await (id
        ? useShipmentsApi.update(id, formData, opts)
        : useShipmentsApi.create(formData, opts));
      resolver.value(data);
      show.value = false;
      // return null;
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
      meta,
      closeEditor,
      editShipment,
      save,
      routeChange,
      ...useShipmentData,
      dateType,
      routeForm,
    };
  },
};
</script>

<style scoped></style>
