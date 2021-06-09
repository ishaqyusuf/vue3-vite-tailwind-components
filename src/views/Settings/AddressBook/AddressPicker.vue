<template>
  <Prompt
    v-model="show"
    @closed="show = false"
    cancelable
    hide-cancel
    hide-okay
    title="Select Address"
  >
    <template #info>
      <div class="py-2 max-h-96 overflow-auto">
        <div class="space-y-3 flex flex-col">
          <AddressList picker @addressSelected="selectAddress"></AddressList>
        </div>
      </div>
    </template>
  </Prompt>
</template>

<script lang="ts">
import { ref } from "vue";
import AddressList from "@/views/Settings/AddressBook/AddressList.vue";
export default {
  components: {
    AddressList,
  },
  props: {},
  setup(props, { emit }) {
    const show = ref(false);
    const resolver = ref();
    const list = ref();
    const select = async () => {
      return new Promise((resolve, reject) => {
        resolver.value = resolve;
        // list.value = list;
        show.value = true;
      });
    };
    const selectAddress = (id) => {
      resolver.value(id);
      show.value = false;
    };
    return {
      selectAddress,
      select,
      list,
      show,
    };
  },
};
</script>

<style scoped></style>
