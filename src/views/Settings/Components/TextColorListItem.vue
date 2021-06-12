<template>
  <div class="">
    <div
      class="inline-flex relative w-full p-4 pt-6 bg-gray-100 items-center justify-between"
      v-if="editMode || dataId < 1"
    >
      <Btn
        @click="editMode = false"
        v-if="dataId > 0"
        class="absolute inset-0 p-1 right-0 left-auto"
        icon
        ><i-mdi-close
      /></Btn>
      <div class="inline-flex items-end space-x-2">
        <Input label="Status" dense v-model="form.status" />
        <Input
          select
          dense
          label="Color"
          :items="['blue', 'black', 'gray', 'red', 'yellow', 'purple', 'green']"
          v-model="form.color"
        />
        <span
          class="px-1 rounded-md text-sm"
          :class="[`text-${form.color}-700 bg-${form.color}-100`]"
        >
          {{ form.status }}
        </span>
        <Btn async :action="saveItem">Save</Btn>
      </div>
    </div>
    <div
      class="p-3 w-full cursor-default inline-flex justify-between items-center"
      v-else
    >
      <span
        :class="[`text-${item.color}-700 bg-${item.color}-100`]"
        class="px-1 text-sm font-medium"
        >{{ item.status }}</span
      >
      <div class="inline-flex space-x-2">
        <Btn icon @click="editItem"><i-mdi-pencil /></Btn>
        <Btn icon async :action="deleteItem" confirm
          ><i-mdi-delete-outline
        /></Btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { pick } from "lodash";
import { useListPropType } from "@/hooks/table";
import useMetaDataApi from "@/use/api/use-meta-data-api";
export default {
  props: {
    dataId: { type: Number, required: true },
    useList: useListPropType(),
    type: String,
  },
  setup(props, { emit }) {
    const item = computed(() => props.useList.itemsById.value[props.dataId]);
    const editMode = ref(false);
    const form = ref<any>({
      type: props.type,
    });
    const editItem = () => {
      form.value = {
        type: props.type,
        ...pick(item.value ?? {}, ["color", "status", "id"]),
      };
      editMode.value = true;
    };
    const saveItem = async () => {
      const data = form.value;
      await useMetaDataApi.save(
        data.id,
        {
          data,
          type: props.type,
        },
        {
          showError: true,
          error: "Status already exists",
          success: "Saved.",
          onSuccess: (result) => {
            props.useList.updateItem(result.id, result, false);
            editMode.value = false;
            form.value = {
              type: props.type,
            };
          },
        }
      );
    };
    const deleteItem = async () => {
      props.useList.deleteItem(item.value);
    };
    return {
      saveItem,
      deleteItem,
      editItem,
      editMode,
      item,
      form,
    };
  },
};
</script>

<style scoped></style>
