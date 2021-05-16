<template>
  <div class="flex">
    <div class="w-1/6 relative" v-if="mapping">
      <div class="flex justify-center items-center h-full">
        <div class="bg-transparent">
          <div
            class="w-6 h-6 rounded-full bg-white border-2 border-gray-400 flex justify-center items-center"
          >
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div class="absolute w-1 h-full grid grid-rows-2">
          <div
            :class="[index == 0 && 'opacity-0']"
            class="border-r-2 border-gray-400"
          ></div>
          <div
            :class="[last && 'opacity-0']"
            class="border-r-2 border-gray-400"
          ></div>
        </div>
      </div>
    </div>
    <div class="flex-1 py-1">
      <div class="border-b flex space-x-3" :class="[simple ? 'pb-2' : 'py-2']">
        <div class="flex-1 space-y-3">
          <div class="flex items-center space-x-1 text-gray-700">
            <span
              class="text-sm font-semibold bg-primary mr-1 px-1 tracking-widest uppercase"
              >{{ $dayjs.format(item.created_at, "MMM DD") }}</span
            >
            <template v-if="item.location">
              <i-mdi-map-marker-outline class="text-sm" />
              <span>{{ item.location }}</span>
            </template>
          </div>
          <div class="">
            <span
              class="text-lg block leading-none font-semibold text-gray-600"
            >
              {{ item.status }}
            </span>
            <span
              v-if="item.content"
              class="sm:w-2/3 lg:w-4/5 block text-base text-mat-gray-700"
              >{{ item.content }}</span
            >
          </div>
        </div>
        <div class="inline-block space-x-2" v-if="editable">
          <!-- <div class="flex space-x-2"> -->
          <span
            v-if="item.secondary"
            class="bg-green-100 rounded-lg px-1 text-green-800 text-sm"
            >Shipment
          </span>
          <template v-else>
            <!-- <x-confirmation-button test @confirmed="$emit('deleteTracking')">
              <ui-btn class="group hover:text-red-400" icon>
                <ui-icon class="group-hover:text-current"
                  >mdi-trash-can-outline</ui-icon
                >
              </ui-btn>
            </x-confirmation-button> -->

            <Btn
              class="group hover:text-green-400"
              @click="editTracking"
              icon
              exact
            >
              <i-mdi-clipboard-edit-outline class="group-hover:text-current" />
            </Btn>
          </template>
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      },
    },
    index: {},
    editable: Boolean,
    simple: Boolean,
    last: Boolean,
    mapping: Boolean,
  },
  setup(props, { emit }) {
    const editTracking = () => {};
    return {
      editTracking,
    };
  },
};
</script>

<style scoped></style>
