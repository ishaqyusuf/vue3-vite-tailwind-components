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
    <ParcelList :ls="list" :query="query" show-action>
      <template v-slot:custom-actions>
        <Btn v-if="filter.show_add" dark rounded color="green-600">
          <i-mdi-archive-outline />
          <span>Add to shipment</span>
        </Btn>
        <Btn v-else dark rounded color="red-600">
          <i-mdi-close />
          <span>Remove from shipment</span>
        </Btn>
      </template>
    </ParcelList>
  </App>
</template>

<script lang="ts">
import { ref } from "vue";
import useList from "@/use/useList";
import ParcelList from "@/views/Admin/Parcels/ParcelList.vue";
export default {
  components: {
    ParcelList,
  },
  props: {},
  setup(props, { emit }) {
    const list = useList();
    const query = ref({});
    const filters = [
      {
        show_add: false,
        title: "Active Parcels",
        query: {
          page: 1,
        },
      },
      { show_add: true, title: "Shippable Parcels", query: {} },
    ];
    const filter = ref<any>(filters[0]);
    const changeView = (view) => {
      console.log(view);
    };
    return {
      changeView,
      filters,
      query,
      filter,
      list,
    };
  },
};
</script>

<style scoped></style>
