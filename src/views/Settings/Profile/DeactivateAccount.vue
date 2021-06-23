<template>
  <DopeCard
    title="Deactivate Account"
    subtitle="Deactivating your account means all your data will be deleted and you will not be able to undo this account."
  >
    <CardContent class="space-y-4 mb-4">
      <Input type="password" label="Current Password" grid v-model="password" />
    </CardContent>
    <CardActions plain>
      <Btn color="red">Deactivate</Btn>
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
    const password = ref("");
    return {
      password,
    };
  },
};
</script>

<style scoped></style>
