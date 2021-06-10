<template>
  <DopeCard
    title="Default Parcel Configuration"
    subtitle="Setup default parcel data"
  >
    <CardContent class="space-y-4">
      {{ itemsById }}
      <TextColorListItem :use-list="list" :data-id="-1"></TextColorListItem>
      <TextColorListItem
        :use-list="list"
        v-for="(id, index) in ids"
        :data-id="id"
        :key="index"
      ></TextColorListItem>
    </CardContent>

    <CardActions plain>
      <Btn async :action="updatePkg" color="green-500">Save</Btn>
    </CardActions>
  </DopeCard>
</template>

<script lang="ts">
import DopeCard from "@/views/Settings/DopeCard.vue";
import { onMounted, ref, toRefs } from "vue";
import useMetaDataApi, { MetaDataType } from "@/use/api/use-meta-data-api";
import useList from "@/use/useList";
import { TableStructure } from "@/@types/Interface";
import TextColorListItem from "@/views/Settings/Components/TextColorListItem.vue";
export default {
  props: {},
  components: {
    TextColorListItem,
    DopeCard,
  },
  setup(props, { emit }) {
    const list = useList();
    list.initialize();

    const structure = ref<TableStructure[]>([
      {
        name: "title",
      },
      { name: "color" },
    ]);
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
      list,
      ...list,
      structure,
    };
  },
};
</script>

<style scoped></style>
