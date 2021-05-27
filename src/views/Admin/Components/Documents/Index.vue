<template>
  <Loader v-if="loading" />
  <div class="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-12" v-else>
    {{ lsHook.ids.value }}
    <Doc
      :type="groupType"
      class="col-span-1 sm:col-span-4 xl:col-span-3"
      :data-id="-1"
      :parent-id="parentId"
      :use-list="lsHook"
    ></Doc>
    <Doc
      :type="groupType"
      :parent-id="parentId"
      class="col-span-1 sm:col-span-4 lg:col-span-3 xl:col-span-2"
      v-for="(id, index) in lsHook.ids.value"
      :data-id="id"
      :use-list="lsHook"
      :key="index"
    ></Doc>
  </div>
</template>

<script lang="ts">
import useDocs from "@/use/api/useDocs";
import useList from "@/use/useList";
import { ref, onMounted } from "vue";
import Doc from "./Doc.vue";
export default {
  components: {
    Doc,
  },
  props: {
    parcel_slug: String,
    shipment_slug: String,
  },
  setup(props, { emit }) {
    const loading = ref(false);
    const groupType = props.parcel_slug ? "parcel" : "shipment";
    const lsHook = useList();
    const parentId = ref<number>(0);
    lsHook.initialize([], (item) => {
      const name = item.title.split(".");
      item.format = name.pop();
      item.name = name.join(".");
    });
    var query: any = {};
    props.parcel_slug
      ? (query.pid = props.parcel_slug)
      : (query.sid = props.shipment_slug);
    onMounted(async () => {
      const { docs, parent_id } = await useDocs.getDocs(query);
      lsHook.refresh(docs.items);
      parentId.value = parent_id;
    });
    return {
      parentId,
      groupType,
      loading,
      lsHook,
    };
  },
};
</script>

<style scoped></style>
