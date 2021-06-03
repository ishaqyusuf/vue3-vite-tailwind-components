<template>
  <div class="inline-flex w-full px-4 justify-between items-center">
    <span class="text-sm"
      >Showing <SemiBold>{{ data.from }}</SemiBold> to
      <SemiBold>{{ data.to }}</SemiBold> of
      <SemiBold>{{ data.total }}</SemiBold>
      results
    </span>
    <div
      v-if="!btn"
      class="border inline-flex divide-x rounded-lg shadow-sm -space-x-px"
    >
      <template v-if="data.last_page > 9">
        <router-link :to="prev.to" :disabled="prev.disabled">
          <Btn secondary no-ring tile>
            <i-mdi-chevron-left />
          </Btn>
        </router-link>
        <router-link
          :to="item.to"
          :disabled="item.current"
          v-for="(item, index) in rSide"
          :key="index"
        >
          <Btn :secondary="!item.current" no-ring color="purple-500" tile>
            {{ item.page }}
          </Btn>
        </router-link>
        <Btn tertiary tile>...</Btn>
        <router-link
          :disabled="item.current"
          :to="item.to"
          v-for="(item, index) in lSide"
          :key="index"
        >
          <Btn :secondary="!item.current" no-ring color="purple-500" tile>
            {{ item.page }}
          </Btn>
        </router-link>
        <router-link :to="next.to" :disabled="next.disabled">
          <Btn secondary no-ring tile> <i-mdi-chevron-right /> </Btn>
        </router-link>
      </template>
      <template v-else>
        <template v-if="data.last_page > 1">
          <router-link :to="item.to" v-for="(item, index) in all" :key="index">
            <Btn secondary no-ring tile> {{ item.page }} </Btn>
          </router-link>
        </template>
      </template>
    </div>
    <div class="inline-flex space-x-2" v-else>
      <Btn secondary>Previous</Btn>
      <Btn secondary>Next</Btn>
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
    onMounted(() => {
      refreshPages();
    });
    watch(
      () => props.data,
      (value, old) => {
        refreshPages();
      }
    );
    const pages = reactive<{
      rSide: any[];
      next: any;
      prev: any;
      lSide: any[];
      all: any[];
    }>({
      rSide: [],
      lSide: [],
      all: [],
      next: {},
      prev: {},
    });

    const refreshPages = () => {
      pages.rSide = links(props.data.current_page);
      pages.lSide = links(props.data.last_page - 3);
      pages.all = links(1, props.data.last_page);
      const lp = props.data.last_page;
      const np = props.data.current_page + 1;
      const pp = props.data.current_page - 1;
      pages.next = toPg(np > lp ? np : -1);
      pages.prev = toPg(pp > 0 ? pp : -1);
    };
    const toPg = (p) => {
      return {
        disabled: p < 1 || p > props.data.last_page,
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
      ...toRefs(pages),
    };
  },
};
</script>

<style scoped></style>
