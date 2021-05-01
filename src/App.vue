<template>
  <div class="bg-gray-100">
    <AlertContainer />
    <Header></Header>
    <!-- <SharedBtn>Hello</SharedBtn> -->
    <!-- <SharedCheckbox label="SharedL"></SharedCheckbox> -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import Header from "@components/navs/Header.vue";
export default {
  props: {},
  components: {
    Header,
  },
  setup(props, { emit }) {
    onMounted(() => {
      // NProgress.start();
    });
    return {};
  },
};
</script>

<style scoped></style>
