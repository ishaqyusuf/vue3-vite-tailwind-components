<template>
  <ProfileData></ProfileData>
  <PasswordReset></PasswordReset>
  <!-- <DeactivateAccount></DeactivateAccount> -->
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import ProfileData from "@/views/Settings/Profile/ProfileData.vue";
import PasswordReset from "@/views/Settings/Profile/PasswordReset.vue";
import DeactivateAccount from "@/views/Settings/Profile/DeactivateAccount.vue";
export default {
  props: {},
  components: {
    ProfileData,
    PasswordReset,
    DeactivateAccount,
  },
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
