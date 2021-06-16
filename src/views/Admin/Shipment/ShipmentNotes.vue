<template>
  <App vintage pad-y>
    <NotePage ref="notes"></NotePage>
  </App>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import NotePage from "@/views/Admin/Components/Notes/NotePage.vue";
import { useShipmentsApi } from "@/use/api/use-api";
import user from "@/use/user-account";
export default {
  props: {
    slug: String,
  },
  components: {
    NotePage,
  },
  setup(props, { emit }) {
    const notes = ref();
    onMounted(() => {
      notes.value.init(
        props.slug,
        useShipmentsApi.get,
        user.can("updateShipment")
      );
    });
    return {
      notes,
    };
  },
};
</script>

<style scoped></style>
