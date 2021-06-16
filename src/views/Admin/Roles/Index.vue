<template>
  <Container class="space-y-4">
    <div class="inline-flex justify-between w-full items-center">
      <CardTitle>Roles</CardTitle>
      <div class="inline-flex space-x-2">
        <router-link :to="{ name: 'role', params: { slug: 'new' } }">
          <Btn>
            <i-mdi-plus />
            <span>New Role</span>
          </Btn>
        </router-link>
      </div>
    </div>
    <Table
      checkable
      action
      hide-actions
      dense
      deletable
      :use-list="listr"
      hide-checks
      more-action
      :structure="structure"
    ></Table>
  </Container>
</template>

<script lang="ts">
import useShipmentsList from "@/use/list/use-shipments-list";
import useList from "@/use/useList";
import RoleEditorBtn from "@/views/Admin/Roles/RoleEditorBtn.vue";
import { onMounted } from "vue";
import useRoles from "./use-roles";
export default {
  components: {
    RoleEditorBtn,
  },
  props: {},
  setup(props, { emit }) {
    const listr = useList();
    listr.initialize(
      [],
      useShipmentsList.transformer,
      useShipmentsList.actions
    );
    onMounted(() => {});
    return {
      listr,
      ...useShipmentsList,
    };
  },
};
</script>

<style scoped></style>
