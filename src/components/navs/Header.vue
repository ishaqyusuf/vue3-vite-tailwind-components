<template>
  <div class="bg-white shadow-sm border-b z-40 relative">
    <div
      class="max-w-7xl transform transition-all delay-1000 py-1 mx-auto px-4 sm:px-6"
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
            <Link v-if="can('createPkg')" :to="{ name: 'scanner' }"
              ><Btn color="purple">
                <i-mdi-plus />
                Scan
              </Btn></Link
            >
            <NotificationMenu />
            <Menu rtl>
              <div class="inline-flex items-center space-x-1">
                <Avatar class="border-2"></Avatar>
                <i-mdi-chevron-down class="text-gray-400" />
              </div>
              <template v-slot:items>
                <div class="divide-y divide-gray-100">
                  <div class="p-2">
                    <span class="font-semibold block">Signed in as</span>
                    <span class="text-sm">{{ user.email }}</span>
                  </div>
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
  </div>
</template>
<script lang="ts">
import { watch } from "vue";
import useUser from "@use/user-account";
import Nav from "./Nav.vue";
import menu from "@/hooks/menu";
import nav from "@/hooks/nav";
import NotificationMenu from "@/components/navs/NotificationMenu.vue";
export default {
  components: {
    Nav,
    NotificationMenu,
  },
  setup(props, { emit }) {
    watch(useUser.user, (value, old) => {
      // console.log("user");
    });
    return {
      ...useUser,
      loggedIn: useUser.loggedIn,
      ...menu,
      nav,
    };
  },
};
</script>

<style></style>
