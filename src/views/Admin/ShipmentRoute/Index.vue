<template>
  <Container v-if="!loading">
    <div class="">
      <CardContent class="flex flex-col">
        <div class="flex justify-between items-start">
          <div class="flex flex-col">
            <CardTitle flat-y>
              {{ shipmentRoute.title }}
              <span class="text-black-200 font-light px-2">|</span>
              {{ shipment.title }}</CardTitle
            >
            <CardSubtitle flat-y class="">
              <span
                class="rounded-lg text-sm px-2 font-medium"
                :class="[
                  'text-' + stylus.status_color + '-700',
                  'bg-' + stylus.status_color + '-100',
                ]"
              >
                {{ shipment.status }}</span
              >
            </CardSubtitle>
          </div>
          <div class="inline-flex space-x-2 items-center">
            <Input
              :items="['Active', 'Inactive', 'Completed', 'Cancel', 'Draft']"
              select
              dense
              v-model="shipment.status"
            />
            <Btn dense>Edit</Btn>
          </div>
        </div>
        <Tabs pilot>
          <TabItem :to="{ name: 'shipment' }">
            <span>Overview</span>
          </TabItem>
          <TabItem :to="{ name: 'shipment-activity' }">
            <span>Activity</span>
          </TabItem>
          <TabItem :to="{ name: 'shipment-progress' }">
            <span>Route Progress</span>
          </TabItem>
          <TabItem :to="{ name: 'shipment-notes' }">
            <span>Notes</span>
          </TabItem>
          <TabItem :to="{ name: 'shipment-documents' }">
            <span>Documents</span>
          </TabItem>
          <TabItem :to="{ name: 'shipment-parcels' }">
            <span>Active Parcels</span>
          </TabItem>
        </Tabs>
      </CardContent>
    </div>
    <div class="bg-white min-h-screen">
      <router-view></router-view>
    </div>
  </Container>
</template>

<script lang="ts">
import { ref } from "vue";
import useShipmentOverview from "./use-shipment-overview";
export default {
  props: {
    slug: String,
  },
  setup(props, { emit }) {
    useShipmentOverview.initialize(props.slug);
    return {
      ...useShipmentOverview,
    };
  },
};
</script>

<style scoped></style>
