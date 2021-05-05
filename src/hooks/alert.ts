import { ref, computed } from "vue";

const stacks: any = ref([]);

const initAlert = (payload) => {
  stacks.value.push(payload);
};
const register = (msg, error = false) => {
  initAlert({
    text: msg,
    // id: Math.floor(Math.random() * 99999999),
    id: Date.now(),
    success: !error,
    error: error,
    delay: 1000,
    active: true,
  });
};
const alerts = computed(() => stacks.value);
const destroyAlert = (alert) => {
  stacks.value = stacks.value.filter((a) => a.id != alert.id);
};

export default {
  initAlert,
  destroyAlert,
  alerts,
  register,
};
