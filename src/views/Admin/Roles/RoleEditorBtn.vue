<template>
  <div>
    <slot name="btn" :open="open"></slot>
    <RoleEditor ref="dialog"></RoleEditor>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import RoleEditor from "@/views/Admin/Roles/RoleEditor.vue";
export default {
  components: {
    RoleEditor,
  },
  props: {},
  setup(props, { emit }) {
    const title = ref("");
    const dialog = ref();
    const open = async (shipment: any = {}, list: any = null) => {
      dialog.value.editShipment(shipment, list).then((result) => {});
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
