<template>
  <div class="min-h-screen">
    <div class="sm:max-w-6xl lg:max-w-5xl mx-auto p-4 py-6 sm:py-10 space-y-6">
      <div class="flex justify-between items-center">
        <!-- <div class="flex justify-between"> -->
        <span class="text-xl sm:text-4xl font-bold text-secondary"
          >EAFreight Tracking®</span
        >
        <!-- <Link class="border-b-2">Tracking</Link> -->
      </div>
      <div class="sm:flex space-y-2 sm:items-center">
        <router-link :to="{ name: 'tracking' }">
          <button
            name="trackNew"
            class="p-2 sm:p-3 sm:text-lg font-semibold inline-flex items-center space-x-3 border-2 text-secondary focus:outline-none transition-all transform hover:-translate-y-1 hover:bg-secondary hover:text-white group"
          >
            <span>Track another package</span
            ><i-mdi-plus class="group-hover:text-white" />
          </button>
        </router-link>
        <Spacer />
        <div class="hidden sm:block">
          <div class="sm:flex space-x-2">
            <router-link
              :to="{ name: 'customer-service' }"
              class="flex space-x-2 items-center border-2 p-2 group bg-gray-100 hover:bg-blue-700 hover:text-white hover:-translate-y-1 transform transition-all"
            >
              <i-mdi-help
                class="transform transition-all group-hover:text-white group-hover:-translate-x-1"
              />
              <div class="flex flex-col items-start">
                <span class="text-blue-700 font-medium group-hover:text-white"
                  >Customer Service
                </span>
                <span class="text-sm">Have questions? We're here to help </span>
              </div>
            </router-link>
            <router-link
              :to="{ name: 'register' }"
              v-if="user.loggedIn"
              class="flex space-x-2 items-center border-2 p-2 group bg-gray-100 hover:bg-blue-700 hover:text-white hover:-translate-y-1 transform transition-all"
            >
              <i-mdi-account-plus-outline
                class="transform transition-all group-hover:text-white group-hover:-translate-x-1"
              />
              <div class="flex flex-col items-start">
                <span class="text-blue-700 font-medium group-hover:text-white"
                  >Easy Tracking Updates
                </span>
                <span class="text-sm">Sign up now for easy tracking </span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <tracking-result></tracking-result>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import TrackingResult from "@/views/Guests/Track/TrackingResult.vue";
import trackerHook from "@/hooks/tracker";
import useUser from "@/use/user-account";
import ActivityComponent from "./ActivityComponent.vue";
export default {
  components: { TrackingResult, ActivityComponent },
  props: {
    code: String,
  },
  setup(props, { emit }) {
    const activity = ref();
    onMounted(() => {
      if (props.code) trackerHook.search(props.code);
    });
    return {
      user: useUser,
      activity,
    };
  },
};
</script>

<style scoped></style>
