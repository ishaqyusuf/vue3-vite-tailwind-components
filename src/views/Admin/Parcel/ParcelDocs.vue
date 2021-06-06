<template>
  <App vintage pad-y>
    <DocPage ref="docs"></DocPage>
  </App>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import DocPage from "@/views/Admin/Components/Documents/DocPage.vue";
import user from "@/use/user";
import useParcelApi from "@/use/api/use-parcels-api";
export default {
  props: {
    slug: String,
  },
  components: {
    DocPage,
  },
  setup(props, { emit }) {
    const docs = ref();
    onMounted(() => {
      docs.value.init(props.slug, useParcelApi.get, user.can("updateShipment"));
    });
    return {
      docs,
    };
  },
};
</script>

<style scoped></style>
