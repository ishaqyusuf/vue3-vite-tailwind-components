<template>
  <div class="max-w-7xl py-1 border-b mx-auto px-4 sm:px-6">
    <div class="flex justify-between py-2 items-center">
      <Logo md />
      <div class="space-x-4">
        <template v-if="!loggedIn">
          <Link :to="{ name: 'login' }"><Btn text>Login</Btn></Link>
          <Link :to="{ name: 'register' }"
            ><Btn color="purple">Sign Up</Btn></Link
          >
        </template>
        <template v-else>
          <Link :to="{ name: 'login' }">Parcels</Link>
          <Link :to="{ name: 'logout' }">Logout</Link>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed } from "vue";
import user from "@use/user";
export default {
  setup(props, { emit }) {
    return { ...user };
  },
};
</script>

<style></style>
