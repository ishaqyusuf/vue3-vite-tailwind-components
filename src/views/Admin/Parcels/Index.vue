<template>
  <Container class="space-y-4">
    <div class="text-2xl font-bold text-gray-700">Parcels</div>

    <Table
      checkable
      floating-action
      action
      deletable
      :items="items"
      :structure="structure"
      stickyAction
    >
      <template v-slot:id_date="{ item }">
        <span class="block font-semibold">#{{ item.id }}</span>
        <span class="block">{{ $dayjs.readable(item.created_at) }}</span>
      </template>
      <template v-slot:track_code="{ item, header }">
        <ParcelColumn :item="item" :header="header" />
      </template>
      <template v-slot:recipient="{ item, header }">
        <RecipientColumn :item="item" />
      </template>
    </Table>
    <Pager :data="pager" simple />
  </Container>
</template>

<script lang="ts">
import { ref, reactive, toRefs, onMounted, computed, watch } from "vue";
import parcels from "@/use/parcels";
import router from "@/router";
import RecipientColumn from "@/views/Admin/Parcels/RecipientColumn.vue";
import ParcelColumn from "@/views/Admin/Parcels/ParcelColumn.vue";
import tableHook from "@/hooks/table";
export default {
  components: {
    RecipientColumn,
    ParcelColumn,
  },
  props: {},
  setup(props, ctx) {
    onMounted(() => {
      initialize();
    });
    const data = reactive({
      items: [],
      pager: {},
    });
    watch(
      () => router.currentRoute.value.query,
      (r) => {
        tableHook.refreshable(query, getQuery.value, ["pid"]) && initialize();
      }
    );
    const getQuery = computed(() => router.currentRoute.value.query);
    var query: any = {};
    const initialize = async () => {
      const _data = await parcels.fetchParcels(router.currentRoute.value.query);
      query = getQuery.value;
      data.items = _data.items;
      data.pager = _data.pager;
      console.log("loaded");
    };
    return {
      ...toRefs(data),
      isLoading: computed(() => parcels.loading.value),
      structure: [
        { name: "id_date", title: "#/Date" },
        {
          name: "track_code",
          title: "Parcel",
        },
        {
          name: "recipient",
          title: "Recipient",
        },
      ],
    };
  },
};
</script>

<style scoped></style>
