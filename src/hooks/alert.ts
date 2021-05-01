import { ref, computed } from "vue";

const stacks: any = ref([]);

const initAlert = (payload) => {
  stacks.value.push(payload);
};
const register = (msg, error = false) => {
  initAlert({
    text: msg,
    success: !error,
    error: error,
    delay: 2000,
    active: true,
  });
};
const alerts = computed(() => stacks.value);
const destroyAlert = (alert) => {
  stacks.value = stacks.value.filter((a) => a != alert);
};

export default {
  initAlert,
  destroyAlert,
  alerts,
  register,
};
