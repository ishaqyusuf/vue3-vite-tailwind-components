<template>
  <Overlay screen class="class-1" v-if="opened" v-bind="$props">
    <slot></slot>
  </Overlay>
</template>

<script>
export default {
  props: {
    bClass: {},
    pClass: {},
    persistent: Boolean,
    value: { type: Boolean, default: true },
  },
  computed: {
    mxWidth() {
      return this.$props.maxWidth + "px";
    },
    opened: {
      get() {
        return this.$props.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    closeDialog() {
      this.$emit("input", false);
    },
    clickOutside() {
      if (!this.$props.persistent) this.closeDialog();
    },
  },
};
</script>

<style scoped></style>
