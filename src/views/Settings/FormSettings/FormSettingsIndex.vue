<template>
  <ParcelFormSetting />
  <ParcelClientFormSetting />
</template>

<script lang="ts">
import { ref } from "vue";
import ParcelFormSetting from "@/views/Settings/FormSettings/ParcelFormSetting.vue";
import ParcelClientFormSetting from "@/views/Settings/FormSettings/ParcelClientFormSetting.vue";
export default {
  components: {
    ParcelClientFormSetting,
    ParcelFormSetting,
  },
  props: {},
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
