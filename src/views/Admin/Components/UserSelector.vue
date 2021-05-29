<template>
  <div>
    <slot name="btn" :open="selectUser"></slot>
    <UserList title="Select Client" ref="userls"></UserList>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import UserList from "@/views/Admin/Components/UserList.vue";
export default {
  props: {},
  components: {
    UserList,
  },
  setup(props, { emit }) {
    const userls = ref();
    const selectUser = () => {
      userls.value.open().then((user) => {
        if (user) emit("selected", user); //updateRecipient({ user_id: user.id });
      });
    };
    return {
      userls,
      selectUser,
    };
  },
};
</script>

<style scoped></style>
