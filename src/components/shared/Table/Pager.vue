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
      <template v-if="data.last_page > 9"
        ><Btn secondary tile dense>
          <i-mdi-chevron-left />
        </Btn>
        <router-link
          :to="item.to"
          :disabled="item.current"
          v-for="(item, index) in rSide"
          :key="index"
        >
          <Btn :secondary="!item.current" color="purple-500" tile>
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
          <Btn :secondary="!item.current" color="purple-500" tile>
            {{ item.page }}
          </Btn>
        </router-link>
        <Btn secondary dense tile> <i-mdi-chevron-right /> </Btn
      ></template>
      <template v-else>
        <template v-if="data.pages > 1">
          <router-link :to="item.to" v-for="(item, index) in all" :key="index">
            <Btn secondary tile> {{ item.page }} </Btn>
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
import { data } from "cypress/types/jquery";
import { computed, ref, toRef, toRefs } from "vue";

export default {
  props: {
    data: { type: Object, required: true },
    simple: Boolean,
    btn: Boolean,
  },
  setup(props, { emit }) {
    const pages = [];
    const links = (base, count = 3) =>
      Array(count)
        .fill({})
        .map((a, i) => {
          var pg = i + base;
          return {
            current: props.data.current_page == pg,
            page: pg,
            to: {
              query: {
                page: pg,
              },
            },
          };
        });
    return {
      rSide: computed(() => links(props.data.current_page)),
      lSide: computed(() => links(props.data.last_page - 3)),
      all: computed(() => links(1, props.data.last_page)),
    };
  },
};
</script>

<style scoped></style>
