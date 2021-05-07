<template>
  <Card style="min-height: 45vh" class="py-6">
    <card-content>
      <template v-if="!submitted">
        <card-title class="px-0">Sign in to your account</card-title>
        <form autocomplete="off" class="w-full space-y-6">
          <Input
            v-model="email"
            name="email"
            type="email"
            pattern=".*\S*.*"
            required
            label="Email"
          >
          </Input>
          <Btn class="w-full" async :action="submit">Conitnue</Btn>
          <div class="flex justify-center">
            <router-link
              class="text-purple-700 font-medium"
              :to="{ name: 'login' }"
              >Return to sign in</router-link
            >
          </div>
        </form></template
      >
      <template v-else>
        <card-title class="px-0"
          >Thanks, check your email for instructions to reset your
          password</card-title
        >
        <span class="text-gray-700 text-sm">
          Didn't get the email? Check your spam folder or
          <Btn
            text
            id="resend"
            async
            :action="submit"
            class="text-purple-700 font-medium"
            >resend</Btn
          >
        </span>
      </template>
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
import { ref, onMounted } from "vue";
import useUser from "@/use/user";
export default {
  props: {},
  setup(props, { emit }) {
    const alwaysSignedIn = ref(false);
    const email = ref();
    const submitted = ref(false);
    async function submit() {
      const error = await useUser.iforgot(email.value);
      submitted.value = !error;
    }
    onMounted(() => {});
    return {
      ...useUser,
      alwaysSignedIn,
      submit,
      email,
      submitted,
    };
  },
};
</script>

<style scoped></style>
