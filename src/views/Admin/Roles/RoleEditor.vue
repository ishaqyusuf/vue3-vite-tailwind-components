<template>
  <Container class="space-y-4">
    <div class="space-y-2">
      <Input grid label="Role Title" v-model="form.title" />
      <div class="flex justify-between items-center">
        <Checkbox
          label="Select All"
          @change="toggleCheckAll"
          v-model="checkAll"
        />
        <Btn>Save</Btn>
      </div>
    </div>
    <Table :use-list="list" :structure="structure">
      <template v-slot:all="{ item }">
        <Checkbox @change="toggleAllPermission(item)" v-model="item.all" />
      </template>
      <template v-slot:create="{ item }">
        <Checkbox
          @change="permissionChanged(item)"
          v-model="item.action.create"
        />
      </template>
      <template v-slot:update="{ item }">
        <Checkbox
          @change="permissionChanged(item)"
          v-model="item.action.update"
        />
      </template>
      <template v-slot:delete="{ item }">
        <Checkbox
          @change="permissionChanged(item)"
          v-model="item.action.delete"
        />
      </template>
      <template v-slot:read="{ item }">
        <Checkbox
          @change="permissionChanged(item)"
          v-model="item.action.read"
        />
      </template>
    </Table>
  </Container>
</template>

<script lang="ts">
import { TableStructure } from "@/@types/Interface";
import useList from "@/use/useList";
import { ref, onMounted } from "vue";
import useRoles from "./use-roles";

export default {
  props: {},
  setup(props, { emit }) {
    const form = ref<any>({});
    const checkAll = ref<boolean>();

    const list = useList();
    list.initialize();

    const structure: TableStructure[] = [
      { title: "Permission", fontMedium: true, name: "title" },
      { title: "All", name: "all", textCenter: true },
      { title: "Create", name: "create", textCenter: true },
      { title: "Read", name: "read", textCenter: true },
      { title: "Update", name: "update", textCenter: true },
      { title: "Delete", name: "delete", textCenter: true },
    ];

    onMounted(() => {
      list.refresh(useRoles.initializeRoleTable());
    });
    function permissionChanged(item) {
      item.all = Object.values(item.action).every(Boolean);
    }
    function toggleAllPermission(item) {
      Object.keys(item.action).map(
        (action) => (item.action[action] = item.all)
      );
    }

    function toggleCheckAll() {
      list.items.value.map((item) => {
        item.all = checkAll.value;
        toggleAllPermission(item);
      });
    }
    return {
      toggleCheckAll,
      permissionChanged,
      toggleAllPermission,
      checkAll,
      list,
      structure,
      form,
    };
  },
};
</script>

<style scoped></style>
