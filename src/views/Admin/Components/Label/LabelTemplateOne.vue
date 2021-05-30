<template>
  <div class="bg-white z-10 flex pr-1" style="padding-bottom: 0.5in !important">
    <div
      class="border-2 border-gray-700 grid grid-rows-2 w-full font-semibold text-gray-900"
      id="print-border"
    >
      <div class="row-span-1 flex flex-col border-b-2 border-gray-700">
        <div class="p-2 flex justify-between">
          <div class="space-y-1 w-2/3">
            <!-- <span class="text-sm font-bold">EXPRESS AIR FREIGHT</span> -->
            <span
              :class="item.style"
              class="leading-none block"
              v-for="(item, index) in data.company"
            >
              {{ item.value }}
            </span>
            <span class="text-xs tracking-widest">{{
              $dayjs.format(data.parcel.created_at, "YYYY-MM-DD")
            }}</span>
          </div>
          <Logo sm dark></Logo>
        </div>
        <div class="border-b-2 border-gray-700 flex flex-1 p-2">
          <div class="flex-1 flex flex-col uppercase text-sm text-gray-700">
            <span class="font-bold pb-1">Ship To:</span>
            <span
              :class="item.style"
              class="leading-none"
              v-for="(item, index) in data.composer.client"
            >
              {{ item.value }}
            </span>
          </div>
        </div>

        <div
          class="py-2 text-center text-5xl uppercase tracking-wide font-bold"
        >
          {{ data.onHandId }}
        </div>
      </div>
      <div class="row-span-1">
        <div class="border-b border-gray-700 flex">
          <div class="flex justify-between w-full text-xs font-semibold p-2">
            <div class="flex w-1/2">
              <div class="flex flex-col mr-3">
                <span class="leading-none pb-1">Ref</span>
                <span class="text-lg leading-none">-</span>
              </div>
              <div class="flex flex-col mr-3">
                <span class="leading-none pb-1">Dim</span>
                <span class="text-lg leading-none tracking-wider">{{
                  data.dimension
                }}</span>
              </div>
            </div>
            <div class="flex">
              <div class="flex flex-col mr-3">
                <span class="leading-none pb-1">Weight</span>
                <span class="text-lg leading-none uppercase tracking-wider">{{
                  data.weight
                }}</span>
              </div>
              <div class="flex flex-col">
                <span class="leading-none pb-1">Piece</span>
                <span class="text-lg leading-none">-</span>
              </div>
            </div>
          </div>
        </div>
        <!-- </div> -->
        <div
          id="bc1"
          style="height: 1.5in"
          class="flex flex-col items-center border-b-2 border-gray-700"
        >
          <Barcode
            :value="data.parcel.track_code"
            class="w-3/4"
            style="height: 1in"
            :options="{ displayValue: false }"
          ></Barcode>
          <div class="w-2/3 text-justify">
            <span
              class="track-code leading-none block text-center uppercase tracking-widest"
              >{{ data.parcel.track_code }}</span
            >
          </div>
        </div>
        <div id="bc2" class="flex justify-center" style="height: 0.6in">
          <Barcode
            :value="data.onHandId"
            class="w-4/5"
            :options="{ displayValue: false }"
          >
          </Barcode>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

import Barcode from "@/views/Admin/Components/Label/Barcode.vue";
export default {
  props: {
    data: { required: true, type: Object },
  },
  components: {
    Barcode,
  },
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.border* {
  --tw-border-opacity: 1;
  border-color: rgba(55, 65, 81, var(--tw-border-opacity));
}
.track-code {
  word-wrap: break-word;
  overflow-wrap: break-word;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;
}
</style>
