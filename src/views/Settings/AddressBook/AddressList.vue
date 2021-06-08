<template>
  <div>
    <StandardTable
      :deletable="!picker"
      no-head
      dense
      :action="!picker"
      vintage
      :worker="list"
      :structure="structure"
    >
      <template v-slot:main="{ item, header }">
        <div class="text-gray-600">
          <span class="text-base font-semibold text-gray-700">
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
    <UserForm title="Address" address-mode ref="userForm"></UserForm>
  </div>
</template>

<script lang="ts">
import { TableStructure, TableWorker } from "@/@types/Interface";
import useSmartApi from "@/use/api/use-smart-api";
import useAddress from "@/use/api/useAddress";
import useList from "@/use/useList";
import userAccount from "@/use/user-account";
import { ref, onMounted } from "vue";
import UserForm from "@/views/Admin/Components/UserForm.vue";
export default {
  components: {
    UserForm,
  },
  props: {
    picker: Boolean,
  },
  setup(props, { emit }) {
    const structure: TableStructure[] = [
      {
        name: "main",
      },
    ];
    const list = useList();
    const isAdmin = ref<boolean>();
    list.initialize([], useAddress.transform, {
      delete: async (item) => {
        await useSmartApi.request("delete", ["address-book", item.id]);
      },
      editAddress: async (item) => {
        openUserForm(item);
      },
    });
    onMounted(async () => {
      isAdmin.value = userAccount.can("readAdmin");
      const addressBook = await useSmartApi.request("get", "address-book", {
        all_books: true,
        department: isAdmin.value,
      });
      list.refresh(addressBook.items);
    });
    const userForm = ref();
    var usr = userAccount.user.value;
    const { full_name: name, email } = usr ?? {};
    const openUserForm = (
      form = {
        name,
        email,
        phone: {},
        user_id: isAdmin.value ? null : usr.id,
        type: isAdmin.value ? "department" : null,
      }
    ) => {
      userForm.value.open(form).then((address) => {
        list.updateItem(address.id, address, true);
      });
    };
    return {
      openUserForm,
      list,
      userForm,
      structure,
    };
  },
};
</script>

<style scoped></style>
