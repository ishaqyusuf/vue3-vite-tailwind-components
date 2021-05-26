<template>
  <Loader v-if="loading" />
  <div class="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-12" v-else>
    <Doc
      v-for="(id, index) in lsHook.ids.value"
      :data-id="id"
      :ls-hook="lsHook"
      :key="index"
    ></Doc>
  </div>
</template>

<script lang="ts">
import useList from "@/use/useList";
import { ref, onMounted } from "vue";
import Doc from "./Doc.vue";
export default {
  components: {
    Doc,
  },
  props: {
    parcel_slug: String,
    shipment_slug: String,
  },
  setup(props, { emit }) {
    const loading = ref(true);
    const lsHook = useList();
    lsHook.initialize();
    onMounted(() => {});
    return {
      loading,
      lsHook,
    };
  },
};
</script>

<style scoped></style>
