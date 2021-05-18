import { ref } from "vue";

const opened = ref(false);
export default {
  opened,
  toggle: () => (opened.value = !opened.value),
  close: () => (opened.value = false),
  open: () => (opened.value = true),
};
