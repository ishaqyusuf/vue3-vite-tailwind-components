<template>
  <div class="h-screen mx-auto sm:flex items-center justify-center">
    <div class="w-full">
      <Card
        style="min-height: 45vh"
        class="max-w-xs flex flex-col justify-center w-full sm:max-w-lg mx-auto"
      >
        <card-content>
          <card-title class="px-0">Sign in to your account</card-title>
          <form autocomplete="off" class="w-full space-y-6">
            <Input
              v-model="form.user"
              name="email"
              type="email"
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
              <template v-slot:label-right>
                <router-link
                  class="text-purple-700 font-medium"
                  :to="{
                    name: 'forgot-password',
                    params: { email: form.user },
                  }"
                >
                  Forgot Password?
                </router-link>
              </template>
            </Input>
            <Btn class="w-full" async :action="submit">Sign In</Btn>
          </form>
        </card-content>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted, reactive } from "vue";
import useUser from "@/use/user";
export default {
  props: {},
  setup(props, { emit }) {
    const form = reactive({ user: "", password: "" });
    async function submit() {
      await useUser.login(form);
    }
    onMounted(() => {});
    return {
      ...useUser,
      submit,
      form,
    };
  },
};
</script>

<style scoped></style>
