<template>
  <ActivityComponent slim ref="activity"></ActivityComponent>
</template>

<script lang="ts">
import { ref, onMounted, computed } from "vue";
import user from "@/use/user-account";
import ActivityComponent from "@/views/Guests/TrackResult/ActivityComponent.vue";
import { useParcelsApi } from "@/use/api/use-api";
export default {
  props: {
    slug: String,
  },
  components: {
    ActivityComponent,
  },
  setup(props, { emit }) {
    onMounted(async () => {
      activity.value.init(
        props.slug,
        useParcelsApi.get,
        user.can("createTrack")
      );
    });
    const activity = ref();

    return {
      activity,
    };
  },
};
</script>

<style scoped></style>
