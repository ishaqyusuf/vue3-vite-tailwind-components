<template>
  <div class="inline-flex item-center space-x-2">
    <Btn @click="prev">Prev</Btn>
    <Btn @click="next">Next</Btn>
    <Btn @click="reset">Reset</Btn>
    <span>page:{{ page }}</span>
  </div>
  <StandardTable
    :structure="structure"
    :worker="tableData"
    checkable
    action
    deletable
  >
  </StandardTable>
  <TableAction :worker="tableData" show edit deletable print></TableAction>
</template>

<script lang="ts">
import { TableStructure } from "@/@types/Interface";
import { defineComponent, toRefs, ref, unref } from "vue";
import { tableHook } from "@/hooks/table";
import time from "@/hooks/time";
export default {
  setup(props, { emit }) {
    const structure = ref<TableStructure[]>([
      { name: "id", title: "#" },
      {
        name: "parcel",
        btnLink: true,
        btnProps: {},
        title: "Parcel",
        fontMedium: true,
      },
      { name: "client", title: "Client" },
    ]);
    const loadData = () => {
      return new Array(ipp).fill(null).map((v, index) => {
        const id = index + ipp * page.value;
        return {
          id,
          parcel: "Parcel " + id,
          parcel_link: { to: "" },
          client: "Ishaq Yusuf",
        };
      });
    };
    const ipp = 5;
    const page = ref(1);
    const next = () => {
      page.value++;
      tableData.refresh(loadData());
    };
    const tableData = tableHook<any>();
    tableData.initialize(loadData());
    time.delay(2000).then((d) => {
      next();
      // tableData.updateItem(5, { parcel: ".w" });
    });

    return {
      page,
      next,
      prev: () => {
        page.value = Math.max(1, page.value - 1);
        tableData.refresh(loadData());
      },
      reset: () => {
        page.value = 1;
        tableData.initialize(loadData());
      },
      tableData,
      structure,
    };
  },
};
</script>

<style scoped></style>
