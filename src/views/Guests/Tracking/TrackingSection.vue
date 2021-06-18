<template>
  <App
    style="
      background: url(https://res.cloudinary.com/dba9u9ojd/image/upload/v1605563485/eaftrack/page-header-bg_a5j1kd.jpg)
        center no-repeat;
    "
    class="h-screen text-white relative inline-flex justify-between items-center w-full"
  >
    <div class="w-3/5 relative z-10 flex flex-col">
      <p class="text-5xl font-bold leading-tight">
        Worldwide Logistics, Air <br />Freight Forwarding, Road Haulage.
      </p>
      <p class="text-mat-gray-700 text-lg leading-relaxed">
        Express Air Freight is a leading third party freights and logistics
        company based in New York, United State. We specialize in providing
        supply-chain warehousing and transport services throughout the United
        State, Europe and World at Large.
      </p>
    </div>
    <Card class="max-w-sm relative z-10 py-5 bg-yellow-400">
      <CardContent class="space-y-2">
        <span class="text-4xl font-bold">Track Your Parcels</span>
        <span class="block text-gray-600"
          >EAFreight is commited at providing smooth and effective Logistics
          Solutions for every scale of business!</span
        >
        <Input
          tile
          v-model="eafn"
          name="track_code"
          placeholder="Enter your EAFreight Number"
        />
        <div class="inline-flex w-full justify-end">
          <Btn
            tile
            class="mobile:w-full"
            name="trackBtn"
            @click="
              eafn &&
                $router.push({
                  name: 'track',
                  params: { code: eafn },
                })
            "
            >TRACK IT</Btn
          >
        </div>
      </CardContent>
    </Card>
    <div
      class="absolute inset-0 bg-gradient-to-b opacity-40 from-black-500 via-black-700 to-black-300"
    ></div>
  </App>
</template>

<script lang="ts">
import { ref } from "vue";
import router from "@/router";
export default {
  props: {
    sectional: Boolean,
    mini: Boolean,
  },
  setup(props, { emit }) {
    const eafn = ref("");

    return {
      eafn,
    };
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
