<template>
  <DopeCard
    title="Default Invoice Setting"
    subtitle="default invoice configuration for parcel and accounting"
  >
    <div class="space-y-4">
      <Input
        select
        grid
        :items="items"
        item-text="title"
        item-value="id"
        v-model="invoice.post_parent"
        label="Default Template"
      ></Input>
      <CardActions pilot>
        <Btn async :action="saveInvoice">Save</Btn>
      </CardActions>
    </div>
  </DopeCard>
  <DopeCard
    title="Invoice Templates"
    subtitle="Create multiple reusable invoice templates"
  >
    <template #action>
      <Btn @click="openInvoiceTemplateForm(null)">
        <i-mdi-plus />
        New Template
      </Btn>
    </template>
    <Table
      vintage
      :structure="structure"
      editable
      action
      :use-list="list"
      no-head
      deletable
    >
      <template #invoice="{ item, header }">
        <span>{{ item.title }}</span>
      </template>
      <template #edit-btn="{ item }">
        <Btn dense icon large @click="openInvoiceTemplateForm(item.slug)">
          <i-mdi-pencil-box-multiple-outline />
        </Btn>
      </template>
    </Table>
    <InvoicePrompt ref="invoiceTemplate"></InvoicePrompt>
  </DopeCard>
</template>

<script lang="ts">
import { TableStructure } from "@/@types/Interface";
import useInvoiceTemplateApi from "@/use/api/use-invoice-template-api";
import useList from "@/use/useList";
import { ref, onMounted } from "vue";
import DopeCard from "../DopeCard.vue";
import InvoicePrompt from "./InvoicePrompt.vue";
import CardTitle from "@/components/shared/Card/CardTitle.vue";
import { MetaDataType, useMetaApi } from "@/use/api/use-meta-data-api";

export default {
  props: {},
  setup(props, { emit }) {
    const list = useList();
    list.initialize([], (item, trans) => trans, {
      delete: async (item) => {
        await useInvoiceTemplateApi.delete(item.slug);
      },
    });
    const invoice = ref<any>({});
    const useInvoiceApi = useMetaApi(MetaDataType.DEFAULT_INVOICE);
    onMounted(async () => {
      const { items } = await useInvoiceTemplateApi.index({ list_mode: true });
      list.refresh(items);
      const inv = await useInvoiceApi.index({ single: true });
      invoice.value = inv;
    });
    const invoiceTemplate = ref();
    const structure = ref<TableStructure[]>([
      {
        name: "invoice",
      },
    ]);
    const openInvoiceTemplateForm = (slug = null) => {
      invoiceTemplate.value.open(slug);
    };
    const saveInvoice = async () => {
      const data = invoice.value;
      await useInvoiceApi.save(
        data.id,
        { data },
        {
          showError: true,
          success: "Saved!",
          onSuccess: (_data) => {
            invoice.value.id = _data.id;
          },
        }
      );
    };
    return {
      openInvoiceTemplateForm,
      invoiceTemplate,
      ...list,
      list,
      structure,
      invoice,
      saveInvoice,
    };
  },
  components: { DopeCard, InvoicePrompt, CardTitle },
};
</script>

<style scoped></style>
