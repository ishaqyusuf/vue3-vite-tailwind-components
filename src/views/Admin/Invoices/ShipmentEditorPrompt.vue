<template>
  <div>
    <slot name="btn" :open="open"></slot>
    <ShipmentEditor ref="dialog"></ShipmentEditor>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import ShipmentEditor from "@/views/Admin/Shipment/Components/ShipmentForm.vue";
export default {
  components: {
    ShipmentEditor,
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
