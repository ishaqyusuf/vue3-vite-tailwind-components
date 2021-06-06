<template>
  <App vintage class="flex flex-col" fs v-if="!loading">
    <App class="pt-4 sm:pt-6">
      <CardContent class="flex flex-col space-y-4">
        <div class="flex justify-between items-start">
          <div class="flex flex-col">
            <CardTitle flat-y>
              <router-link to="{}">{{ shipmentRoute.title }}</router-link>
              <span class="text-black-200 font-light px-2">|</span>
              {{ shipment.title }}</CardTitle
            >
            <CardSubtitle flat-y class="inline-flex space-x-2">
              <span
                class="rounded-lg text-sm px-2 font-medium"
                :class="[
                  'text-' + stylus.status_color + '-700',
                  'bg-' + stylus.status_color + '-100',
                ]"
              >
                {{ shipment.status }}</span
              >
              <span
                class="inline-flex space-x-1 font-semibold text-green-500 text-sm items-center"
              >
                <i-mdi-package-variant />
                <span>{{ overview.parcels }}</span>
              </span>
            </CardSubtitle>
          </div>
          <div class="inline-flex space-x-2 items-center">
            <Input :items="statusList" select dense v-model="shipment.status" />
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
    </App>
    <Bg class="flex-1" app secondary>
      <router-view></router-view>
    </Bg>
  </App>
</template>

<script lang="ts">
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
