<template>
  <div class="max-w-7xl py-2 border-b mx-auto px-4 sm:px-6">
    <div class="flex justify-between py-2 items-center">
      <i-mdi-facebook class="text-xl" />
      <div class="space-x-4">
        <Link :to="{ name: 'login' }">Home</Link>
        <Link :class="{ hidden: loggedIn }" :to="{ name: 'components' }"
          >Components</Link
        >
        <Link :to="{ name: 'login' }">Login</Link>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed } from "vue";
import user from "@use/user";
export default {
  setup(props, { emit }) {
    const loggedIn = computed(() => user.value);
    const login = () => {};
    return { ...user, login };
  },
};
</script>

<style></style>
