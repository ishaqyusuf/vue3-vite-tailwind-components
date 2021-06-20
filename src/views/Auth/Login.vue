<template>
  <Card style="min-height: 45vh" class="py-6">
    <card-content>
      <card-title class="px-0">Sign in to your account</card-title>
      <form autocomplete="off" class="w-full flex flex-col space-y-6">
        <Input
          v-model="form.user"
          name="email"
          type="email"
          pattern=".*\S*.*"
          required
          label="Email"
        />
        <!-- @keyup.enter="submit" -->
        <div class="space-y-2">
          <div class="flex justify-between">
            <Label>Password</Label>
            <router-link
              class="text-purple-700 text-sm font-medium"
              :to="{
                name: 'forgot-password',
                params: { email: form.user },
              }"
            >
              Forgot your password?
            </router-link>
          </div>
          <Input
            v-model="form.password"
            password
            required
            pattern=".*\S*.*"
            name="password"
          >
          </Input>
        </div>
        <Checkbox
          v-model="alwaysSignedIn"
          label="Stay signed in always"
        ></Checkbox>
        <Btn class="w-full" name="submit" async :action="submit">Continue</Btn>
      </form>

      <Input
        @input="quickLogin"
        label="Quick Login"
        v-if="devMode"
        select
        v-model="qle"
        :items="emails"
        item-text="title"
        item-value="email"
      />
    </card-content>
  </Card>
  <span class="">
    Don't have an account?
    <router-link class="text-purple-700 font-medium" :to="{ name: 'register' }"
      >Sign up</router-link
    ></span
  >
</template>

<script lang="ts">
import { ref, onMounted, reactive } from "vue";
import useUser from "@/use/user-account";
export default {
  props: {},
  setup(props, { emit }) {
    const alwaysSignedIn = ref(false);
    const form = reactive({ user: "", password: "" });
    async function submit() {
      await useUser.login(form);
    }
    onMounted(() => {});
    const emails = [
      { title: "Scan Agent", email: "lagosaccount@gmail.com" },
      { title: "Admin", email: "ishaqyusuf024@gmail.com" },
    ];
    const quickLogin = () => {
      form.user = qle.value;
      form.password = ",./";
      submit();
    };
    const qle = ref();

    return {
      qle,
      quickLogin,
      ...useUser,
      emails,
      alwaysSignedIn,
      submit,
      form,
      devMode: import.meta.env.NODE_ENV !== "production",
    };
  },
};
</script>

<style scoped></style>
