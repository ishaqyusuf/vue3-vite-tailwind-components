<template>
  <DopeCard title="Address List" subtitle="List of all your address">
    <CardContent class="space-y-2">
      <div class="inline-flex w-full justify-end">
        <Btn @click="openUserForm">
          <i-mdi-plus />
          New Address
        </Btn>
      </div>
      <StandardTable
        deletable
        no-head
        dense
        action
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
        <template v-slot:more-actions="{ item, header }">
          <Btn dense secondary @click="list.execute('editAddress', item)">
            Edit
          </Btn>
        </template>
      </StandardTable>
    </CardContent>
    <UserForm title="Address" address-mode ref="userForm"></UserForm>
  </DopeCard>
</template>

<script lang="ts">
import { TableStructure } from "@/@types/Interface";
import useSmartApi from "@/use/api/use-smart-api";
import useAddress from "@/use/api/useAddress";
import useList from "@/use/useList";
import { ref, onMounted } from "vue";
import DopeCard from "@/views/Settings/DopeCard.vue";
import UserForm from "@/views/Admin/Components/UserForm.vue";
export default {
  props: {},
  components: { DopeCard, UserForm },
  setup(props, { emit }) {
    const list = useList();
    list.initialize([], useAddress.transform, {
      delete: async (id) => {},
      editAddress: async (item) => {
        openUserForm(item);
      },
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
    const userForm = ref();
    const openUserForm = (form = {}) => {
      userForm.value.open(form).then((address) => {
        list.updateItem(address.id, address, true);
      });
    };
    return {
      openUserForm,
      userForm,
      list,
      structure,
    };
  },
};
</script>

<style scoped></style>
