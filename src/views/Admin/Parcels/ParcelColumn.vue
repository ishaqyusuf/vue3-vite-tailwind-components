<template>
  <input type="hidden" id="copy-track" v-model="item.track_code" />
  <div class="relative">
    <!-- <AnimatedContainer as="template"> -->
    <div
      v-if="itemHover || floatingMenuHover"
      @mouseenter="floatingMenuMouseEnter"
      @mouseleave="floatingMenuMouseLeave"
      class="absolute transform -translate-y-12 h-0 top-0 right-0 w-full"
    >
      <div class="inline-flex flex-col items-center">
        <button
          @click="copy"
          class="p-2 sm:px-4 rounded-lg bg-black-900 text-white hover:bg-blue-700 focus:outline-none shadow-lg m-0"
        >
          copy
        </button>
        <i-mdiPlay class="w-5 h-5 transform rotate-90 -translate-y-2" />
      </div>
    </div>
    <!-- </AnimatedContainer> -->
    <router-link
      @mouseenter="linkMouseEnter"
      @mouseleave="linkMouseLeave"
      class="space-y-1 hover:bg-gray-200"
      :to="item.to"
    >
      <Truncify
        class="table table-fixed text-left uppercase text-gray-600 font-medium tracking-widest hover:text-blue-500"
      >
        {{ item.track_code }}
      </Truncify>

      <div class="hidden md:inline-flex font-semibold text-xs space-x-1">
        <template v-for="(detail, index) in item.details" :key="index">
          <router-link v-if="detail.to" :to="detail.to" disabled>
            <ColorLabel :color="detail.style">
              {{ detail.value }}
            </ColorLabel>
          </router-link>
          <ColorLabel v-else :color="detail.style">
            {{ detail.value }}
          </ColorLabel>
        </template>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import alert from "@/hooks/alert";
import time from "@/hooks/time";
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
      floatingMenuMouseEnter: async () => {
        await time.delay(3000);
        floatingMenuHover.value = true;
      },
      floatingMenuMouseLeave: async () => {
        await time.delay(100);
        floatingMenuHover.value = false;
      },
      linkMouseEnter: async () => {
        await time.delay(200);
        itemHover.value = true;
      },
      linkMouseLeave: async () => {
        await time.delay(200);
        itemHover.value = false;
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
