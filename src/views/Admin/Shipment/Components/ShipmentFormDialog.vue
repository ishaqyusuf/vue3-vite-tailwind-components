<template>
  <div>
    <slot name="btn" :open="init"></slot>
    <Prompt
      v-model="show"
      @closed="show = false"
      ok="Create"
      cancelable
      hide-cancel
      :ok-action="dialog?.save"
      :title="title"
    >
      <template #info>
        <div class="p-4 max-h-96 overflow-auto">
          <!-- <ShipmentForm></ShipmentForm> -->
          <ShipmentForm dense prompt ref="dialog"></ShipmentForm>
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
    const init = (slug: any = null, list: any = null) => {
      show.value = true;
      title.value = slug ? "Edit Shipment" : "Create Shipment";
      setTimeout(() => {
        dialog.value.editShipment(slug).then((result) => {
          console.log(result);
          // router.push(useRouteComposer.shipment(result.slug));
          show.value = false;
        });
      }, 500);
    };
    const save = async () => {
      await dialog.value.saveShipment();
    };
    return {
      show,
      save,
      init,
      dialog,
      title,
    };
  },
};
</script>

<style scoped></style>
