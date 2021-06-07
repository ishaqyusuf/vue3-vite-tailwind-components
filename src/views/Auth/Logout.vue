<template></template>

<script lang="ts">
import { ref, onMounted } from "vue";
import user from "@/use/user-account";
import router from "@/router";
export default {
  props: {},
  setup(props, { emit }) {
    onMounted(async () => {
      user.logout().then((d) => {
        router.push({ name: "home" });
      });
    });
    return {};
  },
};
</script>

<style scoped></style>
