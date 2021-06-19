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
      :use-list="list"
      hide-checks
      more-action
      :structure="structure"
    >
      <template v-slot:title="{ item }"> </template>
    </Table>
  </Container>
</template>

<script lang="ts">
import { TableStructure } from "@/@types/Interface";
import { useRolesApi } from "@/use/api/use-api";
import useList from "@/use/useList";
import { onMounted } from "vue";
export default {
  components: {},
  props: {},
  setup(props, { emit }) {
    const list = useList();
    list.initialize(
      [],
      (item, data) => {
        data.title_link = {
          name: "role",
          params: {
            slug: item.slug,
          },
        };
        return data;
      },
      {}
    );
    const structure: TableStructure[] = [
      { title: "Role", name: "title", fontMedium: true },
    ];
    onMounted(async () => {
      const data = await useRolesApi.index();
      list.refresh(data.items);
    });
    return {
      list,
      structure,
    };
  },
};
</script>

<style scoped></style>
