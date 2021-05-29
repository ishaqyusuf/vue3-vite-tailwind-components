<template>
  <Card class="space-y-2">
    <CardTitle class="inline-flex border-b justify-between items-center">
      <span class="text-lg text-gray-700">Parcel Details</span>
      <Btn tertiary v-if="!editParcel" @click="editParcel = true">Edit</Btn>
    </CardTitle>
    <CardContent
      v-if="!editParcel"
      class="grid grid-cols-1 space-y-3 pb-4 items-center sm:grid-cols-3 gap-2"
    >
      <div class="sm:col-span-3 inline-flex items-center justify-between">
        <ClientCard :client="parcel.recipient" class="w-full">
          <template #empty>
            <UserSelector @selected="updateRecipient({ user_id: $event.id })">
              <template v-slot:btn="{ open }">
                <Btn @click="open">
                  <i-mdi-account-plus-outline />
                  <span>Add Client</span>
                </Btn>
              </template>
            </UserSelector>
          </template>
        </ClientCard>
        <Btn
          v-if="parcel.recipient"
          color="red-500"
          @click="updateRecipient({ user_id: null })"
          text
          >Remove</Btn
        >
      </div>
      <template v-for="(item, index) in parcelView" :key="index">
        <Label class="sm:col-span-1">{{ item.title }}</Label>
        <span class="sm:col-span-2">{{ item.value }}</span>
      </template>
    </CardContent>
    <ParcelForm v-else :parcel="parcel" @close="closeParcelForm"></ParcelForm>
  </Card>
</template>

<script lang="ts">
import { ref, watch, onMounted } from "vue";
import useParcel from "@/use/parcels/parcel";
import ParcelForm from "@/views/Admin/Parcel/ParcelForm.vue";
import ClientCard from "@/views/Admin/Components/ClientCard.vue";
import UserSelector from "@/views/Admin/Components/UserSelector.vue";
export default {
  props: {},
  components: {
    UserSelector,
    ClientCard,
    ParcelForm,
  },
  setup(props, { emit }) {
    onMounted(() => {});
    const closeParcelForm = () => {
      useParcel.initParcelView();
      editParcel.value = false;
    };
    const editParcel = ref(false);
    const updateRecipient = (form) => {
      useParcel.updateParcel(form);
    };

    return {
      updateRecipient,
      closeParcelForm,
      editParcel,
      ...useParcel,
      editRecipient: ref(false),
    };
  },
};
</script>

<style scoped></style>
