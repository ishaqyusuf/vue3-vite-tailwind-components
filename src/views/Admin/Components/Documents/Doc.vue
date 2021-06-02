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
      <i-mdi-pdf-box class="text-5xl text-red-400" />
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
import useDocs from "@/use/api/useDocs";
import FileUploader from "@/views/Admin/Components/Documents/FileUploader.vue";
import { computed, ref, watch } from "vue";
export default {
  components: {
    FileUploader,
  },
  props: {
    dataId: { type: Number, required: true },
    useList: { type: Object, required: true },
    parent: { type: Object, required: true },
  },
  setup(props, { emit }) {
    const item = computed(() => props.useList.itemByIds.value[props.dataId]);
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
      await useDocs.deletDoc(item.value.slug);
      alert.success("Document has been deleted.");
      props.useList.deleteItem(props.dataId);
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
