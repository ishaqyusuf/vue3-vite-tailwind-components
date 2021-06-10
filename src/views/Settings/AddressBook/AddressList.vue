<template>
  <div>
    <Table
      :deletable="!picker"
      no-head
      dense
      :action="!picker"
      @selected="selected"
      selector
      vintage
      :use-list="list"
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
    </Table>
    <UserForm title="Address" address-mode ref="userForm"></UserForm>
  </div>
</template>

<script lang="ts">
import useAddressBook from "@/use/list/use-address-book";
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
    onMounted(async () => {
      await useAddressBook.init();
    });
    const selected = (rowId) => {
      emit("addressSelected", rowId);
    };
    return {
      selected,
      ...useAddressBook,
    };
  },
};
</script>

<style scoped></style>
