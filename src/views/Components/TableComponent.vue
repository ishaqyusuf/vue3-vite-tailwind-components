<template>
  <Btn color="blue">
    <span>Hello</span>
  </Btn>
  <Btn :to="{ name: 'login' }" loading>
    <span>Hello</span>
  </Btn>
  {{ tableData.data.checkedIds.length }}
  <StandardTable
    :structure="structure"
    :worker="tableData"
    checkable
    action
    deletable
  >
    <!-- <template v-slot:after_parcel="{ item }"> </template> -->
    <!-- <template v-slot:description="{ note }">
      <div class="">Hello From Deep Slot {{ note }}</div>
    </template> -->
  </StandardTable>
  <TableAction :worker="tableData" show edit deletable print></TableAction>
</template>

<script lang="ts">
import { TableStructure } from "@/@types/Interface";
import { defineComponent, toRefs, ref, unref } from "vue";
import { tableHook } from "@/hooks/table";
import parcel from "@/use/parcels";
import time from "@/hooks/time";
export default {
  setup(props, { emit }) {
    const structure = ref<TableStructure[]>([
      {
        name: "parcel",
        btnLink: true,
        btnProps: {},
        title: "Parcel",
        fontMedium: true,
      },
      { name: "client", title: "Client" },
    ]);
    const loadData = (count, startIndex = 0) => {
      return new Array(count).fill(null).map((v, index) => {
        return {
          id: index + startIndex,
          parcel: "AKDJALKJEKLJEKALJELKA",
          parcel_link: { to: "" },
          client: "Ishaq Yusuf",
        };
      });
    };
    const data = loadData(10, 10);

    const tableData = tableHook<any>();
    tableData.init(data);
    time.delay(2000).then((d) => {
      tableData.clear();
      tableData.init(loadData(20, 4));
    });
    return {
      tableData,
      structure,
      data,
    };
  },
};
</script>

<style scoped></style>
