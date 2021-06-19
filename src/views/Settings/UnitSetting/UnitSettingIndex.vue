<template>
  <DopeCard
    title="Units & Currency"
    subtitle="Default units and currencies to be used across the entire system"
  >
    <div class="space-y-4">
      <CardContent class="space-y-4">
        <Input
          grid
          :items="currencyList"
          item-text="title"
          item-value="unit_str"
          v-model="content.primary_currency"
          select
          label="Primary Currency"
        />
        <Input
          grid
          :items="weights"
          item-text="title"
          item-value="unit"
          v-model="content.weight"
          select
          label="Weight Unit"
        />
        <Input
          grid
          :items="dims"
          item-text="title"
          item-value="unit"
          v-model="content.dimension"
          select
          label="Dimension Unit"
        />
      </CardContent>
      <CardActions>
        <Btn async :action="save">Save</Btn>
      </CardActions>
    </div>
  </DopeCard>
</template>

<script lang="ts">
import DopeCard from "@/views/Settings/DopeCard.vue";
import { onMounted, ref } from "vue";
import { MetaDataType, useMetaApi } from "@/use/api/use-meta-data-api";
import { currencies } from "@/use/use-currency";
import CardActions from "@/components/shared/Card/CardActions.vue";
import useUnits from "@/use/use-units";
export default {
  props: {
    type: String,
    title: String,
    subtitle: String,
  },
  components: {
    DopeCard,
    CardActions,
  },
  setup(props, { emit }) {
    const useUnitApi = useMetaApi(MetaDataType.UNIT_SYSTEM);
    const currencyList = ref<any>(currencies());
    const id = ref<any>();
    const content = ref<any>({});
    onMounted(async () => {
      const _data = await useUnitApi.index({ single: true });
      if (_data.data) content.value = _data.data;
      id.value = _data.id;
    });
    const save = async () => {
      await useUnitApi.save(
        id.value,
        { data: { content: content.value }, skip_check: true },
        {
          success: "Saved",
          showError: true,
          onSuccess: (_data) => {
            id.value = _data.id;
          },
        }
      );
    };
    return {
      save,
      currencyList,
      content,
      id,
      MetaDataType,
      ...useUnits,
    };
  },
};
</script>

<style scoped></style>
