<template>
  <div class="h-screen mx-auto sm:flex items-center justify-center">
    <div class="w-full">
      <div class="max-w-xs sm:max-w-lg mx-auto">
        <card-content>
          <form autocomplete="off" class="w-full space-y-4 my-4">
            <Input
              v-model="form.first_name"
              name="first_name"
              pattern=".*\S*.*"
              required
              label="First Name"
            >
            </Input>
            <Input
              v-model="form.last_name"
              name="last_name"
              pattern=".*\S*.*"
              required
              label="Last Name"
            >
            </Input>
            <Input
              v-model="form.email"
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
              password
            >
              <template v-slot:prependInner>
                <i-mdi-loading />
              </template>
            </Input>
            <Btn class="w-full" async :action="submit">Sign In</Btn>
          </form>
        </card-content>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {},
  setup(props, { emit }) {
    const form = ref({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    });
    const loading = ref(false);
    const submit = (event) => {};
    return { form, submit, loading };
  },
};
</script>

<style scoped></style>
