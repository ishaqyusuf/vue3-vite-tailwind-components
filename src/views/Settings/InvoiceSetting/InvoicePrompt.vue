<template>
  <Prompt
    v-model="show"
    cancelable
    action
    hide-cancel
    ok="Save"
    :ok-action="save"
    title="Invoice Template"
  >
    <template #info>
      <CardContent class="py-4">
        <InvoiceTemplateForm v-model="formData"></InvoiceTemplateForm
      ></CardContent>
    </template>
  </Prompt>
</template>

<script lang="ts">
import { useListPropType } from "@/hooks/table";
import useInvoiceTemplateApi from "@/use/api/use-invoice-template-api";
import { useMetaApi, MetaDataType } from "@/use/api/use-meta-data-api";
import { ref } from "vue";
import InvoiceTemplateForm from "./InvoiceTemplateForm.vue";
import useMetaLoader from "@/use/api/use-meta-loader";
export default {
  components: { InvoiceTemplateForm },
  props: {
    useList: useListPropType(),
  },
  setup(props, { emit }) {
    const show = ref(false);
    const formData = ref<any>({});
    const resolver = ref();
    const open = async (slug = null) => {
      if (slug)
        await useInvoiceTemplateApi.get(
          slug,
          {},
          {
            onSuccess: (data) => {
              formData.value = data;
            },
          }
        );
      // await useMetaLoader.units()
      return new Promise((resolve) => {
        resolver.value = resolver;
        show.value = true;
      });
    };
    const save = async () => {
      const data = formData.value;
      await useInvoiceTemplateApi.save(
        data.slug,
        { data },
        {
          showError: true,
          error: "Unable to complete",
          onSuccess: (result) => {
            resolver.value();
          },
        }
      );
    };
    return {
      open,
      save,
      formData,
      show,
    };
  },
};
</script>

<style scoped></style>
