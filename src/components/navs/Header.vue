<template>
  <div class="max-w-7xl bg-white shadow-sm py-1 border-b mx-auto px-4 sm:px-6">
    <div class="flex justify-between py-2 items-center">
      <!-- <div class="inline-flex space-x-6"> -->
      <Logo md />

      <!-- </div> -->
      <div class="space-x-4">
        <template v-if="!loggedIn">
          <Link :to="{ name: 'login' }">Tracking</Link>
          <Link
            class="inline-flex items-center space-x-1"
            :to="{ name: 'logout' }"
            ><span>Shopping </span> <i-mdi-open-in-new class="text-xs" /> </Link
        ></template>
        <Link :to="{ name: 'login' }">Portfolio</Link>
        <Link :to="{ name: 'login' }">Get Estimate</Link>
        <Link :to="{ name: 'login' }">Contact</Link>
        <Link :to="{ name: 'login' }">About</Link>
      </div>
      <div class="space-x-4">
        <template v-if="!loggedIn">
          <Link :to="{ name: 'login' }"><Btn text>Login</Btn></Link>
          <Link :to="{ name: 'register' }"
            ><Btn color="purple">Sign Up</Btn></Link
          >
        </template>
        <template v-else>
          <Link :to="{ name: 'register' }"
            ><Btn color="purple">
              <i-mdi-plus />
              Scan
            </Btn></Link
          >
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
