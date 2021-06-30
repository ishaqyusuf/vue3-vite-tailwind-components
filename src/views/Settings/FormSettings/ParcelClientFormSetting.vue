<template>
  <DopeCard
    title="Parcel Client Form and Data"
    subtitle="Setup default parcel client form and data"
  >
    <CardContent class="space-y-4">
      <Input v-model="content.name" grid>
        <template #grid-label>
          <Checkbox label="Name" v-model="forms.name" />
        </template>
      </Input>
      <Input v-model="content.email" grid>
        <template #grid-label>
          <Checkbox label="Email" v-model="forms.email" />
        </template>
      </Input>
      <!-- <Input v-model="content.dimension" readonly grid label="Dimension"/> -->
      <Input
        v-model="content.country"
        auto-complete
        :items="geo.countries.value"
        @selected="geo.countryChange(content.country)"
        grid
      >
        <template #grid-label>
          <Checkbox label="Country" v-model="forms.country" />
        </template>
      </Input>
      <Input :prefix="content.phone.code" v-model="content.phone.no" grid>
        <template #grid-label>
          <Checkbox label="Phone" v-model="forms.dimension" />
        </template>
      </Input>
      <Input
        name="state"
        label="State"
        auto-complete
        grid
        :items="geo.states.value"
        @selected="geo.stateChange(content.state)"
        v-model="content.state"
      >
        <template #grid-label>
          <Checkbox label="State" v-model="forms.state" />
        </template>
      </Input>
      <Input
        name="city"
        label="City"
        :items="geo.cities.value"
        combobox
        grid
        v-model="content.city"
      >
        <template #grid-label>
          <Checkbox label="City" v-model="forms.city" />
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
import { useGeo } from "@/hooks/useGeo";
import useMetaDataApi, {
  MetaDataType,
  useMetaApi,
} from "@/use/api/use-meta-data-api";
export default {
  props: {},
  components: {
    DopeCard,
  },
  setup(props, { emit }) {
    const content = ref<any>({
      phone: {},
    });
    const forms = ref<any>({});
    const form = ref<any>({});
    const geo = useGeo();
    const metaApi = useMetaApi(MetaDataType.PARCEL_CLIENT_DATA, true);
    onMounted(async () => {
      const data = await metaApi.index();
      if (data) {
        form.value = data;
        var c = data.content?.data ?? {};
        if (!c.phone) c.phone = {};
        content.value = c;
        forms.value = data.content?.forms ?? {};
      }
      const { country, state, city } = content.value;
      geo.initialize(
        {
          country,
          state,
          city,
        },
        {},
        (country) => (content.value.phone.code = country.code)
      );
    });
    const updatePkg = async () => {
      await metaApi.save(
        form.value.id,
        {
          data: {
            content: {
              ...{ data: content.value },
              ...{ forms: forms.value, custom: true },
            },
          },
        },
        {
          success: "Saved",
          showError: true,
        }
      );
    };
    return {
      forms,
      geo,
      updatePkg,
      content,
      form,
    };
  },
};
</script>

<style scoped></style>
