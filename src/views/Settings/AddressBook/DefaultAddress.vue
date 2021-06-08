<template>
  <DopeCard
    title="Default Address"
    subtitle="Setup addresses and default address to be used for different operations"
  >
    <div class="divide-y">
      <DefaultAddressCard
        class="py-2"
        v-for="(id, index) in list.ids.value"
        :index="id"
        :key="index"
        label="Label Default Address"
      ></DefaultAddressCard>
    </div>
  </DopeCard>
</template>

<script lang="ts">
import DopeCard from "@/views/Settings/DopeCard.vue";
import useAddressBook from "@/use/list/use-address-book";
import DefaultAddressCard from "@/views/Settings/AddressBook/DefaultAddressCard.vue";
export default {
  props: {},
  components: {
    DefaultAddressCard,
    DopeCard,
  },
  setup(props, { emit }) {
    return {
      ...useAddressBook,
    };
  },
};
</script>

<style scoped></style>
