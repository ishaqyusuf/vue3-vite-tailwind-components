<template>
  <div>
    <slot name="btn" :open="init"></slot>
    <Prompt
      v-model="show"
      @closed="show = false"
      ok="Create"
      cancelable
      hide-cancel
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
import router from "@/router";
import { ref } from "vue";
import ShipmentForm from "./ShipmentForm.vue";
import useRouteComposer from "@/use/use-route-composer";
export default {
  components: {
    ShipmentForm,
  },
  props: {},
  setup(props, { emit }) {
    const title = ref("");
    const dialog = ref();
    const show = ref(false);
    const init = (_slug: any = null, list: any = null) => {
      show.value = true;
      title.value = _slug ? "Edit Shipment" : "Create Shipment";
      setTimeout(() => {
        console.log(list);
        dialog.value.editShipment(_slug).then((result) => {
          show.value = false;
          if (list) {
            console.log(result);
            list.updateItem(result.id, result, false);
            router.push(useRouteComposer.shipment(result.slug));
          }
        });
      }, 500);
    };
    return {
      show,
      init,
      dialog,
      title,
    };
  },
};
</script>

<style scoped></style>
