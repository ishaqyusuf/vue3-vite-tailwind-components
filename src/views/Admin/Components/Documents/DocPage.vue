<template>
  <Loader v-if="ls.loading.value"></Loader>
  <div class="grid grid-cols-1 sm:grid-cols-12 sm:gap-4" v-else>
    <Doc
      :parent="parent"
      class="col-span-1 sm:col-span-4 md:col-span-3 xl:col-span-2"
      :data-id="id"
      :use-list="ls"
      v-for="(id, index) in [-1, ...ls.ids.value]"
      :key="index"
    ></Doc>
    <EmptyContainer v-if="ls.ids.value.length == 0">
      <i-mdi-water-outline class="text-6xl" />
    </EmptyContainer>
  </div>
</template>
<script lang="ts">
import useList from "@/use/useList";
import { ref, computed } from "vue";
import Doc from "./Doc.vue";
import EmptyContainer from "@/components/shared/EmptyContainer.vue";
import { useFileFormat } from "@/use/use-file-format";
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
      const ff = useFileFormat();
      ls.initialize([], (item, res) => {
        const ft = item.title.split(".").pop();
        res[ff.get(ft)] = true;
        return res;
      });
      const data = await api(slug, { docs: true });
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
