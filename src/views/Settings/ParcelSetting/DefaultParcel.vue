<template>
  <DopeCard
    title="Default Parcel Configuration"
    subtitle="Setup default parcel data"
  >
    <CardContent class="space-y-4">
      <Input v-model="content.courier" grid label="Courier" />
      <!-- <Input v-model="content.dimension" readonly grid label="Dimension"/> -->
      <Input v-model="content.weight" grid label="Weight">
        <template #appendOuter>
          <Input v-model="content.weight_str" select :items="['LBS', 'KG']" />
        </template>
      </Input>
      <Input v-model="content.length" placeholder="L" grid label="Dimension">
        <template #appendOuter>
          <Input v-model="content.width" placeholder="W" />
          <Input v-model="content.height" placeholder="H" />
          <Input
            v-model="content.weight_str"
            select
            :items="['in', 'cm', 'm']"
          />
        </template>
      </Input>
      <Input v-model="content.description" textarea grid label="Description" />
      <Input v-model="content.status" select grid label="Status" />
      <!-- <Input v-model="content" readonly grid label=""/> -->
    </CardContent>

    <CardActions plain>
      <Btn async :action="updatePkg" color="green-500">Save</Btn>
    </CardActions>
  </DopeCard>
</template>

<script lang="ts">
import DopeCard from "@/views/Settings/DopeCard.vue";
import { onMounted, ref } from "vue";
import useSiteDataApi, { SiteData } from "@/use/api/use-site-data-api";
export default {
  props: {},
  components: {
    DopeCard,
  },
  setup(props, { emit }) {
    const ls = ref<any[]>([]);
    const editor = ref();
    const content = ref<any>({});
    const form = ref<any>({});
    onMounted(async () => {
      const data = await useSiteDataApi.index({ slug: SiteData.ParcelData });
      if (data) {
        form.value = data;
        content.value = data.content ?? {};
      }
    });
    const updatePkg = () => {};
    return {
      updatePkg,
      content,
      form,
      editor,
      ls,
    };
  },
};
</script>

<style scoped></style>
