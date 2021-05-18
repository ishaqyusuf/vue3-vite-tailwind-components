<template>
  <div class="min-h-screen pb-10 sm:flex items-center justify-center">
    <div
      class="max-w-lg w-full sm:max-w-5xl mx-auto px-4 space-y-6 sm:grid grid-cols-1 sm:gap-10 sm:grid-cols-12"
    >
      <div class="sm:flex flex-col col-span-6 my-10 sm:space-y-10">
        <Logo dark lg class="ml-4 sm:ml-8" />
        <ul class="hidden sm:block space-y-4">
          <li
            v-for="(item, index) in tips"
            :key="index"
            class="flex item-start"
          >
            <span class="h-6 flex items-center sm:h-7">
              <svg
                class="flex-shrink-0 h-5 w-5 text-purple-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <div class="ml-2 space-y-2">
              <p class="font-semibold">{{ item.title }}</p>
              <span class="text-sm text-gray-800">{{ item.subtitle }}</span>
            </div>
          </li>
        </ul>
      </div>
      <Card class="sm:py-6 sm:col-span-6">
        <card-content>
          <card-title class="sm:py-6 px-0"
            >Create your Eaftrack account</card-title
          >
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
                    >Get emails from Eaftrack about shipment updates, industry
                    news and events.<br />
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
            <Btn class="w-full" name="submit" async :action="submit"
              >Create account</Btn
            >
          </form>
        </card-content>
        <span class="text-sm block text-center">
          Don't have an account?
          <router-link
            class="text-purple-700 font-medium"
            :to="{ name: 'login' }"
            >Sign in</router-link
          ></span
        ></Card
      >
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import useUser from "@/use/user";
export default {
  props: {},
  setup(props, { emit }) {
    const form = reactive({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    });
    const getNotification = ref(false);
    const loading = ref(false);
    const submit = async () => {
      const { error } = await useUser.createAccount(form);
    };
    return {
      form,
      submit,
      loading,
      getNotification,
      tips: [
        {
          title: "Get started quickly",
          subtitle:
            "Simply create an account inorder to closely monitor your parcels with our friendly dashboard.",
        },
        {
          title: "Create and manage shipment",
          subtitle:
            "Trust us with taking care of your parcels and shipments as a small, medium or large scaled business. Ship simply and easily!",
        },
        {
          title: "Join millions of business",
          subtitle:
            "EAFreight is trustedby ambitious businesses and enterprises of every size",
        },
      ],
    };
  },
};
</script>

<style scoped></style>
