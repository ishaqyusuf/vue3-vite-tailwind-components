<template>
  <div class="bg-gray-100">
    <Header></Header>
    <!-- <SharedBtn>Hello</SharedBtn> -->
    <!-- <SharedCheckbox label="SharedL"></SharedCheckbox> -->
    <router-view></router-view>
  </div>
</template>

<script type="ts">
import Header from "@components/navs/Header.vue";
export default {
  components: {
     Header,
  },
};
</script>

<style></style>
