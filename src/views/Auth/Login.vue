<template>
  <div class="h-screen">
    <form @submit.prevent="login">
      <InputA name="user"  pattern=".*\S*.*"  required></InputA>
      <InputA type="password" required pattern=".*\S*.*" name="password"></InputA>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import useUser from "@/use/user";
export default {
  props: {},
  setup(props, { emit }) {
    const user = ref();
    const password = ref();

    const submit = (event)  => {
      const fd : HTMLFormElement = event.target;
      const {user,password } = Object.fromEntries(new FormData(fd));

    return {
      ...useUser,
    };
  },
};
</script>

<style scoped></style>
