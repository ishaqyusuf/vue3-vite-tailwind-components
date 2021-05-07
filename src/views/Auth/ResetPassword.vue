<template>
  <Card style="min-height: 45vh" class="py-6">
    <card-content>
      <template v-if="checkingToken"> </template>
      <template v-else>
        <card-title class="px-0">Reset your password</card-title>
        <form autocomplete="off" class="w-full space-y-6">
          <Input
            v-model="email"
            name="email"
            type="email"
            pattern=".*\S*.*"
            required
            label="Email"
          />
          <Btn class="w-full" async :action="submit">Conitnue</Btn>
          <div class="flex justify-center">
            <router-link
              class="text-purple-700 font-medium"
              :to="{ name: 'login' }"
              >Return to sign in</router-link
            >
          </div>
        </form>
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
export default {
  props: {
    email: String,
    token: String,
  },
  setup(props, { emit }) {
    const { email, token } = props.params;
    const checkingToken = ref(true);
    async function checkToken() {
      const error = await useUser.iforgot(email.value);
    }
    async function submit() {}
    onMounted(() => {});
    return {
      ...useUser,
      submit,
      checkingToken,
    };
  },
};
</script>

<style scoped></style>
