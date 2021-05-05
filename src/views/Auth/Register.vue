<template>
  <Card class="py-6">
    <card-content>
      <card-title class="py-6 px-0">Create your Eaftrack account</card-title>
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
        </Input>
        <Checkbox class="py-6" v-model="getNotification">
          <template v-slot:label>
            <div class="text-sm w-11/12 text-gray-500">
              <span
                >Get emails from Eaftrack about shipment updates, industry news
                and events.<br />
                <span>
                  If you change your mind, you can unsubscribe at any time.
                  <router-link
                    class="text-purple-700 text-sm font-medium"
                    :to="{
                      name: 'home',
                    }"
                  >
                    Privacy Policy
                  </router-link></span
                >
              </span>
            </div>
          </template>
        </Checkbox>
        <Btn class="w-full" async :action="submit">Sign In</Btn>
      </form>
    </card-content>
    <span class="text-sm block text-center">
      Don't have an account?
      <router-link class="text-purple-700 font-medium" :to="{ name: 'login' }"
        >Sign in</router-link
      ></span
    ></Card
  >
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
    const getNotification = ref(false);
    const loading = ref(false);
    const submit = (event) => {};
    return { form, submit, loading, getNotification };
  },
};
</script>

<style scoped></style>
