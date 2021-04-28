<template>
  <div class="h-screen">
    <Card class="max-w-lg mx-auto">
      <card-content>
        <form
          @submit.prevent="submit"
          autocomplete="off"
          class="w-full space-y-2"
        >
          <Input v-model="form.user" pattern=".*\S*.*" required></Input>
          <Input
            v-model="form.password"
            type="password"
            required
            pattern=".*\S*.*"
            name="password"
          ></Input>
          <Btn class="w-full" type="submit">Sign In</Btn>
        </form></card-content
      >
    </Card>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import useUser from "@/use/user";
export default {
  props: {},
  setup(props, { emit }) {
    const form = ref({ user: "", password: "" });
    const submit = (event) => {
      const fd: HTMLFormElement = event.target;
      // const {user,password } = Object.fromEntries(new FormData(fd));
      useUser.login(fd).then((result) => {});
    };
    return {
      ...useUser,
      submit,
      form,
    };
  },
};
</script>

<style scoped></style>
