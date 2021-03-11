<template>
  <app-header></app-header>
  <router-view></router-view>
</template>

<script>
import Header from "@components/navs/Header.vue";
export default {
  data() {
    return {};
  },
  computed: {},
  components: {
    "app-header": Header,
  },
  mounted() {},
};
</script>

<style></style>
