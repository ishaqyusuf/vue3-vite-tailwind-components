<template>
  <Container class="">
    <div v-if="!isLoading" class="">
      <div class="grid sm:grid-cols-12 gap-10 items-center">
        <div class="inline-flex sm:col-span-4 space-x-2 items-center">
          <router-link
            :to="{
              name: 'parcels',
            }"
          >
            <Btn icon x-large> <i-mdi-arrow-left /> </Btn
          ></router-link>
          <div class="">
            <CardTitle lg class="uppercase tracking-wider">{{
              parcel.track_code
            }}</CardTitle>
            <CardSubtitle>{{ parcel.status }}</CardSubtitle>
          </div>
        </div>
        <ParcelTabs
          class="hidden sm:inline-flex pt-2 sm:col-span-8"
        ></ParcelTabs>
      </div>
      <div class="grid sm:grid-cols-12 gap-10">
        <div class="sm:col-span-4 flex flex-col">
          <OverviewCard></OverviewCard>
        </div>
        <ParcelTabs class="sm:hidden pt-2 sm:col-span-8"></ParcelTabs>
        <Card class="sm:col-span-8 py-4">
          <CardContent> <router-view></router-view></CardContent>
        </Card>
      </div>
    </div>
    <Loader v-else></Loader>
  </Container>
</template>

<script lang="ts">
import useParcel from "@/use/parcels/parcel";
import ClientCard from "@/views/Admin/Components/ClientCard.vue";
import OverviewCard from "@/views/Admin/Parcel/OverviewCard.vue";
import ParcelTabs from "@/views/Admin/Parcel/ParcelTabs.vue";
import { ref } from "vue";
export default {
  components: {
    ParcelTabs,
    ClientCard,
    OverviewCard,
  },
  props: {
    parcel_slug: String,
  },

  setup(props, { emit }) {
    useParcel.initParcelOverview(props.parcel_slug);
    // useUser
    //   .createUser(
    //     {
    //       first_name: "Ishaq",
    //       last_name: "Yusuf",
    //       email: "sample" + Date.now() + "@gmail.com",
    //       password: "Hello+world",
    //       role_id: 12,
    //     },
    //     {
    //       country: "Nigeria",
    //       state: "Kwara",
    //       city: "Ilorin",
    //       phone: {
    //         no: "8186877306",
    //         code: "+234",
    //       },
    //     }
    //   )
    //   .then((data) => {
    //     console.log(data);
    //   });
    return {
      date: ref(""),
      ...useParcel,
    };
  },
};
</script>

<style scoped></style>
