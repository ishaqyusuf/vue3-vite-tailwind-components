<template>
  <div
    class="max-w-7xl transform transition-all delay-1000 bg-white shadow-sm py-1 border-b mx-auto px-4 sm:px-6"
  >
    <div class="flex justify-between py-2 items-center">
      <!-- <div class="inline-flex space-x-6"> -->
      <Logo md />

      <!-- </div> -->
      <Nav class="mobile:hidden" />
      <div class="mobile:hidden space-x-4">
        <template v-if="!loggedIn">
          <Link :to="{ name: 'login' }">Login</Link>
          <Link :to="{ name: 'register' }">
            <Btn color="purple">Sign Up</Btn>
          </Link>
        </template>
        <template v-else>
          <Link v-if="user.can('createPkg')" :to="{ name: 'register' }"
            ><Btn color="purple">
              <i-mdi-plus />
              Scan
            </Btn></Link
          >
          <Link :to="{ name: 'logout' }">Logout</Link>
        </template>
      </div>
      <div class="sm:hidden" @click="toggle">
        <i-mdi-menu v-if="!opened" />
        <i-mdi-close v-else />
      </div>
    </div>
    <Nav class="sm:hidden py-4" v-if="opened" />
  </div>
</template>
<script lang="ts">
import { computed, ref } from "vue";
import user from "@use/user";
import Nav from "./Nav.vue";
import menu from "@/hooks/menu";
export default {
  components: {
    Nav,
  },
  setup(props, { emit }) {
    return {
      user,
      loggedIn: user.loggedIn,
      ...menu,
    };
  },
};
</script>

<style></style>
