<template>
  <Tabs>
    <TabItem :to="{ name: 'parcel-overview' }">
      <template #icon>
        <i-mdi-map-marker-outline />
      </template>
      <string>Tracking</string>
    </TabItem>
    <TabItem :to="{ name: 'parcel-documents' }">
      <template #icon>
        <i-mdi-file-document-outline />
      </template>
      <string>Attachments</string>
    </TabItem>
    <TabItem :to="{ name: 'parcel-documents' }">
      <template #icon>
        <i-mdi-label-outline />
      </template>
      <string>Labels</string>
    </TabItem>
    <TabItem :to="{ name: 'parcel-documents' }">
      <template #icon>
        <i-mdi-receipt />
      </template>
      <string>Invoice</string>
    </TabItem>
    <TabItem :to="{ name: 'parcel-notes' }">
      <template #icon>
        <i-mdi-note-outline />
      </template>
      <string>Notes</string>
    </TabItem>
  </Tabs>
</template>

<script lang="ts">
import { ref } from "vue";
import useParcel from "@/use/parcels/parcel";
export default {
  props: {},
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
