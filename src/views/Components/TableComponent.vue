<template>
  <div class="inline-flex item-center space-x-2">
    <Btn @click="prev">Prev</Btn>
    <Btn @click="next">Next</Btn>
    <Btn @click="reset">Reset</Btn>
    <Btn @click="addRandom(true)">Add Top</Btn>
    <Btn @click="addRandom">Add Bottom</Btn>
    <span>page:{{ page }}</span>
  </div>
  <Table
    dense
    :structure="structure"
    :use-list="tableData"
    checkable
    action
    deletable
  >
    <template v-slot:more-actions="{ item }"> </template>
  </Table>
  <TableAction :use-list="tableData" show edit deletable print></TableAction>
</template>

<script lang="ts">
import { TableStructure } from "@/@types/Interface";
import { ref } from "vue";
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
    const getItem = (id) => {
      return {
        id,
        parcel: "Parcel " + id,
        parcel_link: { to: "" },
        client: "Ishaq Yusuf",
      };
    };
    const loadData = () => {
      return new Array(ipp).fill(null).map((v, index) => {
        const id = index + ipp * page.value;
        return getItem(id);
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
      addRandom: (top = false) => {
        const id = new Date().getUTCMilliseconds();
        !top ? tableData.push(getItem(id)) : tableData.unshift(getItem(id));
      },
    };
  },
};
</script>

<style scoped></style>
