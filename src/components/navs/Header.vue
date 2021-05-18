<template>
  <div
    class="max-w-7xl transform transition-all delay-1000 bg-white shadow-sm py-1 border-b mx-auto px-4 sm:px-6"
  >
    <div class="flex justify-between py-2 items-center">
      <!-- <div class="inline-flex space-x-6"> -->
      <Logo md />

      <!-- </div> -->
      <Nav class="hidden sm:block" />
      <div class="hidden sm:inline-flex items-center space-x-4">
        <template v-if="!loggedIn">
          <Link :to="{ name: 'login' }">Login</Link>
          <Link :to="{ name: 'register' }">
            <Btn color="purple">Sign Up</Btn>
          </Link>
        </template>
        <template v-else>
          <Link v-if="user.can('createPkg')" :to="{ name: 'scanner' }"
            ><Btn color="purple">
              <i-mdi-plus />
              Scan
            </Btn></Link
          >
          <Menu rtl>
            <Avatar md class="border-2"></Avatar>
            <template v-slot:items>
              <div class="divide-y divide-gray-100">
                <div
                  class="p-1"
                  v-for="(group, index) in nav.avatarMenu"
                  :key="index"
                >
                  <MenuLinkItem
                    v-for="(item, index) in group"
                    :key="index"
                    :to="item.to"
                  >
                    {{ item.title }}</MenuLinkItem
                  >
                </div>
              </div>
            </template>
          </Menu>
          <!-- <Link :to="{ name: 'logout' }">Logout</Link> -->
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
import nav from "@/hooks/nav";
export default {
  components: {
    Nav,
  },
  setup(props, { emit }) {
    return {
      user,
      loggedIn: user.loggedIn,
      ...menu,
      nav,
    };
  },
};
</script>

<style></style>
