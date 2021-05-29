<template>
  <div
    class="flex w-full h-full cursor-pointer"
    @dragenter="onDrag($event, true)"
    @drop="onDrop"
    @dragover="onDrag($event, true)"
    @dragleave="onDrag($event, false)"
    ref="dropZone"
    @click="getFile"
  >
    <input
      ref="fileUpload"
      @change="fileUploaded"
      type="file"
      accept="pdf"
      class="absolute"
      style="display: none"
    />
    <slot :active="dragActive"></slot>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {},
  setup(props, { emit }) {
    const dragActive = ref(false);
    const fileUpload = ref();
    const dropZone = ref();
    const getFile = (e) => {
      //   e.preventDefault();
      fileUpload.value.click();
    };
    return {
      fileUpload,
      getFile,
      dropZone,
      dragActive,
      onDrag: (e, value) => {
        e.preventDefault();
        dragActive.value = value;
      },
      onDrop: (e) => {
        const dragevent = e as DragEvent;
        if (dragevent.dataTransfer) {
          dragActive.value = false;
          emit("upload", dragevent.dataTransfer.files);
        }
      },
      fileUploaded: (e) => {
        const target = e.target as HTMLInputElement;
        if (target.files) {
          dragActive.value = false;
          emit("upload", target.files);
        }
      },
    };
  },
};
</script>

<style scoped></style>
