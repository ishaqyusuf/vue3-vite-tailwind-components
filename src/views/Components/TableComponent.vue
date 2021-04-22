<template>
  <Table :structure="structure" checkable action deletable :data="data">
    <!-- <template v-slot:after_parcel="{ item }"> </template> -->
  </Table>
</template>

<script setup lang="ts">
import { defineComponent, toRefs, ref, unref } from "vue";
const structure = ref([
  {
    name: "parcel",
    btnLink: true,
    btnProps: {},
    title: "Parcel",
    fontMedium: true,
  },
  { name: "client", title: "Client" },
]);
const data = ref(
  new Array(20).fill(null).map((v, index) => {
    return {
      id: index,
      parcel: "AKDJALKJEKLJEKALJELKA",
      parcel_link: { to: "" },
      client: "Ishaq Yusuf",
    };
  })
);
</script>

<style scoped></style>
