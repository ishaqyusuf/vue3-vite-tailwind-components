<template>
  <div
    class="w-full items-center justify-center inline-flex text-sm text-gray-400"
    :class="{
      'rounded-tl-full rounded-bl-full pl-2': day.date == 7,
      'rounded-tr-full rounded-br-full': day.date == 14,
      'bg-gray-200': day.date >= 7 && day.date <= 14,
    }"
  >
    <slot>
      <TMenuItem>
        <button
          @click="selectDate"
          disabled
          :class="{
            'hover:bg-blue-600 hover:text-gray-200':
              !day.isSelected && !day.isDisabled,
            '': day.isDisabled,
            '': day.isHighlighted,
            'bg-blue-100': day.isToday && !day.isSelected && !day.isDisabled,
            'text-gray-700':
              !day.isWeekend && !day.isSelected && !day.isDisabled,
            'text-gray-400':
              day.isWeekend && !day.isSelected && !day.isDisabled,
            'bg-red-500 text-white': day.isSelected && !day.isDisabled,
            '': day.isSaturday,
            '': day.isSunday,
            '': day.isHighlighStart,
            '': day.isHighlighEnd,
          }"
          class="w-7 focus:outline-none h-7 rounded-full text-center inline-flex justify-center items-center"
        >
          {{ dayCellContent(day) }}
        </button>
      </TMenuItem>
    </slot>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { MenuItem } from "@headlessui/vue";
export default {
  components: {
    TMenuItem: MenuItem,
  },
  props: {
    day: { type: Object, required: true },
    header: Boolean,
    dayCellContent: {
      type: Function,
      default: (day) => day.date,
    },
  },
  setup(props, { emit }) {
    return {
      selectDate: () => {
        emit("pick");
      },
    };
  },
};
</script>

<style scoped></style>
