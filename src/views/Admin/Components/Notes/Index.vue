<template>
  <Loader v-if="loading" />
  <div class="space-y-2 mx-4" v-else>
    <Note
      :type="groupType"
      :parent-id="parentId"
      class="col-span-1 sm:col-span-4 xl:col-span-3"
      :data-id="-1"
      :use-list="lsHook"
    ></Note>
    <Note
      :type="groupType"
      :parent-id="parentId"
      class="col-span-1 sm:col-span-4 xl:col-span-3"
      v-for="(id, index) in lsHook.ids.value"
      :data-id="id"
      :use-list="lsHook"
      :key="index"
    ></Note>
    <div
      v-if="lsHook.ids.value.length == 0"
      class="h-60 flex flex-col items-center justify-center space-y-2 text-gray-500 font-bold"
    >
      <i-mdi-note-text class="text-6xl" />
      <span>Note box is empty</span>
    </div>
  </div>
</template>

<script lang="ts">
import useNotes from "@/use/api/useNotes";
import useList from "@/use/useList";
import { ref, onMounted } from "vue";
import Note from "./Note.vue";
export default {
  components: {
    Note,
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
    lsHook.initialize([]);
    var query: any = {};
    props.parcel_slug
      ? (query.pid = props.parcel_slug)
      : (query.sid = props.shipment_slug);
    onMounted(async () => {
      const { notes, parent_id } = await useNotes.getNotes(query);
      lsHook.refresh(notes.items);
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
