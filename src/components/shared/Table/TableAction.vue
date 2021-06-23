<template>
  <transition
    enter-active-class="transition transform duration-100 ease-out"
    enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100  opacity-100"
    leave-active-class="transition duration-75 ease-in"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0"
  >
    <App
      v-if="show && selection > 0"
      class="fixed left-0 w-full z-50 inline-flex origin-bottom justify-center shadow-xl bottom-0"
    >
      <div
        class="inline-flex item-center justify-between mb-4 space-x-2 sm:space-x-4 p-2 sm:p-4 rounded-full bg-black-800 text-gray-50"
      >
        <div class="inline-flex space-x-4 items-center" tertiary>
          <Btn icon @click="close"><i-mdi-close class="text-black-200" /></Btn>
          <div class="space-x-3">
            <span class="rounded-full px-2 bg-black-400 text-sm">{{
              selection
            }}</span>
            <span>items selected</span>
          </div>
        </div>
        <div class="inline-flex space-x-4">
          <Menu v-if="hasMore">
            <Btn dark rounded large color="black">
              <i-mdi-dots-horizontal />
              <span>More</span>
            </Btn>
            <template v-slot:items>
              <slot name="menu" />
            </template>
          </Menu>
          <slot name="more" />
          <Btn v-if="label" dark rounded large color="black">
            <i-mdi-printer />
            <span>Label</span>
          </Btn>
          <Btn v-if="print" dark rounded large color="black">
            <i-mdi-printer />
            <span>Print</span>
          </Btn>
          <Btn
            v-if="edit"
            @click="emitAction('delete')"
            dark
            rounded
            large
            color="black"
          >
            <i-carbon-edit />
            <span>Edit</span>
          </Btn>
          <Btn v-if="deletable" dark rounded large color="red-700">
            <i-carbon-delete />
            <span>Delete</span>
          </Btn>
        </div>
      </div>
    </App>
  </transition>
</template>

<script lang="ts">
import { IUseList } from "@/@types/Interface";
import { useListPropType } from "@/hooks/table";
import { ref, computed, watch } from "vue";

export default {
  props: {
    items: Object,
    show: Boolean,
    deletable: Boolean,
    edit: Boolean,
    print: Boolean,
    label: Boolean,
    hasMore: Boolean,
    useList: useListPropType(),
  },
  setup(props, { emit }) {
    const { data } = props.useList;
    const checkedCount = () => data.checkedIds.length;
    const selection = ref<number>(checkedCount());
    watch(data, (value, old) => {
      selection.value = checkedCount();
    });
    return {
      selection,
      close: () => {
        props.useList.clearChecks();
      },
      emitAction: (action) => {
        emit("emitAction", action);
      },
    };
  },
};
</script>

<style scoped></style>
