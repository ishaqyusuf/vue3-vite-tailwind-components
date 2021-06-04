<template>
  <div>
    <slot name="btn" :open="open"></slot>
    <Prompt
      v-model="show"
      @closed="show = false"
      ok="Create"
      :ok-action="dialog?.saveShipment"
      :title="title"
    >
      <template #info>
        <div class="p-4 max-h-96 overflow-auto">
          <!-- <ShipmentForm></ShipmentForm> -->
          <ShipmentForm dense ref="dialog"></ShipmentForm>
        </div>
      </template>
    </Prompt>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import ShipmentForm from "./ShipmentForm.vue";
export default {
  components: {
    ShipmentForm,
  },
  props: {},
  setup(props, { emit }) {
    const title = ref("");
    const dialog = ref();
    const show = ref(false);
    const open = async (shipment: any = {}, list: any = null) => {
      show.value = true;
      setTimeout(() => {
        dialog.value.editShipment(shipment, list).then((result) => {
          show.value = false;
        });
      }, 500);
    };
    return {
      show,
      open,
      dialog,
      title,
    };
  },
};
</script>

<style scoped></style>
