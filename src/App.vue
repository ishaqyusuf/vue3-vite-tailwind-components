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
    <Card
      class="fixed z-50 bottom-0 m-3 border-purple-500 border p-2 cursor-pointer overflow-auto"
      @click="expand = !expand"
      :class="{
        'w-1/3 h-44': expand,
        'w-1/6 h-10': !expand,
      }"
    >
      <Truncify v-if="!expand">{{ user }}</Truncify>
      <span v-else>{{ user }}</span>
    </Card>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, computed } from "vue";
import Header from "@components/navs/Header.vue";
import userAccount from "@/use/user-account";
import useConfig from "@/use/configs";
export default {
  props: {},
  components: {
    Header,
  },
  setup(props, { emit }) {
    onMounted(() => {
      userAccount.authenticate();
    });
    const fullScreen = computed(() => useConfig.fullScreen.value);
    const expand = ref(false);
    return {
      fullScreen,
      ...userAccount,
      expand,
    };
  },
};
</script>

<style scoped></style>
