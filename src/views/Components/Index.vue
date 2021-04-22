<template>
  <div class="inline-flex w-full">
    <!-- <side-navigation>
      <menu-item dark>Form</menu-item>
      <menu-item dark>Table</menu-item>
    </side-navigation> -->
    <div class="m-4 min-h-screen w-full">
      <span class="text-4xl block leading-loose font-bold">{{
        $route.params.title
      }}</span>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup type="ts">
import { defineComponent, toRefs, ref, unref } from 'vue';
    const structure = ref([
    {name: 'parcel',btnLink: true, btnProps:{}, title: 'Parcel',fontMedium: true},
    {name: 'client', title: 'Client'}
  ]);
const data = ref(new Array(20).fill(null).map((v,index) => {
  return {
id: index,parcel: "AKDJALKJEKLJEKALJELKA", parcel_link: {to: ''}, client: "Ishaq Yusuf"
  }
}))
</script>

<style></style>
