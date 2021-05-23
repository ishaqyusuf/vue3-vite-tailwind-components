<template>
  <Loader v-if="isLoading"></Loader>
  <template v-else>
    <div class="inline-flex justify-end">
      <Btn @click="editor.init({})">Update Tracking</Btn>
    </div>
    <div class="">
      <TrackingStatusItem
        v-for="(item, index) in result.trackings"
        :item="item"
        :editable="isEditable"
        @edit="edit(item)"
        :key="index"
      ></TrackingStatusItem>
    </div>
  </template>
  <EditTracking ref="editor"></EditTracking>
</template>

<script lang="ts">
import { ref, onMounted, computed } from "vue";
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
        editor.value.init(item);
      },
      isEditable: computed(() => user.can("updatePkg")),
    };
  },
};
</script>

<style scoped></style>
