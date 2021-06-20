<template>
  <Container class="relative space-y-2">
    <div class="inline-flex justify-between items-center w-full">
      <CardTitle dense class="capitalize">{{
        isClient ? "Clients" : "Employees"
      }}</CardTitle>
      <div class="inline-flex items-center space-x-2">
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
      v-if="initialized"
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
      <template v-slot:user="{ item, header }">
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
      <template v-slot:position="{ item, header }">
        <div class="cursor-pointer" @click="list.execute('updateRole', item)">
          <span v-if="item.position">{{ item.position }}</span>
          <Btn dense v-else>Set Role</Btn>
        </div>
      </template>
      <template v-slot:more-actions="{ item, header }">
        <Btn dense large icon @click="list.execute('userForm', item)">
          <i-carbon-edit />
        </Btn>
      </template>
      <template v-slot:menu-items="{ item }">
        <MenuItem @click="list.execute('updateRole', item)">
          <i-carbon-inventory-management class="mr-3" />
          Update Role</MenuItem
        >
        <MenuItem @click="list.execute('updatePassword', item)">
          <i-carbon-password class="mr-3" />
          Update Password</MenuItem
        >
      </template>
    </Table>
    <UserList ref="userls" title="Select Client"></UserList>
    <UserForm
      :title="formConfig.title"
      :employee-data="formConfig.eData"
      :password-update="formConfig.password"
      :with-role="!isClient"
      ref="userForm"
    ></UserForm>
    <Pager :data="pager" simple />
  </Container>
  <!-- <Container class="space-y-4" -->
</template>

<script lang="ts">
import { onMounted, ref, watch } from "vue";
import useUserList from "./use-user-list";
import Exporter from "@/components/import/Exporter.vue";
import UserList from "../Components/UserList.vue";
import UserForm from "@/views/Admin/Components/UserForm.vue";
import useRouteData from "@/use/use-route-data";
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
    onMounted(() => {
      useUserList.initialize(props.mode);
    });
    watch(useRouteData, (value, oldValue) => {
      useUserList.initialize(value.params.mode);
    });
    return {
      ...useUserList,
    };
  },
};
</script>

<style scoped></style>
