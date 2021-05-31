<template>
  <Container class="space-y-4">
    <div class="inline-flex justify-between w-full items-center">
      <CardTitle>Shipments</CardTitle>
      <div class="inline-flex space-x-2">
        <Btn secondary>
          <i-mdi-plus />
          <span>New Route</span>
        </Btn>
        <Btn>
          <i-mdi-plus />
          <span>New Shipment</span>
        </Btn>
      </div>
    </div>
    <StandardTable
      checkable
      action
      hide-actions
      dense
      deletable
      :worker="listr"
      hide-checks
      more-action
      :structure="structure"
    ></StandardTable>
  </Container>
</template>

<script lang="ts">
import useShipmentsList from "@/use/use-shipments-list";
import useList from "@/use/useList";
export default {
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
