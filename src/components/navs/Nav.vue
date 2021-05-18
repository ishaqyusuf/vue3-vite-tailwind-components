<template>
  <div class="">
    <div class="sm:space-x-4 mobile:space-y-4 flex mobile:flex-col">
      <template v-if="guest || !loggedIn">
        <Link :to="{ name: 'tracking' }">Tracking</Link>
        <Link
          class="inline-flex items-center space-x-1"
          :to="{ name: 'logout' }"
          ><span>Shopping </span> <i-mdi-open-in-new class="text-xs" /> </Link
        ><Link :to="{ name: 'login' }">Portfolio</Link>
        <Link :to="{ name: 'login' }">Get Estimate</Link>
        <Link :to="{ name: 'login' }">Contact</Link>
        <Link :to="{ name: 'login' }">About</Link>
      </template>
      <NavLink :item="item" v-for="(item, index) in navs" :key="index" />
    </div>
    <div class="sm:hidden py-4 flex flex-col space-y-2">
      <template v-if="!loggedIn">
        <Link :to="{ name: 'login' }">
          <Btn secondary class="w-full">Login</Btn>
        </Link>
        <Link :to="{ name: 'register' }">
          <Btn color="purple" class="w-full">Sign Up</Btn>
        </Link>
      </template>
      <Link v-else :to="{ name: 'logout' }">
        <Btn color="red" class="w-full">Logout</Btn>
      </Link>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import user from "@use/user";
import navHook from "@/hooks/nav";
import NavLink from "@/components/navs/NavLink.vue";
export default {
  components: { NavLink },
  props: {},
  setup(props, { emit }) {
    return {
      user,
      guest: computed(() => user.permission.value.length == 0),
      loggedIn: computed(() => user.loggedIn.value),
      navs: computed(() => navHook.menu),
    };
  },
};
</script>

<style scoped></style>
