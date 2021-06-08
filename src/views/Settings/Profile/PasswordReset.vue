<template>
  <DopeCard
    title="Update Password"
    subtitle="Reset your current password by providing current and new password."
  >
    <CardContent class="space-y-4 mb-4">
      <Input
        type="password"
        label="Current Password"
        grid
        v-model="form.old_pass"
      />
      <Input
        type="password"
        label="New Password"
        grid
        v-model="form.password"
      />
      <Input
        type="password"
        label="Confirm New Password"
        grid
        v-model="form.password2"
      />
    </CardContent>
    <CardActions plain>
      <Btn async :action="updatePass" color="green-500">Update Password</Btn>
    </CardActions>
  </DopeCard>
</template>

<script lang="ts">
import { ref } from "vue";
import DopeCard from "@/views/Settings/DopeCard.vue";
import userAccount from "@/use/user-account";
export default {
  components: {
    DopeCard,
  },
  props: {},
  setup(props, { emit }) {
    const form = ref<any>({});
    return {
      updatePass: async () => {
        await userAccount.changePassword(form.value);
      },
      form,
    };
  },
};
</script>

<style scoped></style>
