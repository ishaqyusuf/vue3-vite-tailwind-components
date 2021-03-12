<template>
  <button
    :class="[sm && 'p-1 px-4', lg && 'p-2 px-4', block && 'block w-full']"
    class="bg-primary text-white focus:ring-2 rounded-lg border-primary focus:outline-none"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    block: { type: Boolean },
    sm: { type: Boolean, default: true },
    md: { type: Boolean },
    lg: { type: Boolean },
    xl: { type: Boolean },
  },
  data() {
    return {};
  },
  computed: {},
  components: {},
  mounted() {},
};
</script>

<style></style>
