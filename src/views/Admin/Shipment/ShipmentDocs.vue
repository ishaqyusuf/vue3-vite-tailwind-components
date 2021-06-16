<template>
  <App vintage pad-y>
    <DocPage v-bind="$props" ref="docs"></DocPage>
  </App>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import DocPage from "@/views/Admin/Components/Documents/DocPage.vue";
import { useShipmentsApi } from "@/use/api/use-api";
import user from "@/use/user-account";
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
      docs.value.init(
        props.slug,
        useShipmentsApi.get,
        user.can("updateShipment")
      );
    });
    return {
      docs,
    };
  },
};
</script>

<style scoped></style>
