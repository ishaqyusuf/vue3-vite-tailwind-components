<template>
  <div class="" v-if="alwaysSignedIn" />
</template>

<script lang="ts">
import { ref, computed, onMounted, onBeforeUpdate, reactive } from "vue";
import useUser from "@/use/user";
import useTime from "@/hooks/time";
import { inputMixins } from "@/mixins/input";
export default {
  mixins: [inputMixins],
  //   props: {},
  setup(props, { emit }) {
    const alwaysSignedIn = ref(false);
    const form = reactive({ user: "", password: "" });
    async function submit() {
      await useUser.login(form);
    }
    onMounted(() => {});
    return {
      ...useUser,
      alwaysSignedIn,
      submit,
      form,
    };
  },
};
</script>

<style scoped></style>
