<template>
  <Container class="">
    <div class="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6">
      <div v-if="!isLoading" class="sm:col-span-4">
        <div class="inline-flex space-x-2 items-center">
          <router-link
            :to="{
              name: 'parcels',
            }"
          >
            <Btn icon x-large> <i-mdi-arrow-left /> </Btn
          ></router-link>
          <div class="">
            <CardTitle lg>{{ parcel.track_code }}</CardTitle>
            <CardSubtitle>{{ parcel.status }}</CardSubtitle>
          </div>
        </div>

        <OverviewCard></OverviewCard>
      </div>
      <div class="sm:col-span-8 inline-flex flex-col">
        <Card class="inline-flex space-x-2 w-full items-start px-4">
          <Link
            :to="{ query: { tab: 'tracking' } }"
            class="border-b-4 py-1 px-2 border-purple-500"
            >Tracking</Link
          >
        </Card>
        <router-view></router-view>
        {{ isLoading }}
      </div>
    </div>
  </Container>
</template>

<script lang="ts">
import { ref, toRefs } from "vue";
import useParcel from "@/use/parcels/parcel";
import { Parcel } from "@/@types/Interface";
import ParcelForm from "@/views/Admin/Parcel/ParcelForm.vue";
import ClientCard from "@/views/Admin/Components/ClientCard.vue";
export default {
  components: {
    ParcelForm,
    ClientCard,
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
