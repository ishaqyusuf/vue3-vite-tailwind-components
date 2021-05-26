<template>
  <div
    class="flex h-full"
    @dragenter="onDrag($event, true)"
    @drop="onDrop"
    @dragover="onDrag($event, true)"
    @dragLeave="onDrag($event, false)"
    ref="dropZone"
    @click="getFile"
  >
    <input
      ref="upload"
      id="fileUpload"
      @change="fileUploaded"
      type="file"
      accept="text/xml"
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
    const getFile = (e) => {
      e.preventDefault();
      fileUpload.value.click();
    };
    return {
      fileUpload,
      getFile,
      dragActive,
      onDrag: (e, value) => {
        e.preventDefault();
        dragActive.value = value;
      },
      onDrop: (e) => {
        const dragevent = e as DragEvent;
        if (dragevent.dataTransfer) {
          dragActive.value = false;
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
