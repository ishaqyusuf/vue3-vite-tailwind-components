<template>
  <DefaultAddress v-if="isAdmin"></DefaultAddress>
  <DopeCard title="Address List" subtitle="List of all your address">
    <CardContent class="space-y-2">
      <div class="inline-flex w-full justify-end">
        <Btn @click="addressList.openUserForm()">
          <i-mdi-plus />
          New Address
        </Btn>
      </div>
      <AddressList ref="addressList"></AddressList>
    </CardContent>
  </DopeCard>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import DopeCard from "@/views/Settings/DopeCard.vue";
import userAccount from "@/use/user-account";
import AddressList from "@/views/Settings/AddressBook/AddressList.vue";
export default {
  props: {},
  components: { DopeCard, AddressList },
  setup(props, { emit }) {
    const addressList = ref();
    const isAdmin = ref<boolean>();
    onMounted(async () => {
      isAdmin.value = userAccount.can("readAdmin");
    });

    return {
      addressList,
      isAdmin,
    };
  },
};
</script>

<style scoped></style>
