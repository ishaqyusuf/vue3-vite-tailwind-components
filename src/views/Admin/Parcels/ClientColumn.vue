<template>
  <div class="">
    <router-link
      class="hover:text-blue-500"
      v-if="item.client"
      :to="{
        name: 'users',
        params: {
          mode: 'clients',
          customer_slug: item.client.id,
        },
      }"
    >
      <span class="font-medium">{{ item.client.full_name }}</span>
    </router-link>

    <span
      v-else
      @click="list.execute('selectClient', item)"
      class="font-medium bg-gray-200 hover:shadow-md uppercase text-xs tracking-widest cursor-pointer p-1 group-hover:bg-blue-800 group-hover:text-white"
      >Add Client
    </span>
  </div>
</template>

<script lang="ts">
export default {
  components: {},
  props: {
    item: { type: Object, required: true },
    list: { type: Object, required: true },
  },

  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
