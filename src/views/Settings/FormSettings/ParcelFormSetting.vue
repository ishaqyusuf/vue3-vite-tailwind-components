<template>
  <DopeCard
    title="Default Parcel Form and Data"
    subtitle="Setup default parcel data and visible form fields"
  >
    <CardContent class="space-y-4">
      <Input v-model="content.courier" grid>
        <template #grid-label>
          <Checkbox label="Courier" v-model="forms.courier" />
        </template>
      </Input>
      <!-- <Input v-model="content.dimension" readonly grid label="Dimension"/> -->
      <Input v-model="content.weight" grid>
        <template #grid-label>
          <Checkbox label="Weight" v-model="forms.weight" />
        </template>
        <template #appendOuter>
          <Input v-model="content.weight_str" select :items="['LBS', 'KG']" />
        </template>
      </Input>
      <Input v-model="content.length" placeholder="L" grid>
        <template #grid-label>
          <Checkbox label="Dimension" v-model="forms.dimension" />
        </template>
        <template #appendOuter>
          <Input v-model="content.width" placeholder="W" />
          <Input v-model="content.height" placeholder="H" />
          <Input
            v-model="content.dimension_unit"
            select
            :items="['in', 'cm', 'm']"
          />
        </template>
      </Input>
      <Input v-model="content.description" textarea grid>
        <template #grid-label>
          <Checkbox label="Description" v-model="forms.description" />
        </template>
      </Input>
      <Input v-model="content.status" :items="statusList" select grid>
        <template #grid-label>
          <Checkbox label="Status" v-model="forms.status" />
        </template>
      </Input>
    </CardContent>

    <CardActions plain>
      <Btn async :action="updatePkg" color="green">Save</Btn>
    </CardActions>
  </DopeCard>
</template>

<script lang="ts">
import DopeCard from "@/views/Settings/DopeCard.vue";
import { onMounted, ref } from "vue";
import useSiteDataApi, { SiteData } from "@/use/api/use-site-data-api";
import useMetaDataApi, { MetaDataType } from "@/use/api/use-meta-data-api";
import Checkbox from "@/components/shared/Form/Checkbox.vue";
export default {
  props: {},
  components: {
    DopeCard,
    Checkbox,
  },
  setup(props, { emit }) {
    const ls = ref<any[]>([]);
    const editor = ref();
    const content = ref<any>({});
    const forms = ref<any>({});
    const form = ref<any>({});
    const statusList = ref<any[]>([]);
    onMounted(async () => {
      const data = await useSiteDataApi.index({ slug: SiteData.ParcelData });
      if (data) {
        form.value = data;
        content.value = data.content ?? {};
        forms.value = content.value?.forms ?? {};
      }

      const { items } = await useMetaDataApi.index({
        type: MetaDataType.PARCEL_STATUS,
        list: true,
      });
      statusList.value = items;
    });
    const updatePkg = async () => {
      await useSiteDataApi.save(
        form.value.id,
        {
          data: {
            slug: SiteData.ParcelData,
            title: SiteData.ParcelData,
            content: {
              ...content.value,
              ...{ forms: forms.value, custom: true },
            },
          },
        },
        {
          success: "Saved",
        }
      );
    };
    return {
      statusList,
      forms,
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
