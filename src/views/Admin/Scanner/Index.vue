<template>
  <div>
    <Card tile class="flex flex-col items-center justify-between p-10">
      <div class="w-4/5 relative space-y-3">
        <div class="flex relative">
          <Input
            name="scan-input"
            class="w-full text-5xl text-center"
            placeholder="Enter/Scan Tracking Code"
            @keyup.enter="performScan"
            center-text
            v-model="scanCode"
          />
          <Spinner class="absolute mx-2 top-1/3 right-0" v-if="scanning" />
        </div>

        <div class="sflex flex-col hidden">
          <div class="inline-flex">
            <Spacer />
            <Btn text @click="reloadPkgData">Reset Default</Btn>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4">
            <div class="col-span-1 space-y-2 sm:col-span-6 lg:col-span-4">
              <Input
                combobox
                label="Courier"
                :items="dataLoader.couriers"
                dense
                class="sm:col-span-2"
                v-model="form.courier"
              />
              <div class="space-y-1">
                <Label>Recipient</Label>
                <div class="inline-flex w-full items-center justify-between">
                  <ClientCard class="w-full" :client="recipient">
                    <template #empty>
                      <Input readonly dense @click="openRecipient" class="" />
                    </template>
                  </ClientCard>
                  <Btn v-if="recipient.id" icon @click="recipient = {}">
                    <i-mdi-close-circle-outline class="text-red-600"
                  /></Btn>
                </div>
              </div>
            </div>
            <div class="col-span-1 space-y-2 sm:col-span-6 lg:col-span-4">
              <Input
                dense
                class="sm:col-span-2"
                label="Weight"
                :suffix="form.weight_unit"
                v-model="form.weight"
              />
              <div class="space-y-1">
                <Label class="sm:col-span-1">Dimension</Label>
                <div class="sm:col-span-2 inline-flex items-center space-x-1">
                  <Input dense placeholder="L" v-model="form.length" />
                  <span class="text-black-300">*</span>
                  <Input dense placeholder="W" v-model="form.width" />
                  <span class="text-black-300">*</span>
                  <Input
                    dense
                    placeholder="H"
                    suffix="in"
                    v-model="form.height"
                  />
                </div>
              </div>
            </div>
            <div class="col-span-1 space-y-2 sm:col-span-6 lg:col-span-4">
              <Input
                dense
                class="sm:col-span-2"
                label="Description"
                textarea
                v-model="form.description"
              />
            </div>
          </div>
        </div>
        <UserList title="Select Client" ref="userls"></UserList>
      </div>

      <!-- @change="saveState('track_code', form.track_code)" -->
    </Card>
    <Parcels
      title="Scans Today"
      :query="{ today: true, by_me: true }"
      ref="parcelList"
    ></Parcels>
  </div>
</template>

<script lang="ts">
import Index from "@/views/Admin/Parcels/Index.vue";
import dataLoader from "@/hooks/dataLoader";
import { onMounted, ref } from "vue";
import { Parcel } from "@/@types/Interface";
import UserList from "@/views/Admin/Components/UserList.vue";
import ClientCard from "@/views/Admin/Components/ClientCard.vue";
import parcel from "@/use/parcels/parcel";
import alert from "@/hooks/alert";
export default {
  props: {},
  components: {
    ClientCard,
    UserList,
    Parcels: Index,
  },
  setup(props, { emit }) {
    dataLoader.initCouriers();
    // const list = useList();
    const setData = (value) => {
      form.value = Object.assign(form.value, value);
    };

    const scanCode = ref();
    const parcelList = ref();

    const scanning = ref(false);
    const recipient = ref<any>({});
    const form = ref<Parcel>({});

    const list = ref();
    onMounted(() => {
      dataLoader.initPkgData(setData);
      list.value = parcelList.value.list;
    });
    const performScan = async () => {
      const data: any = form.value;
      data.user_id = recipient.value?.id;
      const _data = await parcel.createOne({ data });
      if (_data.id) {
        list.value.updateItem(_data.id, _data, false);
        alert.success("Parcel Scanned");
      }
    };

    const openRecipient = () => {
      userls.value.open().then((user) => {
        if (user) {
          recipient.value = user;
        }
      });
    };
    const userls = ref();
    const userInput = ref();
    return {
      list,
      userls,
      recipient,
      reloadPkgData: () => {
        dataLoader.initPkgData(setData);
      },
      userInput,
      scanCode,
      dataLoader,
      parcelList,
      form,
      scanning,
      performScan,
      openRecipient,
    };
  },
};
</script>

<style scoped></style>
