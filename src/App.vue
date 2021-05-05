<template>
  <div class="bg-gray-100">
    <AlertContainer />
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import Header from "@components/navs/Header.vue";
import user from "@/use/user";
export default {
  props: {},
  components: {
    Header,
  },
  setup(props, { emit }) {
    onMounted(() => {
      user.authenticate();
    });
    return {};
  },
};
</script>

<style scoped></style>
