import { ref, computed } from "vue";

const stacks: any = ref([
  {
    success: true,
    text: "Hello World",
    delay: 2000,
  },
]);

const initAlert = (payload) => {
  stacks.value.push(payload);
};
const alerts = computed(() => stacks.value);
const destroyAlert = (alert) => {
  stacks.value = stacks.value.filter((a) => a != alert);
};

export default {
  initAlert,
  destroyAlert,
  alerts,
};
