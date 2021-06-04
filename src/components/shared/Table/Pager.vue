<template>
  <div class="inline-flex w-full px-4 justify-between items-center">
    <span class="text-sm"
      >Showing <SemiBold>{{ data.from }}</SemiBold> to
      <SemiBold>{{ data.to }}</SemiBold> of
      <SemiBold>{{ data.total }}</SemiBold>
      results
    </span>
    <div class="inline-flex items-center space-x-1">
      <router-link
        v-for="(item, index) in pages"
        :key="index"
        class="text-gray-600"
        :class="{
          'rounded-full border p-1': item.prev || item.next,
          'px-1.5 border-b-2 border-transparent': item.page != null,
          'text-blue-700 font-semibold': item.page != null && item.current,
          'hover:text-blue-500': item.page != null && !item.current,
          'hover:bg-blue-700 hover:text-white':
            (item.prev || item.next) && !item.disabled,
        }"
        :to="item.to"
        :disabled="item.disabled"
      >
        <i-mdi-chevron-right class="text-sm" v-if="item.next" />
        <i-mdi-chevron-left class="text-sm" v-if="item.prev" />
        <span v-if="item.page">{{ item.page }}</span>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, ref, toRefs, watch } from "vue";
import useRouteData from "@/use/use-route-data";

export default {
  props: {
    data: { type: Object, required: true },
    simple: Boolean,
    btn: Boolean,
  },
  setup(props, { emit }) {
    onMounted(() => {});
    watch(
      () => props.data,
      (value, old) => {
        refreshPages();
      }
    );
    const pages = ref<any[]>([]);

    const refreshPages = () => {
      const { current_page, last_page } = props.data;
      const np = current_page + 1;
      const pp = current_page - 1;
      pages.value = [
        { ...toPg(pp), prev: true, page: null },
        ...links(Math.max(1, current_page - 1)),
        ...[
          last_page > 9 && "...",
          // last_page < 4 && [current_page, last_page].join("/"),
        ]
          .filter(Boolean)
          .map((t) => {
            return {
              page: t,
              to: {},
              disabled: true,
            };
          }),
        ...(last_page > 9 ? links(last_page - 3) : []),
        { ...toPg(np), next: true, page: null },
      ].filter(Boolean);
    };
    const toPg = (p) => {
      return {
        disabled:
          p < 1 || p > props.data.last_page || p == props.data.current_page,
        current: props.data.current_page == p,
        page: p,
        to: {
          query: {
            ...useRouteData.query,
            page: p,
          },
        },
      };
    };

    const links = (base, count = 3): any =>
      Array(count)
        .fill({})
        .map((a, i) => {
          var pg = i + base;
          return toPg(pg);
        });
    return {
      pages,
    };
  },
};
</script>

<style scoped></style>
