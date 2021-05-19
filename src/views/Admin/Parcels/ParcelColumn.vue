<template>
  <input type="hidden" id="copy-track" v-model="item.track_code" />
  <div class="relative">
    <div
      v-if="headerHover || floatingMenuHover"
      @mouseenter="floatingMenuMouseEnter"
      @mouseleave="floatingMenuMouseLeave"
      class="-translate-y-10 transform transition-all absolute h-0 top-0 right-0 w-full"
    >
      <div class="shadow-lg inline-flex flex-col items-center">
        <button
          @click="copy"
          class="p-2 sm:px-4 rounded-lg bg-black text-white hover:bg-blue-700 focus:outline-none shadow-lg m-0"
        >
          copy
        </button>
        <svg
          class="-translate-y-2 w-5 h-5 transform rotate-90 transition-all"
          viewBox="0 0 24 24"
        >
          <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
        </svg>
      </div>
    </div>
    <router-link
      class="space-y-1"
      :to="{
        query: {
          popup_action: 'parcel_data',
          pid: item.track_code,
        },
        params: {
          pop_up: 'yes',
        },
      }"
    >
      <Truncify
        class="table table-fixed text-left uppercase font-medium tracking-widest"
      >
        {{ item.track_code }}
      </Truncify>

      <div class="hidden md:flex font-semibold text-xs space-x-1">
        <template v-for="(item, index) in item.details" :key="index">
          <router-link v-if="item.to" :to="item.to" disabled>
            <span
              :class="[`bg-${item.style}-${itemHover ? '800' : '100'}`]"
              class="rounded-lg shadow-lg px-1"
              >{{ item.value }}</span
            >
          </router-link>
          <span
            v-else
            :class="[`bg-${item.style}-${itemHover ? '800' : '100'}`]"
            class="rounded-lg shadow-lg px-1"
            >{{ item.value }}</span
          >
        </template>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import alert from "@/hooks/alert";
export default {
  props: {
    item: { type: Object, required: true },
    header: { type: Object, required: true },
  },
  setup(props, { emit }) {
    const copier = ref();
    const itemHover = ref(false);
    const floatingMenuHover = ref(false);
    return {
      copier,
      floatingMenuHover,
      headerHover: computed(() => props.header.hover),
      itemHover,
      floatingMenuMouseEnter: () => {
        floatingMenuHover.value = true;
      },
      floatingMenuMouseLeave: () => {
        floatingMenuHover.value = false;
      },
      copy: () => {
        let testingCodeToCopy: any = document.querySelector("#copy-track");
        testingCodeToCopy.setAttribute("type", "text");
        testingCodeToCopy.select();

        try {
          var successful = document.execCommand("copy");
          var msg = successful ? "successful" : "unsuccessful";
          alert.register("Tracking Code has been copied to clipboard");
        } catch (err) {
          //
        }

        /* unselect the range */
        testingCodeToCopy.setAttribute("type", "hidden");
        //   window.getSelection().removeAllRanges();
      },
    };
  },
};
</script>

<style scoped></style>
