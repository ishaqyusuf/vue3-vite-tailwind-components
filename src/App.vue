<template>
  <div class="sm:bg-gray-100">
    <AlertContainer />
    <Header v-if="!fullScreen"></Header>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, computed } from "vue";
import Header from "@components/navs/Header.vue";
import user from "@/use/user";
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
