<template>
  <DefaultParcel></DefaultParcel>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import DefaultParcel from "@/views/Settings/ParcelSetting/DefaultParcel.vue";
export default {
  components: {
    DefaultParcel,
  },
  props: {},
  setup(props, { emit }) {
    onMounted(async () => {});
    return {};
  },
};
</script>

<style scoped></style>
