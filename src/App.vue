<template>
  <div
    class=""
    :class="{
      'inline-flex w-full': false,
    }"
  >
    <!-- <SideNavigation></SideNavigation> -->
    <div class="sm:bg-gray-100 flex-1">
      <div class="relative z-50">
        <AlertContainer class="" />
      </div>
      <Header v-if="!fullScreen"></Header>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, computed } from "vue";
import Header from "@components/navs/Header.vue";
import user from "@/use/user-account";
import useConfig from "@/use/configs";
export default {
  props: {},
  components: {
    Header,
  },
  setup(props, { emit }) {
    onMounted(() => {
      user.authenticate();
    });
    const fullScreen = computed(() => useConfig.fullScreen.value);
    return {
      fullScreen,
    };
  },
};
</script>

<style scoped></style>
