<template>
  <Card class="space-y-4">
    <CardTitle class="inline-flex border-b justify-between items-center">
      <span class="text-sm text-gray-700">Parcel Details</span>
      <Btn tertiary v-if="!editParcel" @click="editParcel = true">Edit</Btn>
    </CardTitle>
    <CardContent
      v-if="!editParcel"
      class="grid grid-cols-1 pb-4 items-center sm:grid-cols-3 gap-2"
    >
      <Label class="col:col-span-1">Client</Label>
      <div class="sm:col-span-2 inline-flex">
        <ClientCard :client="parcel.recipient">
          <template #empty>
            <Btn tertiary>
              <i-mdiAccountPlus />
              <span>Add Recipient</span>
            </Btn>
          </template>
        </ClientCard>
        <!-- <Btn tertiary>Change</Btn> -->
      </div>
      <template v-for="(item, index) in parcelView" :key="index">
        <Label class="sm:col-span-1">{{ item.title }}</Label>
        <span class="sm:col-span-2">{{ item.value }}</span>
      </template>
    </CardContent>
    <ParcelForm
      v-else
      :parcel="parcel"
      @close="editParcel = false"
    ></ParcelForm>
  </Card>
</template>

<script lang="ts">
import { ref, watch } from "vue";
import useParcel from "@/use/parcels/parcel";
import ParcelForm from "@/views/Admin/Parcel/ParcelForm.vue";
export default {
  props: {},
  components: {
    ParcelForm,
  },
  setup(props, { emit }) {
    const parcelView = ref<any[]>([]);
    watch(useParcel.parcel, (first, second) => initParcelView(second));
    const initParcelView = (parcel) => {
      console.log(parcel);
      const {
        length,
        width,
        weight,
        weight_unit,
        height,
        dimension_unit,
        track_code,
        description,
      } = parcel;
      parcelView.value = [
        // ["Track Code", track_code],
        ["Weight", [weight, weight_unit].filter(Boolean).join(" ")],
        [
          "Dimension",
          [
            [length, width, height].filter((v) => (!v ? "-" : v)).join("* "),
            dimension_unit,
          ].join(" "),
        ],
        ["Description", description],
      ].map((arr) => {
        return {
          title: arr[0],
          value: arr[1]?.trim() ?? "-",
        };
      });
    };

    return {
      ...useParcel,
      editParcel: ref(false),
      editRecipient: ref(false),
      parcelView,
    };
  },
};
</script>

<style scoped></style>
