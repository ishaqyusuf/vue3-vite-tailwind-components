P
<template>
  <template v-if="user.can(item.permission)">
    <Link :to="item.to" v-if="!item.children" :class="item.css">{{
      item.title
    }}</Link>
    <Menu v-else>
      <span class="link-style">{{ item.title }}</span>
      <template v-slot:items>
        <MenuLinkItem
          :class="child.css"
          v-for="(child, index) in item.children"
          :to="child.to"
          :key="index"
        >
          {{ child.title }}
        </MenuLinkItem>
      </template>
    </Menu>
  </template>
</template>

<script lang="ts">
import { ref } from "vue";
import user from "@/use/user-account";
export default {
  props: {
    item: { required: true, type: Object },
  },
  setup(props, { emit }) {
    return {
      user,
      //   item: props.item,
    };
  },
};
</script>

<style scoped></style>
