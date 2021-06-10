<template>
  <div class="">
    <div class="" v-if="editMode || dataId < 1">
      <Input v-model="form.title">
        <template #appendOuter>
          <div
            class="p-2 w-10 rounded-full h-10"
            :class="[`bg-${form.content}-600`]"
          ></div>
        </template>
      </Input>
    </div>
    <div
      class="p-2 cursor-default inline-flex justify-between items-center"
      v-else
    >
      <span
        class="px-1 rounded-lg"
        :class="[`text-${item.color}-700 bg-${item.color}-100`]"
        >{{ item.status }}</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { pick } from "lodash";
import { useListPropType } from "@/hooks/table";
export default {
  props: {
    dataId: { type: Number, required: true },
    useList: useListPropType(),
  },
  setup(props, { emit }) {
    const item = computed(() => props.useList.itemsById[props.dataId]);
    const editMode = ref(false);
    const form = ref<any>({});
    const editItem = () => {
      form.value = pick(item.value ?? {}, ["title", "content", "id"]);
    };
    return {
      editItem,
      editMode,
      item,
      form,
    };
  },
};
</script>

<style scoped></style>
