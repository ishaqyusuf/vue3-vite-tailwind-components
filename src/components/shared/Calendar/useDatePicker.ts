import { useModelWrapper } from "@/use/modelWrapper";
import { ref, computed } from "vue";
export function useDatePicker(props, emit, utils) {
  const showDayView = ref(false);
  const showMonthView = ref(false);
  const showYearView = ref(false);
  const calendarHeight = ref(false);
  const selectedDate = ref<any>(null);
  const pageTimestamp = ref(null);
  const resetTypedDate = ref<Date>(new Date());
  const inputValue = useModelWrapper(props, emit);
  const correctDate = ref();
  function setPageDate(date: any = null) {
    if (!date) {
      if (props.openDate) {
        date = new Date(props.openDate);
      } else {
        date = new Date();
      }
    }
    pageTimestamp.value = utils.setDate(new Date(date), 1);
  }
  function resetDefaultPageDate() {
    if (selectedDate === null) {
      setPageDate();
      return;
    }
    setPageDate(selectedDate);
  }
  const computedInitialView = computed(() => {
    if (!props.initialView) {
      return props.minimumView;
    }
    return props.initialView;
  });
  const isOpen = computed(() => {
    return showDayView.value || showMonthView.value || showYearView.value;
  });

  function close(emitEvent = false) {
    showDayView.value = showMonthView.value = showYearView.value = false;
    if (!!props.inline) {
      if (emitEvent) {
        emit("closed");
      }
      //   document.removeEventListener("click", clickOutside, false);
    }
  }

  function showCalendar() {
    if (props.disabled || !!props.inline) {
      return false;
    }
    if (isOpen.value) {
      return close(true);
    }
    setInitialView();
  }
  function setInitialView() {
    const initialView = computedInitialView.value;
    if (!allowedToShowView(initialView)) {
      throw new Error(
        `initialView '${props.initialView}' cannot be rendered based on minimum '${props.minimumView}' and maximum '${props.maximumView}'`
      );
    }
    switch (initialView) {
      case "year":
        showYearCalendar();
        break;
      case "month":
        showMonthCalendar();
        break;
      default:
        showDayCalendar();
        break;
    }
  }
  function allowedToShowView(view) {
    const views = ["day", "month", "year"];
    const minimumViewIndex = views.indexOf(props.minimumView);
    const maximumViewIndex = views.indexOf(props.maximumView);
    const viewIndex = views.indexOf(view);

    return viewIndex >= minimumViewIndex && viewIndex <= maximumViewIndex;
  }
  function showDayCalendar() {
    if (!allowedToShowView("day")) {
      return false;
    }
    close();
    showDayView.value = true;
    return true;
  }
  function showMonthCalendar() {
    if (!allowedToShowView("month")) {
      return false;
    }
    close();
    showMonthView.value = true;
    return true;
  }
  function showYearCalendar() {
    if (!allowedToShowView("year")) {
      return false;
    }
    close();
    showYearView.value = true;
    return true;
  }
  function setDate(timestamp) {
    const date = new Date(timestamp);
    selectedDate.value = date;
    setPageDate(date);
    emit("selected", date);
    inputValue.value = correctDate.value = date;
    // emit("input", date);
  }
  function clearDate() {
    selectedDate.value = null;
    setPageDate();
    emit("selected", null);
    emit("input", null);
    emit("cleared");
  }
  function selectDate(date) {
    setDate(date.timestamp);
    date.isSelected = true;
    if (!!props.inline) {
      close(true);
    }
    resetTypedDate.value = new Date();
  }
  function selectDisabledDate(date) {
    emit("selectedDisabled", date);
  }
  function selectMonth(month) {
    const date = new Date(month.timestamp);
    if (allowedToShowView("day")) {
      setPageDate(date);
      emit("changedMonth", month);
      showDayCalendar();
    } else {
      selectDate(month);
    }
  }
  function selectYear(year) {
    const date = new Date(year.timestamp);
    if (allowedToShowView("month")) {
      setPageDate(date);
      emit("changedYear", year);
      showMonthCalendar();
    } else {
      selectDate(year);
    }
  }
  function setValue(date) {
    if (typeof date === "string" || typeof date === "number") {
      let parsed = new Date(date);
      date = isNaN(parsed.valueOf()) ? null : parsed;
    }
    if (!date) {
      setPageDate();
      selectedDate.value = null;
      return;
    }
    selectedDate.value = date;
    setPageDate(date);
  }
  function handleChangedMonthFromDayPicker(date) {
    setPageDate(date);
    emit("changedMonth", date);
  }
  function setTypedDate(date) {
    setDate(date.getTime());
  }

  function init() {
    if (props.modelValue) {
      setValue(props.modelValue);
    }
    if (!!props.inline) {
      setInitialView();
    }
  }
  init();
  return {
    showMonthView,
    selectedDate,
    inputValue,
    showYearView,
    selectYear,
    calendarHeight,
    pageTimestamp,
    showDayView,
    correctDate,
    selectDate,
    handleChangedMonthFromDayPicker,
    showMonthCalendar,
    selectDisabledDate,
  };
}
