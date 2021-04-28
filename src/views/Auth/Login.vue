<template>
  <div class="h-screen">
    <Card class="max-w-lg mx-auto">
      <card-content>
        <form
          @submit.prevent="submit"
          autocomplete="off"
          class="w-full space-y-3"
        >
          <Input v-model="form.user" pattern=".*\S*.*" required label="Email">
          </Input>
          <Input
            v-model="form.password"
            type="password"
            required
            pattern=".*\S*.*"
            name="password"
            label="Password"
          >
          </Input>
          <Btn class="w-full" :loading="loading" type="submit">Sign In</Btn>
        </form>
      </card-content>
    </Card>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import useUser from "@/use/user";
import device from "@/hooks/device";
export default {
  props: {},
  setup(props, { emit }) {
    const form = ref({ user: "", password: "" });
    const loading = ref(false);
    const submit = (event) => {
      loading.value = true;
      const fd: HTMLFormElement = event.target;
      // const {user,password } = Object.fromEntries(new FormData(fd));
      useUser.login(fd).then((result) => {
        loading.value = true;
      });
    };
    console.log(useUser.getToken());
    return {
      ...useUser,
      submit,
      form,
      loading,
    };
  },
};
</script>

<style scoped></style>
