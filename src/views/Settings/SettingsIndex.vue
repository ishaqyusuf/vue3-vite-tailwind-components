<template>
  <App vintage tertiary class="flex flex-col" fs>
    <App class="pt-4 sm:pt-6">
      <CardContent class="inline-flex space-x-3 w-full">
        <div class="w-1/4 lg:w-1/5 xl:w-1/6">
          <Card class="border py-2">
            <TabLinkItem :to="{ name: 'profile' }"> Account </TabLinkItem>
            <TabLinkItem :to="{ name: 'address-setting' }">
              Address Book
            </TabLinkItem>
            <TabLinkItem :to="{ name: 'invoice-setting' }">
              Invoice
            </TabLinkItem>
            <TabLinkItem :to="{ name: 'parcel-setting' }"> Parcel </TabLinkItem>
            <TabLinkItem :to="{ name: 'shipment-setting' }">
              Shipment
            </TabLinkItem>
            <TabLinkItem :to="{ name: 'form-setting' }">
              Forms and Input
            </TabLinkItem>
            <!-- <TabLinkItem :to="{ name: 'label-setting' }"> Label </TabLinkItem> -->
            <TabLinkItem :to="{ name: 'unit-setting' }">
              Unit & Currency
            </TabLinkItem>
            <!-- <TabLinkItem :to="{name: ''}"> Company </TabLinkItem> -->
          </Card>
        </div>
        <div class="w-3/4 lg:w-4/5 xl:w-5/6 space-y-4 sm:pb-10">
          <router-view></router-view>
        </div>
      </CardContent>
    </App>
  </App>
</template>

<script lang="ts">
import TabLinkItem from "./TabLinkItem.vue";
export default {
  props: {},
  components: {
    TabLinkItem,
  },
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
