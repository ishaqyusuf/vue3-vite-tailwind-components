P
<template>
  <template
    v-if="
      (item.permission && user.can(item.permission)) ||
      (item.permissions && user.canMany(item.permissions))
    "
  >
    <Link :to="item.to" v-if="!item.children" :class="item.css">{{
      item.title
    }}</Link>
    <Menu v-else>
      <span class="link-style">{{ item.title }}</span>
      <template #items>
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
