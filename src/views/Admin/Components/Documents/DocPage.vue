<template>
  <Loader v-if="ls.loading.value"></Loader>
  <div class="space-y-2 mx-4" v-else>
    <Doc
      :parent="parent"
      class="col-span-1 sm:col-span-4 xl:col-span-3"
      :data-id="-1"
      :use-list="ls"
    ></Doc>
    <Doc
      :parent="parent"
      class="col-span-1 sm:col-span-4 xl:col-span-3"
      :data-id="-1"
      :use-list="ls"
      v-for="(id, index) in ls.ids.value"
      :key="index"
    ></Doc>
    <EmptyContainer v-if="ls.ids.value.length == 0">
      <i-mdi-note-text class="text-6xl" />
    </EmptyContainer>
  </div>
</template>
<script lang="ts">
import useList from "@/use/useList";
import { ref, computed } from "vue";
import Doc from "./Doc.vue";
import EmptyContainer from "@/components/shared/EmptyContainer.vue";

export default {
  components: {
    Doc,
    EmptyContainer,
  },
  props: {},
  setup(props, { emit }) {
    const loading = ref(false);
    const ls = useList();

    const permission = ref();
    const parent = ref({});
    const init = async (slug, api, _permission) => {
      ls.initialize([]);
      const data = await api(slug, { notes: true });
      parent.value = data.parent;
      ls.refresh(data.items);
      permission.value = _permission;
    };
    return {
      parent,
      init,
      loading,
      isEditable: computed(() => permission.value),
      ls,
    };
  },
};
</script>

<style scoped></style>
