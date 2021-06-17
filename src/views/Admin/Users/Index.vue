<template>
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
  </Table>

  <Pager :data="pager" simple />
  <!-- <Container class="space-y-4" -->
</template>

<script lang="ts">
import PagerInterface from "@/@types/PagerInterface";
import { onMounted, ref } from "vue";
import { userList } from "./use-user-list";

export default {
  props: {
    mode: String,
  },
  setup(props, { emit }) {
    const useUsers = userList(props.mode);
    const pager = ref<PagerInterface>({});
    onMounted(async () => {
      const data = await useUsers.api.index();
      console.log(data);
      useUsers.list.refresh(data.items);
    });
    return {
      pager,
      ...useUsers,
    };
  },
};
</script>

<style scoped></style>
