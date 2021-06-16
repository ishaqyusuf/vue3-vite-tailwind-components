<template>
  <div>
    <Prompt
      v-model="show"
      @closed="closeEditor"
      ok="Create"
      pilot
      container-class="max-w-xl bg-white"
      no-action
      :title="title"
    >
      <template #info>
        <div class="p-4 max-h-96 overflow-auto">
          <div class="space-y-2">
            <Input label="Role Title" v-model="form.title" />
            <div class="flex justify-between items-center">
              <Checkbox label="Check All" v-model="checkAll" />
              <Btn>Save</Btn>
            </div>
          </div>
          <Table :use-list="list" :structure="structure"></Table>
        </div>
      </template>
    </Prompt>
  </div>
</template>

<script lang="ts">
import { TableStructure } from "@/@types/Interface";
import time from "@/hooks/time";
import useShipmentsApi from "@/use/api/use-shipments-api";
import useList from "@/use/useList";
import { ref } from "vue";

export default {
  props: {},
  setup(props, { emit }) {
    const form = ref<any>({});
    const checkAll = ref<boolean>();

    const list = useList();
    list.initialize();

    const structure: TableStructure[] = [
      { title: "Permission", name: "permission" },
      { title: "All", name: "all" },
      { title: "Create", name: "all" },
      { title: "Read", name: "read" },
      { title: "Update", name: "update" },
      { title: "Delete", name: "delete" },
    ];

    const resolver = ref();
    const title = ref();
    const rejecter = ref();
    const editShipment = async (shipment: any = {}, list = null) => {
      title.value = shipment.title ?? "Create Role";
      return new Promise((resolve, reject) => {
        resolver.value = resolve;
        rejecter.value = reject;
        show.value = true;
      });
    };
    const saveShipment = async () => {
      const formData = {
        data: form.value,
      };
      const id = form.value.id;
      const data = (await id)
        ? useShipmentsApi.update(id, formData)
        : useShipmentsApi.create(formData);
      resolver.value(data);
      show.value = false;
    };
    const show = ref(false);
    const closeEditor = () => {
      resolver.value(null);
      show.value = false;
    };
    return {
      title,
      checkAll,
      list,
      structure,
      form,
      show,
      closeEditor,
      editShipment,
      saveShipment,
    };
  },
};
</script>

<style scoped></style>
