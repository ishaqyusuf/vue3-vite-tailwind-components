import { ref } from "vue";

const data = ref([]);

const query = ref({
  page: 0,
  limit: 10,
});

export default {
  authors: data,
  authorsQuery: query,
};
