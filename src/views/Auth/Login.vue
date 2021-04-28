<template>
  <div class="h-screen">
    <Card class="max-w-lg mx-auto">
      <card-content>
        <form @submit.prevent="login" class="space-y-2">
          <InputA name="user" pattern=".*\S*.*" required></InputA>
          <InputA
            type="password"
            required
            pattern=".*\S*.*"
            name="password"
          ></InputA></form
      ></card-content>
    </Card>
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

    const submit = (event) => {
      const fd: HTMLFormElement = event.target;
      // const {user,password } = Object.fromEntries(new FormData(fd));
      useUser.login(fd).then((result) => {});
      return {
        ...useUser,
      };
    };
  },
};
</script>

<style scoped></style>
