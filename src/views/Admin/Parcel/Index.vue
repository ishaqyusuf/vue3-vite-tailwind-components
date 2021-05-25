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
        <div class="sm:col-span-8 inline-flex flex-col">
          <router-view></router-view>
        </div>
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
export default {
  components: {
    ParcelTabs,
    ClientCard,
    OverviewCard,
  },
  props: {
    slug: String,
  },

  setup(props, { emit }) {
    useParcel.initParcelOverview(props.slug);
    return {
      ...useParcel,
    };
  },
};
</script>

<style scoped></style>
