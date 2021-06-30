<template>
  <div>
    <Prompt
      v-model="show"
      @closed="selectUser(null, null)"
      cancelable
      no-action
      :title="title"
    >
      <template #info>
        <div class="space-y-2">
          <div
            class="w-full px-4 py-2 bg-gray-100 inline-flex space-x-2 items-center"
          >
            <Input
              dense
              class="w-full"
              v-model="search"
              placeholder="Search user"
            />
            <Btn @click="openUserForm">
              <i-mdi-plus />
              New
            </Btn>
          </div>
          <div class="max-h-96 overflow-auto">
            <div class="divide-y flex flex-col px-4">
              <UserListItem
                class="p-2"
                @selected="selectUser"
                :contacts="contacts"
                :data-id="id"
                :ls-hook="listHook"
                v-for="(id, index) in listHook.ids.value"
                :key="index"
              ></UserListItem>
            </div>
          </div>
        </div>
      </template>
    </Prompt>
    <UserForm
      title="Create User"
      @back="closeUserForm"
      address-mode
      ref="userForm"
      can-go-back
    ></UserForm>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, watch } from "vue";
import useList from "@/use/useList";
import usersHook from "@/hooks/users";
import useDebounceRef from "@/use/useDebounceRef";
import UserListItem from "@/views/Admin/Components/UserListItem.vue";
import UserForm from "@/views/Admin/Components/UserForm.vue";
import { useAddressApi, useUsersApi } from "@/use/api/use-api";
export default {
  components: {
    UserListItem,
    UserForm,
  },
  props: {
    title: { default: "" },
    query: Object,
    contacts: Boolean,
  },
  setup(props, { emit }) {
    const listHook = useList();
    listHook.initialize();
    const show = ref(false);
    const search = useDebounceRef("", 300, false);
    const resolver = ref();
    const rejecter = ref<any>();
    const loadUsers = async () => {
      const api: any = props.contacts ? useAddressApi : useUsersApi();
      const { items, pager } = await api.index({
        ...(props.query ?? {}),
        q: search.value,
        finder: true,
      });
      // await usersHook.getUsers({
      //   ...(props.query ?? {}),
      //   q: search.value,
      // });
      listHook.refresh(items);
    };
    const open = async (id = null) => {
      return new Promise((resolve, reject) => {
        resolver.value = resolve;
        rejecter.value = reject;
        if (id == null) loadUsers();
        else openUserForm(id);
        show.value = true;
      });
    };
    const userForm = ref();
    const openUserForm = (id = null) => {
      show.value = false;
      console.log(id);
      userForm.value.open(id).then((user) => {
        show.value = true;
        if (user) {
          selectUser(user.id, user);
        }
      });
    };
    const closeUserForm = () => {
      show.value = false;
    };
    watch(search, (value, oldVal) => {
      loadUsers();
    });
    onMounted(() => {});
    const selectUser = (id, user) => {
      if (user) resolver.value(user);
      else rejecter.value(null);
      show.value = false;
    };
    return {
      userForm,
      closeUserForm,
      openUserForm,
      show,
      listHook,
      search,
      open,
      selectUser,
    };
  },
};
</script>

<style scoped></style>
