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
    <CardContent v-else>
      <template>
        {{ item }}
      </template>
    </CardContent>
  </Card>
</template>

<script lang="ts">
import useDocs from "@/use/api/useDocs";
import FileUploader from "@/views/Admin/Components/Documents/FileUploader.vue";
import { computed, ref } from "vue";
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
    const item = computed(() => props.useList.itemByIds[props.dataId]);
    const uploading = ref(false);
    const uploadFile = async (files) => {
      // useDocs.saveDoc(files[0])
      const file = files[0];
      const form = {
        data: {
          title: file.name,
          group_type: props.type,
          post_parent: props.parentId,
        },
      };
      uploading.value = true;
      const data = await useDocs.saveDoc(file, form, item.value?.slug);
      props.useList.updateItem(data.id, data);
      uploading.value = false;
    };

    return {
      uploadFile,
      item,
    };
  },
};
</script>

<style scoped></style>
