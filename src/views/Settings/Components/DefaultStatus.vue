<template>
  <DopeCard :title="title" :subtitle="subtitle">
    <CardContent class="divide-y">
      <TextColorListItem
        :use-list="list"
        :type="type"
        :data-id="-1"
      ></TextColorListItem>
      <TextColorListItem
        :use-list="list"
        v-for="(id, index) in ids"
        :data-id="id"
        :type="type"
        :key="index"
      ></TextColorListItem>
    </CardContent>
  </DopeCard>
</template>

<script lang="ts">
import DopeCard from "@/views/Settings/DopeCard.vue";
import { onMounted, ref } from "vue";
import useMetaDataApi, { MetaDataType } from "@/use/api/use-meta-data-api";
import useList from "@/use/useList";
import { TableStructure } from "@/@types/Interface";
import TextColorListItem from "@/views/Settings/Components/TextColorListItem.vue";
export default {
  props: {
    type: String,
    title: String,
    subtitle: String,
  },
  components: {
    TextColorListItem,
    DopeCard,
  },
  setup(props, { emit }) {
    const list = useList();
    list.initialize([], null, {
      delete: async (item) => {
        await useMetaDataApi.delete(item.id);
      },
    });

    const structure = ref<TableStructure[]>([
      {
        name: "title",
      },
      { name: "color" },
    ]);
    onMounted(async () => {
      const { items } = await useMetaDataApi.index({
        type: props.type,
      });
      if (items) {
        list.refresh(items);
      }
    });
    return {
      list,
      ...list,
      MetaDataType,
      structure,
    };
  },
};
</script>

<style scoped></style>
