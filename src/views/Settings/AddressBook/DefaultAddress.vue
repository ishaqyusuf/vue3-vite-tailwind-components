<template>
  <DopeCard
    title="Default Address"
    subtitle="Setup addresses and default address to be used for different operations"
  >
    <div class="divide-y">
      <DefaultAddressCard
        class="py-2 sm:py-4"
        v-for="(item, index) in ls"
        :data="item"
        :key="index"
        :picker="picker"
      ></DefaultAddressCard>
    </div>
    <AddressPicker ref="picker"></AddressPicker>
  </DopeCard>
</template>

<script lang="ts">
import DopeCard from "@/views/Settings/DopeCard.vue";
import useAddressBook, { defaultAddresses } from "@/use/list/use-address-book";
import { onMounted, ref } from "vue";
import DefaultAddressCard from "@/views/Settings/AddressBook/DefaultAddressCard.vue";
import useMetaDataApi, { MetaDataType } from "@/use/api/use-meta-data-api";
import AddressPicker from "@/views/Settings/AddressBook/AddressPicker.vue";
export default {
  props: {},
  components: {
    DefaultAddressCard,
    AddressPicker,
    DopeCard,
  },
  setup(props, { emit }) {
    const ls = ref<any[]>([]);
    const picker = ref();
    onMounted(async () => {
      const { items } = await useMetaDataApi.index({
        type: MetaDataType.DefaultAddress,
      });

      ls.value = defaultAddresses.map((address) => {
        return Object.assign(
          {},
          address,
          items && items.find((i) => i.title == address.title)
        );
      });
    });
    return {
      ...useAddressBook,
      picker,
      ls,
    };
  },
};
</script>

<style scoped></style>
