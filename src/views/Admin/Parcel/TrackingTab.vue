<template>
  <Loader v-if="isLoading"></Loader>
  <template v-else>
    <div class="inline-flex justify-end">
      <Btn>Update Tracking</Btn>
    </div>
    <div class="sm:px-4">
      <TrackingStatusItem
        v-for="(item, index) in result.trackings"
        :item="item"
        :editable="user.can('updatePkg')"
        @edit="edit(item)"
        :key="index"
      ></TrackingStatusItem>
    </div>
  </template>
  <EditTracking ref="editor"></EditTracking>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import TrackingStatusItem from "@/views/Guests/Track/TrackingStatusItem.vue";
import trackerHook from "@/hooks/tracker";
import user from "@/use/user";
import EditTracking from "@/views/Guests/Track/EditTracking.vue";
export default {
  props: {
    slug: String,
  },
  components: {
    TrackingStatusItem,
    EditTracking,
  },
  setup(props, { emit }) {
    onMounted(async () => {
      await trackerHook.search(props.slug);
    });
    const editor = ref();
    return {
      ...trackerHook,
      user,
      editor,
      edit: (item) => {
        editor.value.open(item);
      },
    };
  },
};
</script>

<style scoped></style>
