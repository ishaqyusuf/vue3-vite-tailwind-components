<template>
  <div class="">
    <div class="space-y-1 py-4" v-if="dataId < 0 || editMode">
      <Input
        textarea
        placeholder="Type here"
        :label="editMode ? null : 'New Note'"
        v-model="note"
      />
      <div class="flex justify-end space-x-1">
        <Btn secondary color="red-400" v-if="editMode" @click="closeEditor"
          >Cancel</Btn
        >
        <Btn async :action="saveNote">Save</Btn>
      </div>
    </div>

    <div class="p-2 rounded-md space-y-2 bg-purple-200" v-else>
      <span>{{ item.content }}</span>
      <div class="flex justify-between font-semibold text-sm space-x-2">
        <span class="uppercase">
          {{ $dayjs.readable(item.created_at) }}
        </span>
        <div class="inline-flex space-x-2">
          <Btn confirm :action="deleteNote" icon async>
            <i-mdi-trash-can-outline />
          </Btn>
          <Btn @click="editNote" icon>
            <i-mdi-pencil-outline />
          </Btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useListPropType } from "@/hooks/table";
import useNotes from "@/use/api/useNotes";
import FileUploader from "@/views/Admin/Components/Documents/FileUploader.vue";
import { computed, ref } from "vue";
export default {
  components: {
    FileUploader,
  },
  props: {
    parent: { type: Object, required: true },
    dataId: { type: Number, required: true },
    useList: useListPropType(),
  },
  setup(props, { emit }) {
    const item = computed(() => props.useList.itemsById.value[props.dataId]);

    const saveNote = async () => {
      if (!note.value) return;
      const slug = props.dataId > 0 && item.value.id;
      const _note = await useNotes.saveNote(
        {
          data: {
            content: note.value,
            ...props.parent,
          },
        },
        slug
      );
      props.useList.updateItem(_note.id, _note, false);
      note.value = "";
      closeEditor();
    };
    const note = ref("");
    const deleteNote = async () => {
      const _item = item.value;
      await useNotes.deleteNote(_item.id);
      props.useList.deleteItem(_item);
    };
    const editMode = ref(false);
    const editNote = () => {
      note.value = item.value.content;
      editMode.value = true;
    };
    const closeEditor = () => {
      editMode.value = false;
    };
    return {
      editMode,
      closeEditor,
      editNote,
      note,
      saveNote,
      deleteNote,
      item,
    };
  },
};
</script>

<style scoped></style>
