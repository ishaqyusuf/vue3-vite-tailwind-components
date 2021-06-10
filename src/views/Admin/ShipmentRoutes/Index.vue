<template>
  <Container class="space-y-4">
    <div class="inline-flex justify-between w-full items-center">
      <CardTitle>Shipments</CardTitle>
      <div class="inline-flex space-x-2">
        <Btn secondary>
          <i-mdi-plus />
          <span>New Route</span>
        </Btn>
        <ShipmentFormDialog>
          <template #btn="{ open }">
            <Btn @click="open(null, listr)">
              <i-mdi-plus />
              <span>New Shipment</span>
            </Btn>
          </template>
        </ShipmentFormDialog>
      </div>
    </div>
    <Table
      checkable
      action
      hide-actions
      dense
      deletable
      :use-list="listr"
      hide-checks
      more-action
      :structure="structure"
    ></Table>
  </Container>
</template>

<script lang="ts">
import useShipmentsList from "@/use/list/use-shipments-list";
import useList from "@/use/useList";
import ShipmentFormDialog from "@/views/Admin/Shipment/Components/ShipmentFormDialog.vue";
export default {
  components: {
    ShipmentFormDialog,
  },
  props: {},
  setup(props, { emit }) {
    const listr = useList();
    listr.initialize(
      [],
      useShipmentsList.transformer,
      useShipmentsList.actions
    );
    return {
      listr,
      ...useShipmentsList,
    };
  },
};
</script>

<style scoped></style>
