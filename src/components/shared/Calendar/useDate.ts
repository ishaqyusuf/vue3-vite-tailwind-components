import { ref, computed, reactive } from "vue";
import { makeDateUtils } from "./useDateUtils";
export function useDate(props, emit) {
  const utils = makeDateUtils(props.useUtc);
  const days = ref<any[]>([]);
  const blankDays = ref<number>(0);
  const daysOfWeek = ref<any[]>([]);
  const state = reactive({
    currMonthName: "",
    currYearName: "",
  });

  const refreshDates = () => {
    const d = props.pageDate;
    let _days: any[] = [];
    // set up a new date object to the beginning of the current 'page'
    let dObj = props.useUtc.value
      ? new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1))
      : new Date(
          d.getFullYear(),
          d.getMonth(),
          1,
          d.getHours(),
          d.getMinutes()
        );
    let daysInMonth = utils.daysInMonth(
      utils.getFullYear(dObj),
      utils.getMonth(dObj)
    );
    for (let i = 0; i < daysInMonth; i++) {
      _days.push({
        date: utils.getDate(dObj),
        timestamp: dObj.getTime(),
        isSelected: isSelectedDate(dObj),
        isDisabled: isDisabledDate(dObj),
        isHighlighted: isHighlightedDate(dObj),
        isHighlightStart: isHighlightStart(dObj),
        isHighlightEnd: isHighlightEnd(dObj),
        isToday: utils.compareDates(dObj, new Date()),
        isWeekend: utils.getDay(dObj) === 0 || utils.getDay(dObj) === 6,
        isSaturday: utils.getDay(dObj) === 6,
        isSunday: utils.getDay(dObj) === 0,
      });
      utils.setDate(dObj, utils.getDate(dObj) + 1);
    }
    days.value = _days;
  };

  function initDaysOfWeek() {
    if (props.mondayFirst) {
      const tempDays = props.translation.days.slice();
      tempDays.push(tempDays.shift());
      daysOfWeek.value = tempDays;
      return;
    }
    daysOfWeek.value = props.translation.days;
  }
  function setBlankDays() {
    const d = props.pageDate;
    let dObj = props.useUtc
      ? new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1))
      : new Date(
          d.getFullYear(),
          d.getMonth(),
          1,
          d.getHours(),
          d.getMinutes()
        );
    if (props.mondayFirst) {
      blankDays.value = utils.getDay(dObj) > 0 ? utils.getDay(dObj) - 1 : 6;
    } else blankDays.value = utils.getDay(dObj);
  }
  const setMonthName = () => {
    const monthName = props.fullMonthName
      ? props.translation.months
      : props.translation.monthsAbbr;
    state.currMonthName = utils.getMonthNameAbbr(
      utils.getMonth(props.pageDate),
      monthName
    );
  };
  function setYearName() {
    const yearSuffix = props.translation.yearSuffix;
    state.currYearName = `${utils.getFullYear(props.pageDate)}${yearSuffix}`;
  }
  function isYmd() {
    return props.translation.ymd && props.translation.ymd === true;
  }
  function isLeftNavDisabled() {
    return props.isRtl
      ? isNextMonthDisabled() //props.pageTimestamp)
      : isPreviousMonthDisabled(); //this.pageTimestamp)
  }
  function isRightNavDisabled() {
    return props.isRtl
      ? isPreviousMonthDisabled() //props.pageTimestamp)
      : isNextMonthDisabled(); //this.pageTimestamp)
  }
  function selectDate(date) {
    if (date.isDisabled) {
      emit("selectedDisabled", date);
      return false;
    }
    emit("selectDate", date);
  }
  function getPageMonth() {
    return utils.getMonth(props.pageDate);
  }
  function showMonthCalendar() {
    emit("showMonthCalendar");
  }
  function changeMonth(incrementBy) {
    let date = props.pageDate;
    utils.setMonth(date, utils.getMonth(date) + incrementBy);
    emit("changedMonth", date);
    refreshPage();
  }
  function previousMonth() {
    if (!isPreviousMonthDisabled()) {
      changeMonth(-1);
    }
  }
  function isPreviousMonthDisabled() {
    if (!props.disabledDates || !props.disabledDates.to) {
      return false;
    }
    let d = props.pageDate;
    return (
      utils.getMonth(props.disabledDates.to) >= utils.getMonth(d) &&
      utils.getFullYear(props.disabledDates.to) >= utils.getFullYear(d)
    );
  }
  function refreshPage() {
    refreshDates();
    setMonthName();
    setYearName();
    setBlankDays();
  }
  function nextMonth() {
    if (!isNextMonthDisabled()) {
      changeMonth(+1);
    }
  }
  function isNextMonthDisabled() {
    if (!props.disabledDates || !props.disabledDates.from) {
      return false;
    }
    let d = props.pageDate;
    return (
      utils.getMonth(props.disabledDates.from) <= utils.getMonth(d) &&
      utils.getFullYear(props.disabledDates.from) <= utils.getFullYear(d)
    );
  }
  function isSelectedDate(dObj) {
    return props.selectedDate && utils.compareDates(props.selectedDate, dObj);
  }
  function isDisabledDate(date) {
    let disabledDates = false;

    if (typeof props.disabledDates === "undefined") {
      return false;
    }

    if (typeof props.disabledDates.dates !== "undefined") {
      props.disabledDates.dates.forEach((d) => {
        if (utils.compareDates(date, d)) {
          disabledDates = true;
          return true;
        }
      });
    }
    if (
      typeof props.disabledDates.to !== "undefined" &&
      props.disabledDates.to &&
      date < props.disabledDates.to
    ) {
      disabledDates = true;
    }
    if (
      typeof props.disabledDates.from !== "undefined" &&
      props.disabledDates.from &&
      date > props.disabledDates.from
    ) {
      disabledDates = true;
    }
    if (typeof props.disabledDates.ranges !== "undefined") {
      props.disabledDates.ranges.forEach((range) => {
        if (
          typeof range.from !== "undefined" &&
          range.from &&
          typeof range.to !== "undefined" &&
          range.to
        ) {
          if (date < range.to && date > range.from) {
            disabledDates = true;
            return true;
          }
        }
      });
    }
    if (
      typeof props.disabledDates.days !== "undefined" &&
      props.disabledDates.days.indexOf(utils.getDay(date)) !== -1
    ) {
      disabledDates = true;
    }
    if (
      typeof props.disabledDates.daysOfMonth !== "undefined" &&
      props.disabledDates.daysOfMonth.indexOf(utils.getDate(date)) !== -1
    ) {
      disabledDates = true;
    }
    if (
      typeof props.disabledDates.customPredictor === "function" &&
      props.disabledDates.customPredictor(date)
    ) {
      disabledDates = true;
    }
    return disabledDates;
  }
  function isHighlightedDate(date) {
    if (
      !(props.highlighted && props.highlighted.includeDisabled) &&
      isDisabledDate(date)
    ) {
      return false;
    }

    let highlighted = false;

    if (typeof props.highlighted === "undefined") {
      return false;
    }

    if (typeof props.highlighted.dates !== "undefined") {
      props.highlighted.dates.forEach((d) => {
        if (utils.compareDates(date, d)) {
          highlighted = true;
          return true;
        }
      });
    }

    if (isDefined(props.highlighted.from) && isDefined(props.highlighted.to)) {
      highlighted =
        date >= props.highlighted.from && date <= props.highlighted.to;
    }

    if (
      typeof props.highlighted.days !== "undefined" &&
      props.highlighted.days.indexOf(utils.getDay(date)) !== -1
    ) {
      highlighted = true;
    }

    if (
      typeof props.highlighted.daysOfMonth !== "undefined" &&
      props.highlighted.daysOfMonth.indexOf(utils.getDate(date)) !== -1
    ) {
      highlighted = true;
    }

    if (
      typeof props.highlighted.customPredictor === "function" &&
      props.highlighted.customPredictor(date)
    ) {
      highlighted = true;
    }

    return highlighted;
  }
  function isHighlightStart(date) {
    return (
      isHighlightedDate(date) &&
      props.highlighted.from instanceof Date &&
      utils.getFullYear(props.highlighted.from) === utils.getFullYear(date) &&
      utils.getMonth(props.highlighted.from) === utils.getMonth(date) &&
      utils.getDate(props.highlighted.from) === utils.getDate(date)
    );
  }
  function isHighlightEnd(date) {
    return (
      isHighlightedDate(date) &&
      props.highlighted.to instanceof Date &&
      utils.getFullYear(props.highlighted.to) === utils.getFullYear(date) &&
      utils.getMonth(props.highlighted.to) === utils.getMonth(date) &&
      utils.getDate(props.highlighted.to) === utils.getDate(date)
    );
  }
  function isDefined(prop) {
    return typeof prop !== "undefined" && prop;
  }

  refreshPage();
  initDaysOfWeek();
  return {
    days,
    selectDate,
    getPageMonth,
    showMonthCalendar,
    previousMonth,
    isPreviousMonthDisabled,
    nextMonth,
    isNextMonthDisabled,
    isSelectedDate,
    isDisabledDate,
    isHighlightEnd,
    utils,
    daysOfWeek,
    blankDays,
    state,
    isYmd,
    isLeftNavDisabled,
    isRightNavDisabled,
  };
}
