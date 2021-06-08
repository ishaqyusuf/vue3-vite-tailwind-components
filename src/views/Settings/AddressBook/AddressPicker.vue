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
      <div class="p-4 max-h-96 overflow-auto">
        <div class="space-y-3 flex flex-col px-4">
          <AddressList picker @select="selectAddress"></AddressList>
        </div>
      </div>
    </template>
  </Prompt>
</template>

<script lang="ts">
import { ref } from "vue";
import AddressForm from "@/views/Admin/Components/AddressForm.vue";
export default {
  components: {
    AddressForm,
  },
  props: {},
  setup(props, { emit }) {
    const show = ref(false);
    const resolver = ref();
    const list = ref();
    const select = async (list) => {
      return new Promise((resolve, reject) => {
        resolver.value = resolve;
        list.value = list;
        show.value = true;
      });
    };
    const selectAddress = (address) => {};
    return {
      selectAddress,
      list,
      show,
    };
  },
};
</script>

<style scoped></style>
