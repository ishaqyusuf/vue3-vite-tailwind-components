<template>
  <div class="grid grid-cols-12">
    <Label class="col-span-5 mt-2">{{ data.title }}</Label>
    <div class="col-span-7">
      <Input readonly @click="selectAddress" v-if="!address" />
      <div v-else class="text-gray-600">
        <span class="text-base font-semibold text-gray-700">
          {{ address.name }}
        </span>
        <Truncify>{{ address.address_1 }}</Truncify>
        <Truncify>{{ address.line_1 }}</Truncify>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useMetaDataApi from "@/use/api/use-meta-data-api";
import useAddressBook from "@/use/list/use-address-book";
import { computed, ref } from "vue";
import { pick } from "lodash";
export default {
  props: {
    label: String,
    subtitle: String,
    picker: Object,
    data: { required: true, type: Object },
  },
  setup(props, { emit }) {
    const address = computed(
      () => useAddressBook.list.itemByIds.value[props.data.post_parent]
    );
    const selectAddress = async () => {
      props.picker.select().then(async (post_parent) => {
        if (post_parent) {
          const data = await useMetaDataApi.save(
            props.data.id,
            {
              data: {
                ...pick(props.data, ["id", "title", "type"]),
                ...{ post_parent },
              },
            },
            {
              success: "Saved",
              showError: true,
              error: "Something went wrong!",
            }
          );
          if (data && data.id) {
            props.data.id = data.id;
            props.data.post_parent = post_parent;
          }
        }
      });
    };
    return {
      address,
      selectAddress,
    };
  },
};
</script>

<style scoped></style>
