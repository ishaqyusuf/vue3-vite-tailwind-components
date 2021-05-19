<template>
  <Container class="space-y-4">
    <div class="text-2xl font-bold text-gray-700">Parcels</div>

    <Table
      checkable
      action
      deletable
      :items="items"
      :pager="pager"
      :structure="structure"
    ></Table>
    <Pager :data="pager" simple />
  </Container>
</template>

<script lang="ts">
import { ref, reactive, toRefs, onMounted, computed } from "vue";
import parcels from "@/use/parcels";
export default {
  props: {},
  setup(props, { emit }) {
    onMounted(() => {
      initialize();
    });
    const data = reactive({
      items: [],
      pager: {},
    });
    const initialize = async () => {
      const _data = await parcels.fetchParcels({});
      data.items = _data.items;
      data.pager = _data.pager;
    };
    return {
      ...toRefs(data),
      isLoading: computed(() => parcels.loading.value),
      structure: [
        { name: "id", title: "#" },
        {
          name: "track_code",
          title: "Parcel",
        },
      ],
    };
  },
};
</script>

<style scoped></style>
