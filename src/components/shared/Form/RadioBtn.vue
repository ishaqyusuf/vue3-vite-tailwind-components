<script lang="ts">
import { computed, toRef, h, ref } from "vue";

export default {
  props: {
    loading: Boolean,
    label: String,
  },
  setup(props, { emit }) {
    const loading = toRef(props, "loading");
    const isLoading = computed(() => loading.value);

    const button = h("span", [
      props.label,
      isLoading.value &&
        h("div", { class: "bg-red-500 text-white p-4" }, "isLoading"),
    ]);
    return () => button;
  },
};
</script>

<style scoped></style>
