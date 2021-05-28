<template>
  <Loader v-if="listHook.loading.value"></Loader>
  <template v-else>
    <div class="inline-flex w-full justify-end">
      <Btn @click="edit({})">Update Tracking</Btn>
    </div>
    <div class="">
      <TrackingStatusItem
        v-for="(id, index) in ids"
        :index="id"
        :editable="isEditable"
        :hook="listHook"
        @edit="edit"
        :key="index"
      ></TrackingStatusItem>
    </div>
    <EmptyContainer v-if="ids.length == 0">
      <i-mdi-note-text class="text-6xl" />
      <span>Note box is empty</span>
    </EmptyContainer>
  </template>
  <EditTracking :hook="listHook" ref="editor"></EditTracking>
</template>

<script lang="ts">
import { ref, onMounted, computed } from "vue";
import TrackingStatusItem from "@/views/Guests/Track/TrackingStatusItem.vue";
import trackerHook from "@/hooks/tracker";
import useParcel from "@/use/parcels/parcel";
import user from "@/use/user";
import EditTracking from "@/views/Guests/Track/EditTracking.vue";
import { tableHook } from "@/hooks/table";
export default {
  props: {
    parcel_slug: String,
  },
  components: {
    TrackingStatusItem,
    EditTracking,
  },
  setup(props, { emit }) {
    onMounted(async () => {
      const data = await trackerHook.search(props.parcel_slug);
      listHook.refresh(data.trackings ?? []);
    });
    const editor = ref();
    const listHook = tableHook();
    listHook.initialize([]);
    return {
      ...trackerHook,
      listHook,
      user,
      editor,
      edit: (item) => {
        editor.value.init(item, {
          post_parent: useParcel.parcel.value?.id,
          type: null,
        });
      },
      isEditable: computed(() => user.can("updatePkg")),
      ids: computed(() => listHook.data.ids),
    };
  },
};
</script>

<style scoped></style>
