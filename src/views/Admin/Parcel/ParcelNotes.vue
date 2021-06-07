<template>
  <App vintage pad-y>
    <NotePage ref="notes"></NotePage>
  </App>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import NotePage from "@/views/Admin/Components/Notes/NotePage.vue";
import user from "@/use/user-account";
import useParcelApi from "@/use/api/use-parcels-api";
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
      notes.value.init(props.slug, useParcelApi.get, user.can("updatePkg"));
    });
    return {
      notes,
    };
  },
};
</script>

<style scoped></style>
