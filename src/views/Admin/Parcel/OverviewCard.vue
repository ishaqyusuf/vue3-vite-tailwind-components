<template>
  <Card class="space-y-4">
    <CardTitle class="inline-flex border-b justify-between items-center">
      <span class="text-lg text-gray-700">Parcel Details</span>
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
            <Btn tertiary @click="selectUser">
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
    <ParcelForm v-else :parcel="parcel" @close="closeParcelForm"></ParcelForm>
    <UserList ref="userls"></UserList>
  </Card>
</template>

<script lang="ts">
import { ref, watch, onMounted } from "vue";
import useParcel from "@/use/parcels/parcel";
import ParcelForm from "@/views/Admin/Parcel/ParcelForm.vue";
import ClientCard from "@/views/Admin/Components/ClientCard.vue";
import UserList from "@/views/Admin/Components/UserList.vue";
export default {
  props: {},
  components: {
    ClientCard,
    ParcelForm,
    UserList,
    // UserList: () => import("@/views/Admin/Components/UserList.vue"),
  },
  setup(props, { emit }) {
    onMounted(() => {});
    const userls = ref();
    const closeParcelForm = () => {
      useParcel.initParcelView();
      editParcel.value = false;
    };
    const editParcel = ref(false);
    const selectUser = () => {
      userls.value.open().then((user) => {
        console.log(user.id);
      });
    };
    return {
      closeParcelForm,
      selectUser,
      userls,
      editParcel,
      ...useParcel,
      editRecipient: ref(false),
    };
  },
};
</script>

<style scoped></style>
