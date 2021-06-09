<template>
  <div class="grid grid-cols-12">
    <Label class="col-span-5 mt-2">{{ data.title }}</Label>
    <div class="col-span-7" @click="selectAddress">
      <Input readonly v-if="!address" />
      <div v-else class="text-gray-600 cursor-pointer">
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
import alert from "@/hooks/alert";
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
      if (useAddressBook.list.isEmpty.value) {
        alert.error("No Address to select from, Create new address.");
        return;
      }
      props.picker.select().then(async (post_parent) => {
        if (post_parent) {
          var _data = {
            ...pick(props.data, ["id", "title", "type"]),
            ...{ post_parent },
          };
          console.log(_data);
          const data = await useMetaDataApi.save(
            props.data.id,
            {
              data: _data,
            },
            {
              success: "Saved",
              showError: true,
              error: "Something went wrong!",
            }
          );
          if (data && data.id) {
            console.log(data);
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
