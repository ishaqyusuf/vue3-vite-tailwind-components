<template>
  <Table dense :use-list="list" :structure="structure">
    <template v-slot:status="{ item }">
      <span
        v-if="item.status"
        class="rounded-lg px-1 font-medium"
        :class="[
          'text-' + item.status_color + '-700',
          'bg-' + item.status_color + '-50',
        ]"
        >{{ item.status }}</span
      >
    </template>
  </Table>
</template>

<script lang="ts">
import useMetaLoader from "@/use/api/use-meta-loader";
import useShipmentsList from "@/use/list/use-shipments-list";
import useList from "@/use/useList";
import { onMounted, ref } from "vue";

export default {
  props: {},
  setup(props, { emit }) {
    const list = useList();

    list.initialize([], useShipmentsList.transformer);
    onMounted(async () => {
      await useMetaLoader.loadShipmentStatus();
      useShipmentsList.fetch(list, null, { db: true, per_page: 5 });
    });
    return {
      list,
      structure: [
        { name: "track_code", title: "Shipment" },
        { name: "status", title: "Status" },
      ],
    };
  },
};
</script>

<style scoped></style>
