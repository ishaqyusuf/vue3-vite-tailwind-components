<template>
  <div>
    <Card class="max-w-xs">
      <div class="inline-flex p-4 justify-between items-center">
        <Btn icon @click="isRtl ? nextMonth() : previousMonth()"
          ><i-mdi-chevron-left
        /></Btn>
        <Btn text class="w-full" @click="showMonthCalendar">
          <!-- {{ currentTitle }} -->
          {{ state.currMonthName }}
          {{ state.currYearName }}
        </Btn>
        <Btn icon @click="isRtl ? previousMonth() : nextMonth()"
          ><i-mdi-chevron-right
        /></Btn>
      </div>
      <CardContent class="py-4 grid grid-cols-7 grid-rows-7">
        <div
          class="w-full items-center justify-center inline-flex text-sm text-gray-400"
          v-for="d in daysOfWeek"
          :key="d.timestamp"
        >
          <span>{{ d }}</span>
        </div>
        <DateCell
          v-for="day in days"
          :day-cell-content="dayCellContent"
          :day="day"
          :key="day.timestamp"
          @pick="selectDate(day)"
        ></DateCell>
      </CardContent>
    </Card>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref } from "vue";

import { useDate } from "./useDate";
export default {
  props: {
    showDayView: Boolean,
    selectedDate: Date,
    pageDate: Date,
    pageTimestamp: Number,
    fullMonthName: Boolean,
    allowedToShowView: Function,
    dayCellContent: {
      type: Function,
      default: (day) => day.date,
    },
    disabledDates: {
      type: Object,
      default: () => {
        dates: [];
      },
    },
    highlighted: Object,
    calendarClass: [String, Object, Array],
    calendarStyle: Object,
    translation: Object,
    isRtl: Boolean,
    mondayFirst: Boolean,
    useUtc: Boolean,
  },
  setup(props, { emit }) {
    const useDateUtil = useDate(props, emit);
    onMounted(() => {});
    return {
      ...useDateUtil,
    };
  },
};
</script>

<style scoped></style>
