<template>
  <Loader v-if="isLoading"></Loader>
  <template v-else>
    <div class="p-4 inline-flex justify-end">
      <Btn>Update Tracking</Btn>
    </div>
    <div class="sm:px-4">
      <TrackingStatusItem
        v-for="(item, index) in result.trackings"
        :item="item"
        :editable="user.can('updatePkg')"
        :key="index"
      ></TrackingStatusItem>
    </div>
  </template>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import TrackingStatusItem from "@/views/Guests/Track/TrackingStatusItem.vue";
import trackerHook from "@/hooks/tracker";
import user from "@/use/user";
export default {
  props: {
    slug: String,
  },
  components: {
    TrackingStatusItem,
  },
  setup(props, { emit }) {
    onMounted(async () => {
      await trackerHook.search(props.slug);
    });
    return {
      ...trackerHook,
      user,
    };
  },
};
</script>

<style scoped></style>
