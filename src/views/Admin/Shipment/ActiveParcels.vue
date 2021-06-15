<template>
  <App pad-y>
    <div class="inline-flex items-center justify-between w-full">
      <Truncify class="text-2xl font-bold text-gray-700">{{
        filter.title
      }}</Truncify>

      <div class="inline-flex items-center space-x-2">
        <span>Showing:</span>
        <Input
          v-model="filter"
          select
          @selected="changeView"
          dense
          item-text="title"
          :items="filters"
        />
      </div>
    </div>
    <ParcelList ref="parcelList" :query="query" show-action>
      <template v-slot:custom-actions>
        <Btn
          v-if="filter.show_add"
          dark
          rounded
          async
          :action="addToShipment"
          color="green-600"
        >
          <i-mdi-archive-outline />
          <span>Add to shipment</span>
        </Btn>
        <Btn
          v-else
          dark
          rounded
          async
          :action="removeFromShipment"
          color="red-600"
        >
          <i-mdi-close />
          <span>Remove from shipment</span>
        </Btn>
      </template>
    </ParcelList>
  </App>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import useList from "@/use/useList";
import ParcelList from "@/views/Admin/Parcels/ParcelList.vue";
import { useRoute } from "vue-router";
import router from "@/router";
import useShipmentOverview from "@/views/Admin/Shipment/use-shipment-overview";
import useShipmentsApi from "@/use/api/use-shipments-api";
export default {
  components: {
    ParcelList,
  },
  props: {},
  setup(props, { emit }) {
    const list = ref(); //useList();
    const parcelList = ref();

    onMounted(() => {
      list.value = parcelList.value.list;
    });
    const query = ref<any>({
      shipment_mode: true,
      shipment_id: useShipmentOverview.shipment.value.id,
    });
    const filters = [
      {
        show_add: false,
        title: "Active Parcels",
        query: {
          parcels: "active",
        },
      },
      {
        show_add: true,
        title: "Shippable Parcels",
        query: {
          parcels: "shippables",
        },
      },
    ];
    const route = ref();
    onMounted(() => {
      route.value = useRoute();
    });
    const filter = ref<any>(filters[0]);
    const changeView = () => {
      const { params, name, query } = route.value;
      list.value.clearChecks();
      router.push({
        name,
        params,
        query: filter.value.query,
      });
    };
    const updateShipment = async (form) => {
      const data = await useShipmentsApi.update(route.value.params.slug, form, {
        success: "Shipment updated!",
      });

      useShipmentOverview.overview.value.parcels = data.parcels;
      changeView();
    };
    const removeFromShipment = async () => {
      await updateShipment({
        deselect: list.value.data.checkedIds,
        parcels_mode: true,
      });
    };
    const addToShipment = async () => {
      await updateShipment({
        select: list.value.data.checkedIds,
        parcels_mode: true,
      });
    };
    return {
      removeFromShipment,
      addToShipment,
      changeView,
      filters,
      parcelList,
      query,
      filter,
      list,
    };
  },
};
</script>

<style scoped></style>
