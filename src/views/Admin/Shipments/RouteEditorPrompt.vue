<template>
  <div>
    <slot name="btn" :open="open"></slot>
    <RouteEditor ref="dialog"></RouteEditor>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import RouteEditor from "@/views/Admin/Shipments/RouteEditor.vue";
export default {
  components: {
    RouteEditor,
  },
  props: {},
  setup(props, { emit }) {
    const title = ref("");
    const dialog = ref();
    const open = async (route: any = {}, list = null) => {
      return dialog.value.editRoute(route, list).then((result) => {});
    };
    return {
      open,
      dialog,
      title,
    };
  },
};
</script>

<style scoped></style>
