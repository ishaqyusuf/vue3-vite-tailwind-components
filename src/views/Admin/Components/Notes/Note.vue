<template>
  <div class="">
    <div class="space-y-1 py-4" v-if="dataId < 0">
      <Input textarea placeholder="Type here" label="New Note" v-model="note" />
      <div class="flex justify-end">
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
          <Btn confirm :action="deleteNote" icon async>
            <i-mdi-pencil-outline />
          </Btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useNotes from "@/use/api/useNotes";
import FileUploader from "@/views/Admin/Components/Documents/FileUploader.vue";
import { computed, ref, watch } from "vue";
export default {
  components: {
    FileUploader,
  },
  props: {
    dataId: { type: Number, required: true },
    useList: { type: Object, required: true },
    type: {
      type: String,
      required: true,
      validator(val) {
        return ["parcel", "shipment", "document"].includes(val);
      },
    },
    parentId: { type: Number, required: true },
  },
  setup(props, { emit }) {
    const item = computed(() => props.useList.itemByIds.value[props.dataId]);

    const saveNote = async () => {
      const slug = props.dataId > 0 && item.value.id;
      const _note = await useNotes.saveNote(
        {
          data: {
            content: note.value,
            post_parent: props.parentId,
            type: props.type,
          },
        },
        slug
      );
      props.useList.updateItem(_note.id, _note, false);
      note.value = "";
    };
    const note = ref("");
    const deleteNote = async () => {
      await useNotes.deletNote(item.value.id);
      // alert.success("Document has been deleted.");
      props.useList.deleteItem(props.dataId);
    };

    return {
      note,
      saveNote,
      deleteNote,
      item,
    };
  },
};
</script>

<style scoped></style>
