<template>
  <div class="bg-white">
    <div class="sm:max-w-6xl lg:max-w-5xl mx-auto p-4 py-6 sm:py-10 space-y-6">
      <div v-if="isLoading" class="flex justify-center items-center">
        <Spinner />
      </div>
      <div v-if="noResult"></div>
      <template v-else>
        <div
          :class="[
            !simple && 'bg-mat-gray-200 py-4 sm:py-6',
            !side && 'w-full',
          ]"
        >
          <div
            class="inline-flex justify-end"
            v-if="closable"
            :class="[!simple && 'p-4']"
          >
            <Btn icon class="group hover:shadow rounded-full" color="red"
              ><i-mdi-close class="group-hover:text-current"
            /></Btn>
          </div>
          <div class="grid grid-cols-12 gap-4">
            <slot></slot>
            <div
              v-if="dumped"
              class="space-y-3"
              :class="[simple ? 'col-span-12' : 'col-start-2 col-span-10']"
            >
              <div class="flex justify-between">
                <p class="text-lg">
                  <span class="font-semibold">Tracking Number:</span>
                  <span class="px-2 uppercase">{{ trackCode }}</span>
                </p>
                <Btn text v-if="!simple" @click="dumped = true">Remove</Btn>
              </div>
              <div
                class="text-lg flex flex-col py-4 space-y-2"
                v-if="noResult || result.in_system"
              >
                <span v-if="!simple" class="font-semibold pb-2">Status</span>
                <div v-if="result.in_system">
                  <span
                    class="text-sm font-semibold bg-primary p-1 tracking-widest uppercase"
                    >{{ result.parcel.created_at | dayjs("MMM DD, LT") }}</span
                  >
                </div>
                <span
                  class="text-xl font-semibold"
                  :class="[noResult ? 'text-red-600' : 'text-green-600']"
                >
                  {{ noResult ? "Status Not Available" : "New Record Entry." }}
                </span>
                <div class="text-base text-gray-600">
                  <span v-if="noResult"
                    >The tracking number may be incorrect or the status update
                    is not yet available. <br />
                    Please verify your tracking number and try again
                    later.</span
                  >
                  <div class="flex flex-col" v-else>
                    <span
                      v-if="location"
                      class="text-mat-gray-700 font-semibold space-x-1"
                    >
                      <ui-icon small>mdi-map-marker-outline</ui-icon>
                      <span>{{ location }}</span>
                    </span>
                    <div :v-html="result.default_status"></div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div v-if="canCreate" class="col-span-12 flex space-x-2 justify-end">
            <ui-btn @click="toggleEditor()" tile dark color="green">
              <ui-icon dark>mdi-plus</ui-icon>
              Update Track
            </ui-btn>
          </div> -->
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import trackerHook from "@/hooks/tracker";
import { computed, ref } from "@vue/runtime-core";

export default {
  props: {
    side: Boolean,
    simple: Boolean,
    closable: Boolean,
  },
  setup(props, { emit }) {
    return {
      dumped: ref(false),

      noResult: computed(
        () => !trackerHook.isLoading && (trackerHook.result.value as any).error
      ),
      ...trackerHook,
    };
  },
};
</script>

<style scoped></style>
