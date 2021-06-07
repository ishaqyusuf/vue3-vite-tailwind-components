<template>
  {{ userAccount.user }}
  <DopeCard
    title="Profile Data"
    subtitle="Update your account profile information"
  >
    <CardContent class="space-y-4 mb-4">
      <Input label="First Name" grid v-model="form.first_name" />
      <Input label="Last Name" grid v-model="form.last_name" />
      <Input label="Email" readonly disabled grid v-model="form.email" />
      <Input label="Country" grid v-model="form.country" />
      <Input label="Phone" grid v-model="form.phone" />
    </CardContent>
    <CardActions plain>
      <Btn color="green-500">
        <span class="px-2">Save</span>
      </Btn>
    </CardActions>
  </DopeCard>
  <DopeCard
    title="Password Reset"
    subtitle="Reset your current password by providing current and new password."
  >
    <CardContent class="space-y-4 mb-4">
      <Input
        type="password"
        label="Current Password"
        grid
        v-model="form.first_name"
      />
      <Input
        type="password"
        label="New Password"
        grid
        v-model="form.last_name"
      />
      <Input
        type="password"
        label="Confirm New Password"
        disabled
        grid
        v-model="form.email"
      />
    </CardContent>
    <CardActions plain>
      <Btn color="green-500">Save</Btn>
    </CardActions>
  </DopeCard>
  <DopeCard
    title="Deactivate Account"
    subtitle="Deactivating your account means all your data will be deleted and you will not be able to undo this account."
  >
    <CardContent class="space-y-4 mb-4">
      <Input
        type="password"
        label="Current Password"
        grid
        v-model="form.first_name"
      />
    </CardContent>
    <CardActions plain>
      <Btn color="red-500">Deactivate</Btn>
    </CardActions>
  </DopeCard>
</template>

<script lang="ts">
import { ref } from "vue";
import DopeCard from "@/views/Settings/DopeCard.vue";
import userAccount from "@/use/user-account";
export default {
  props: {},
  components: {
    DopeCard,
  },
  setup(props, { emit }) {
    const form = ref<any>({});

    return {
      form,
      userAccount,
    };
  },
};
</script>

<style scoped></style>
