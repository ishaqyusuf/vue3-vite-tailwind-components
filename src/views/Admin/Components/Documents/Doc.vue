<template>
  <Card class="h-48">
    <FileUploader @upload="uploadFile" v-if="dataId < 0">
      <template v-slot:default="{ active }">
        <div
          class="flex w-full flex-col items-center justify-center border-2 border-dashed"
          :class="{ 'border-green-400 text-green-400': active }"
        >
          <i-mdi-plus />
        </div>
      </template>
    </FileUploader>
    <CardContent
      class="h-full py-2 hover:glow-2 flex flex-col justify-between items-center group"
      v-else
    >
      <div
        class="flex w-full justify-between group-hover:opacity-100 opacity-s0"
      >
        <Btn icon confirm :action="deleteDocument" async>
          <i-mdi-trash-can-outline />
        </Btn>
        <Btn icon>
          <i-mdi-download />
        </Btn>
      </div>
      <div class="text-5xl">
        <i-mdi-pdf-box v-if="item.pdf" class="text-red-400" />
        <i-mdi-file-excel-outline class="text-green-400" v-if="item.excel" />
        <i-mdi-file-document-outline v-if="item.doc" />
        <i-mdi-file-image-outline v-if="item.img" />
        <i-mdi-file-powerpoint-outline v-if="item.ppt" />
        <i-mdi-file-word-outline v-if="item.word" />
        <i-mdi-file-video-outline v-if="item.video" />
        <i-mdi-xml v-if="item.code" />
        <!-- <i-mdi-file-multiple-outline /> -->
      </div>
      <!-- <i-mdi-file-delimited-outline v-if=""/>
      <i-mdi-file-excel-outline/>
      <i-mdi-file-document-outline/>
      <i-mdi-file-image-outline/>
      <i-mdi-file-powerpoint-outline/>
      <i-mdi-file-word-outline/>
      <i-mdi-file-video-outline/>
      <i-mdi-file-multiple/> -->
      <!-- {{ item }} -->
      <Truncify class="text-sm">{{ item.title }}</Truncify>
    </CardContent>
  </Card>
</template>

<script lang="ts">
import alert from "@/hooks/alert";
import { useListPropType } from "@/hooks/table";
import useDocs from "@/use/api/useDocs";
import FileUploader from "@/views/Admin/Components/Documents/FileUploader.vue";
import { computed, ref } from "vue";
export default {
  components: {
    FileUploader,
  },
  props: {
    dataId: { type: Number, required: true },
    useList: useListPropType(),
    parent: { type: Object, required: true },
  },
  setup(props, { emit }) {
    const item = computed(() => props.useList.itemsById.value[props.dataId]);
    const uploading = ref(false);

    const uploadFile = async (files) => {
      // useDocs.saveDoc(files[0])
      const file = files[0];
      const form = {
        data: {
          title: file.name,
          ...props.parent,
        },
      };
      uploading.value = true;
      const data = await useDocs.saveDoc(file, form, item.value?.slug);
      props.useList.updateItem(data.id, data, false);
      alert.register("File uploaded");
      uploading.value = false;
    };
    const deleteDocument = async () => {
      const _item = item.value;
      await useDocs.deletDoc(item.value.slug);
      alert.success("Document has been deleted.");
      props.useList.deleteItem(_item);
    };

    return {
      uploadFile,
      deleteDocument,
      item,
    };
  },
};
</script>

<style scoped></style>
