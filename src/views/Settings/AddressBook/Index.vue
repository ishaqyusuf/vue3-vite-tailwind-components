<template>
  <DefaultAddress v-if="isAdmin"></DefaultAddress>
  <DopeCard title="Address List" subtitle="List of all your address">
    <CardContent class="space-y-2">
      <div class="inline-flex w-full justify-end">
        <Btn @click="openUserForm()">
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
import DefaultAddress from "@/views/Settings/AddressBook/DefaultAddress.vue";
import AddressList from "@/views/Settings/AddressBook/AddressList.vue";
import useAddressBook from "@/use/list/use-address-book";

export default {
  props: {},
  components: { DopeCard, AddressList, DefaultAddress },
  setup(props, { emit }) {
    const addressList = ref();
    const isAdmin = ref<boolean>();
    onMounted(() => {
      isAdmin.value = userAccount.can("readAdmin");
    });

    return {
      addressList,
      ...useAddressBook,
      isAdmin,
    };
  },
};
</script>

<style scoped></style>
