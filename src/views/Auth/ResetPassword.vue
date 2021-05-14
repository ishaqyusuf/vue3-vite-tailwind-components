<template>
  <Card style="min-height: 45vh" class="py-6">
    <card-content>
      <template v-if="checkingToken"> </template>
      <template v-else>
        <card-title class="px-0">Reset your password</card-title>
        <form autocomplete="off" class="w-full space-y-6">
          <Input
            v-model="form.password"
            name="password"
            type="password"
            pattern=".*\S*.*"
            required
            label="New Password"
          />
          <Input
            v-model="form.confirm_password"
            name="confirm_password"
            type="password"
            pattern=".*\S*.*"
            required
            label="Confirm New Password"
          />
          <Btn class="w-full" name="submit" async :action="submit"
            >Continue</Btn
          >
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
import { ref, onMounted, reactive } from "vue";
import useUser from "@/use/user";
import alert from "@/hooks/alert";
export default {
  props: {
    email: String,
    token: String,
  },
  setup(props, { emit }) {
    const { email, token } = props;
    const checkingToken = ref(true);
    const form = reactive({
      password: "",
      confirm_password: "",
    });
    onMounted(async () => {
      const { error, token } = await useUser.validateToken({ email, token });
      if (!error) checkingToken.value = false;
    });

    async function submit() {
      const error = [
        form.password != form.confirm_password &&
          "The password you enter does not match",
        !form.password && "Enter valid password",
        form.password.length < 6 && "Password too weak!",
      ].filter(Boolean)[0];
      if (error) {
        alert.register(error, true);

        return;
      }
      await useUser.updatePassword({
        password: form.password,
        email,
        token,
      });
    }
    return {
      ...useUser,
      form,
      submit,
      checkingToken,
    };
  },
};
</script>

<style scoped></style>
