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
import { ref, computed, onMounted, reactive } from "vue";
import useUser from "@/use/user";
export default {
  props: {},
  setup(props, { emit }) {
    const form = reactive({ user: "", password: "" });
    const loading = ref(false);
    async function submit(event) {
      loading.value = true;
      await useUser.login(form);
      loading.value = false;
    }
    onMounted(() => {});
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
