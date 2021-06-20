<template>
  <div class="">
    <router-link
      class="hover:text-blue-500"
      v-if="item.client"
      :to="{
        name: 'users',
        params: {
          mode,
          slug: item.client.id,
        },
      }"
    >
      <span class="font-medium">{{ item.client.full_name }}</span>
    </router-link>
    <template v-else>
      <slot name="empty" :item="item">
        <span
          v-if="!readonly"
          @click="list.execute('selectClient', item)"
          class="font-medium bg-gray-200 hover:shadow-md uppercase text-xs tracking-widest cursor-pointer p-1 group-hover:bg-blue-800 group-hover:text-white"
          >Add Client
        </span>
      </slot>
    </template>
  </div>
</template>

<script lang="ts">
export default {
  components: {},
  props: {
    readonly: Boolean,
    mode: { default: "clients" },

    item: { type: Object, required: true },
    list: { type: Object, required: true },
  },

  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
