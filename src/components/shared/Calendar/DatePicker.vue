<template>
  <Menu no-width>
    <Input readonly :valueFormat="inputFormatter" v-model="correctDate">
      <template #prependInner>
        <i-mdi-calendar-outline />
      </template>
    </Input>
    <template #items>
      <PickerDay
        class="w-72"
        :pageDate="pageDate"
        :selectedDate="selectedDate"
        :showDayView="showDayView"
        :fullMonthName="fullMonthName"
        :disabledDates="disabledDates"
        :highlighted="highlighted"
        :calendarStyle="calendarStyle"
        :translation="translation"
        :pageTimestamp="pageTimestamp"
        :isRtl="isRtl"
        :mondayFirst="mondayFirst"
        :dayCellContent="dayCellContent"
        :use-utc="useUtc"
        @selectDate="selectDate"
        @changedMonth="handleChangedMonthFromDayPicker"
        @showMonthCalendar="showMonthCalendar"
        @selectedDisabled="selectDisabledDate"
      />
    </template>
  </Menu>
</template>

<script lang="ts">
import { computed, ref } from "vue";

import en from "./locale/translations/en";
import utils, { makeDateUtils } from "./useDateUtils";
import { useDatePicker } from "./useDatePicker";
export default {
  props: {
    modelValue: {
      validator: (val) => utils.validateDateInput(val),
    },
    name: String,
    refName: String,
    id: String,
    format: {
      type: [String, Function],
      default: "dd MMM yyyy",
    },
    language: {
      type: Object,
      default: () => en,
    },
    openDate: {
      validator: (val) => utils.validateDateInput(val),
    },
    dayCellContent: Function,
    fullMonthName: Boolean,
    disabledDates: {
      type: Object,
      default: () => {
        dates: [];
      },
    },
    highlighted: Object,
    placeholder: String,
    inline: Boolean,
    calendarClassdisabledDates: [String, Object, Array],
    inputClass: [String, Object, Array],
    wrapperClass: [String, Object, Array],
    mondayFirst: Boolean,
    clearButton: Boolean,
    clearButtonIcon: String,
    calendarButton: Boolean,
    calendarButtonIcon: String,
    calendarButtonIconContent: String,
    bootstrapStyling: Boolean,
    initialView: String,
    disabled: Boolean,
    required: Boolean,
    typeable: Boolean,
    useUtc: Boolean,
    minimumView: {
      type: String,
      default: "day",
    },
    maximumView: {
      type: String,
      default: "year",
    },
  },
  setup(props, { emit }) {
    const startDate = props.openDate ? new Date(props.openDate) : new Date();
    const constructedDateUtils = makeDateUtils(props.useUtc);
    const uDatePicker = useDatePicker(props, emit, constructedDateUtils);
    const pageTimestamp = constructedDateUtils.setDate(startDate, 1);

    const translation = computed(() => {
      return props.language;
    });
    const isInline = computed(() => {
      return !!props.inline;
    });

    return {
      ...uDatePicker,

      utils: constructedDateUtils,
      pageDate: computed(() => {
        return new Date(pageTimestamp);
      }),
      translation,
      calendarStyle: computed(() => {
        return {
          position: isInline.value ? "static" : undefined,
        };
      }),
      isInline,
      isRtl: computed(() => {
        return translation.value.rtl === true;
      }),
      inputFormatter: (selectedDate) => {
        if (!selectedDate) {
          return null;
        }
        if (props.typedDate) {
          return props.typedDate;
        }
        return typeof props.format === "function"
          ? props.format(selectedDate)
          : constructedDateUtils.formatDate(
              new Date(selectedDate),
              props.format,
              props.translation
            );
      },
    };
  },
};
</script>

<style scoped></style>
