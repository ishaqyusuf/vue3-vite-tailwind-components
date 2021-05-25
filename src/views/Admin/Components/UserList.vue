<template>
  <Prompt v-model="show" cancelable no-action :title="title">
    <template #info>
      <div class="space-y-2">
        <div class="w-full bg-gray-100 inline-flex space-x-2 items-center">
          <Input
            dense
            class="w-full"
            v-model="search"
            placeholder="Search user"
          />
          <Btn dense>
            <i-mdi-plus />
            New
          </Btn>
        </div>
        <div class="divide-y flex flex-col max-h-96 overflow-auto">
          <UserListItem
            class="p-2"
            @selected="selectUser"
            :data-id="id"
            :ls-hook="listHook"
            v-for="(id, index) in listHook.ids.value"
            :key="index"
          ></UserListItem>
        </div>
      </div>
    </template>
  </Prompt>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import useList from "@/use/useList";
import usersHook from "@/hooks/users";
import UserListItem from "@/views/Admin/Components/UserListItem.vue";
export default {
  components: {
    UserListItem,
  },
  props: {
    title: { default: "" },
    query: Object,
  },
  setup(props, { emit }) {
    const listHook = useList();
    listHook.initialize();
    const show = ref(true);
    const search = ref("");
    const resolver = ref();

    const loadUsers = async () => {
      const { items, pager } = await usersHook.getUsers({
        ...(props.query ?? {}),
        q: search.value,
      });
      listHook.refresh(items);
    };
    const open = async () => {
      return new Promise((resolve, reject) => {
        resolver.value = resolve;
        show.value = true;
      });
    };
    onMounted(() => {
      loadUsers();
    });

    return {
      show,
      listHook,
      search,
      open,
      selectUser: (id, user) => {
        // emit("selected", id, user);
        resolver.value(user);
        show.value = false;
      },
    };
  },
};
</script>

<style scoped></style>
