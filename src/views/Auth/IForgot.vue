<template>
  <Card style="min-height: 45vh" class="py-6">
    <card-content>
      <template v-if="!submitted">
        <card-title class="px-0">Let's help you reset your password</card-title>
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
          <Btn class="w-full" name="resetBtn" async :action="submit"
            >Continue</Btn
          >
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
        <div class="space-y-2">
          <Input
            v-model="pin"
            name="resetPin"
            class="text-5xl"
            center
            label="Reset Pin"
          />
          <Btn name="resetBtn" class="w-full" async :action="resetPassword"
            >Continue</Btn
          >
        </div>
        <span class="text-gray-700 text-sm">
          Didn't get the email? Check your spam folder or
          <Btn
            text
            name="resend"
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
import router from "@/router";
import useAlert from "@/hooks/alert";
export default {
  props: {},
  setup(props, { emit }) {
    const query = props.query;
    const alwaysSignedIn = ref(false);
    const pin = ref("");
    const email = ref("");
    console.log(email.value);
    const submitted = ref(false);
    async function submit() {
      const error = await useUser.iforgot(email.value);
      submitted.value = !error;

      !error && useAlert.register("Check your email.");
    }
    async function resetPassword() {
      const token = await useUser.validateToken({
        email: email.value,
        pin: pin.value,
      });
      if (token)
        router.push({
          name: "reset-password",
          query: {
            token: token,
            email: email.value,
          },
        });
    }
    onMounted(() => {});
    return {
      ...useUser,
      resetPassword,
      alwaysSignedIn,
      submit,
      pin,
      email,
      submitted,
    };
  },
};
</script>

<style scoped></style>
