<template>
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
</template>

<script lang="ts">
import { ref } from "vue";
import DopeCard from "@/views/Settings/DopeCard.vue";
export default {
  components: {
    DopeCard,
  },
  props: {},
  setup(props, { emit }) {
    const form = ref<any>({});
    return {
      form,
    };
  },
};
</script>

<style scoped></style>
