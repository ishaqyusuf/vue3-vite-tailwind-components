<template>
  <Card class="h-48">
    <CardContent>
      <div v-if="dataId < 0" class="border">o</div>
      <template v-else>
        <FileUploader />
      </template>
    </CardContent>
  </Card>
</template>

<script lang="ts">
import FileUploader from "@/views/Admin/Components/Documents/FileUploader.vue";
export default {
  components: {
    FileUploader,
  },
  props: {
    dataId: { type: Number, required: true },
    lsHook: { type: Object, required: true },
  },
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
