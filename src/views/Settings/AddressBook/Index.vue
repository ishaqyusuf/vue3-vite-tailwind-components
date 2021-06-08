<template>
  <DopeCard title="Address List" subtitle="">
    <CardContent class="py-2">
      <StandardTable
        deletable
        no-header
        dense
        :worker="list"
        :structure="structure"
      >
        <template v-slot:main="{ item, header }">
          <div class="">
            <span class="text-md font-semibold text-gray-700">
              {{ item.name }}
            </span>
            <Truncify>{{ item.address_1 }}</Truncify>
            <Truncify>{{ item.line_1 }}</Truncify>
          </div>
        </template>
      </StandardTable>
    </CardContent>
  </DopeCard>
</template>

<script lang="ts">
import { TableStructure } from "@/@types/Interface";
import useSmartApi from "@/use/api/use-smart-api";
import useAddress from "@/use/api/useAddress";
import useList from "@/use/useList";
import { ref, onMounted } from "vue";

export default {
  props: {},
  setup(props, { emit }) {
    const list = useList();
    list.initialize([], useAddress.transform, {
      delete: async (id) => {},
    });
    onMounted(async () => {
      const addressBook = await useSmartApi.request("get", "address-book", {
        all_books: true,
      });
      list.refresh(addressBook.items);
    });
    const structure: TableStructure[] = [
      {
        name: "main",
      },
    ];
    return {
      list,
      structure,
    };
  },
};
</script>

<style scoped></style>
