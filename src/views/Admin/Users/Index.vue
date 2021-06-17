<template>
  <Container class="space-y-4 relative">
    <div class="inline-flex justify-between items-center w-full">
      <div class="text-2xl font-bold text-gray-700">
        <Truncify class="capitalize">{{ mode }}</Truncify>
      </div>
      <div class="inline-flex space-x-2">
        <div class="inline-flex rounded-lg border divide-x bg-white">
          <Exporter>
            <template #btn="{ open }">
              <Btn tertiary @click="open(exportConfig)">
                <i-fe-export />
              </Btn>
            </template>
          </Exporter>
          <Btn tertiary>
            <i-fe-import />
          </Btn>
        </div>
        <Btn @click="list.execute('userForm')">
          <i-mdi-account-plus-outline />
          <span class="capitalize"
            >New {{ isClient ? "Client" : "Employee" }}</span
          >
        </Btn>
      </div>
    </div>
    <Pager :data="pager" />

    <Table
      :structure="structures"
      checkable
      action
      hide-actions
      dense
      deletable
      :use-list="list"
      hide-checks
      more-action
    >
      <template v-slot:user="{ item }">
        <router-link
          class="hover:text-blue-600"
          :to="{
            name: 'user',
            params: { mode, slug: item.id },
          }"
        >
          <span class="block font-medium">{{ item.full_name }}</span>
          <span class="text-gray-500" v-if="item.email">{{ item.email }}</span>
        </router-link>
      </template>
      <template v-slot:more-actions="{ item, header }">
        <Btn dense large icon @click="list.execute('userForm', item)">
          <i-carbon-edit />
        </Btn>
      </template>
    </Table>
    <UserList ref="userls" title="Select Client"></UserList>
    <UserForm title="User Form" ref="userForm"></UserForm>
    <Pager :data="pager" simple />
  </Container>
  <!-- <Container class="space-y-4" -->
</template>

<script lang="ts">
import PagerInterface from "@/@types/PagerInterface";
import { onMounted, ref } from "vue";
import { userList } from "./use-user-list";
import Exporter from "@/components/import/Exporter.vue";
import { useExport } from "@/use/data/use-export";
import UserList from "../Components/UserList.vue";
import UserForm from "@/views/Admin/Components/UserForm.vue";
export default {
  components: {
    Exporter,
    UserForm,
    UserList,
  },
  props: {
    mode: String,
  },
  setup(props, { emit }) {
    const useUsers = userList(props.mode);
    const pager = ref<PagerInterface>({});
    const exportConfig = useExport(useUsers.structures);

    onMounted(async () => {
      const data = await useUsers.api.index();
      console.log(data);
      useUsers.list.refresh(data.items);
      pager.value = data.pager;
    });
    return {
      pager,
      exportConfig,
      ...useUsers,
    };
  },
};
</script>

<style scoped></style>
