<template>
  <DopeCard
    title="Default Parcel Configuration"
    subtitle="Setup default parcel data"
  >
    <CardContent class="space-y-4"> </CardContent>
    <Table></Table>
    <CardActions plain>
      <Btn async :action="updatePkg" color="green-500">Save</Btn>
    </CardActions>
  </DopeCard>
</template>

<script lang="ts">
import DopeCard from "@/views/Settings/DopeCard.vue";
import { onMounted, ref } from "vue";
import useMetaDataApi, { MetaDataType } from "@/use/api/use-meta-data-api";
import useList from "@/use/useList";
export default {
  props: {},
  components: {
    DopeCard,
  },
  setup(props, { emit }) {
    const ls = ref<any[]>([]);
    const list = useList();
    list.initialize();
    onMounted(async () => {
      const { items } = await useMetaDataApi.index({
        type: MetaDataType.PARCEL_STATUS,
      });
      if (items) {
        list.refresh(items);
      }
    });
    const updatePkg = () => {};
    return {
      updatePkg,
      ls,
    };
  },
};
</script>

<style scoped></style>
