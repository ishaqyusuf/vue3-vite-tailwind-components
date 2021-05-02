<template>
  <div class="h-screen mx-auto sm:flex items-center justify-center">
    <div class="w-full">
      <div class="max-w-xs sm:max-w-lg mx-auto">
        <card-content>
          <form
            @submit.prevent="submit"
            autocomplete="off"
            class="w-full space-y-4 my-4"
          >
            <Input
              v-model="form.user"
              name="email"
              pattern=".*\S*.*"
              required
              label="Email"
            >
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import useUser from "@/use/user";
import alertHook from "@/hooks/alert";
export default {
  props: {},
  setup(props, { emit }) {
    const form = ref({ user: "", password: "" });
    const loading = ref(false);

    function submit(event) {
      loading.value = true;

      // await useUser.login(form.value);
      // console.log(loading.value);
      // loading.value = false;
      alertHook.register("Hello World");
    }
    return {
      ...useUser,
      loading,
      submit,
      form,
    };
  },
};
</script>

<style scoped></style>
