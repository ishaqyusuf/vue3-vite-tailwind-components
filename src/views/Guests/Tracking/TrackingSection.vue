<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="max-w-3xl space-y-2">
      <span class="block text-6xl font-bold">Track your package now!</span>
      <Input class="text-5xl" />
      <radio-group> <radio-button>Hello</radio-button></radio-group>
      <Btn class="w-full" x-large>Track</Btn>
    </div>
  </div>
  <!-- <div
    class="flex justify-center items-center relative"
    :class="[
      {
        'x-section sm:h-90h': sectional,
        'sm:h-30': mini,
        'gr-esky': !mini,
      },
    ]"
  >
    <div
      class="grid grid-cols-5 sm:gap-6"
      :class="[{ 'w-full lg:w-11/12 xl:w-10/12': !mini }]"
    >
      <figure
        class="hidden sm:block col-span-5 sm:col-span-2 anim overflow-hidden"
      >
        <Img class="w-full h-full" no-gradient src="video-thumb_shlk51.jpg" />
      </figure>
      <div
        class="col-span-5 sm:col-span-3 relative bg-yellow-500 xl:bg-transparent"
      >
        <div class="absolute all-0 shape-container hidden xl:block"></div>
      </div>
    </div>
  </div> -->
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {
    sectional: Boolean,
    mini: Boolean,
  },
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped lang="scss">
.pkg-ka {
  //   background-repeat: no-repeat;
  //   background-position: center;
  background-size: contain;
  background: url("https://res.cloudinary.com/dba9u9ojd/image/upload/c_scale,h_1000,q_48,w_1000/v1605187082/eaftrack/ilya-cher-XdOvAFE4_RY-unsplash_crmtyh.jpg");
}
.shape-container {
  //   height: 100vh;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fed300;
    clip-path: polygon(0 0, 100% 0, 80% 100%, 0 100%);
  }
  &::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: #212223;
    clip-path: polygon(80% 100%, 95% 100%, 80% 0);
  }
}
</style>
