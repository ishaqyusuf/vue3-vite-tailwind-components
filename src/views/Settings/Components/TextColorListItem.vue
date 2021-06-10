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
  </div>
</template>

<script lang="ts">
import { IUseList } from "@/@types/Interface";
import { computed, PropType, ref } from "vue";
import { pick } from "lodash";
export default {
  props: {
    dataId: { type: Number, required: true },
    useList: { type: Object as PropType<IUseList>, required: true },
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
