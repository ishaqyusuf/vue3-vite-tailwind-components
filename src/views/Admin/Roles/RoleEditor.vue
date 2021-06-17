<template>
  <Container class="space-y-4">
    <div class="space-y-2">
      <div class="inline-flex items-center">
        <router-link :to="{ name: 'roles' }">
          <i-mdi-arrow-left />
        </router-link>
        <CardTitle>{{ pageTitle }}</CardTitle>
      </div>
      <Input grid label="Role Title" v-model="title" />
      <div class="flex justify-between items-center">
        <Checkbox
          label="Select All"
          @change="toggleCheckAll"
          v-model="checkAll"
        />
        <Btn :action="save" async>Save</Btn>
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
import alert from "@/hooks/alert";
import router from "@/router";
import { useRolesApi } from "@/use/api/use-api";
import useList from "@/use/useList";
import { ref, onMounted } from "vue";
import useRoles from "./use-roles";

export default {
  props: {
    slug: String,
  },
  setup(props, { emit }) {
    const title = ref<any>();
    const pageTitle = ref("Create Role");
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

    onMounted(async () => {
      let actions = [];
      if (props.slug != "new") {
        const { title: _title, actions: _actions } = await useRolesApi.get(
          props.slug
        );
        pageTitle.value = title.value = _title;
        actions = _actions;
      }

      list.refresh(useRoles.initializeRoleTable(actions));
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
    async function save() {
      if (!title.value || title.value == "new") {
        alert.error("Invalid Role Title");
        return;
      }
      let actions = useRoles.extractActions(list.items.value);
      if (actions.length == 0) {
        alert.error("Select atleast one permission for this role");
        return;
      }
      const data = await useRolesApi.save(
        props.slug != "new" && props.slug,
        {
          data: {
            title: title.value,
            actions,
          },
        },
        { success: "Saved", error: "Unable to complete", showError: true }
      );

      if (data.slug != props.slug)
        router.push({ name: "role", params: { slug: data.slug } });

      // list.refresh(useRoles.initializeRoleTable(actions));
    }
    return {
      save,
      pageTitle,
      toggleCheckAll,
      permissionChanged,
      toggleAllPermission,
      checkAll,
      list,
      structure,
      title,
    };
  },
};
</script>

<style scoped></style>
