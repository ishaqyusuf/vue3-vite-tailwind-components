<template>
  <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
    <table
      class="min-w-full divide-gray-200"
      :class="{ 'divide-y': !noDivide }"
    >
      <thead class="bg-gray-50" v-if="!noHead">
        <tr>
          <th
            scope="col"
            class="w-16 text-xs font-medium text-gray-500 uppercase tracking-wider"
            :class="[
              {
                'py-2': dense,
                'py-3': !dense,
              },
            ]"
            v-if="checkable"
          >
            <Checkbox v-model="checkAll"></Checkbox>
          </th>
          <th
            scope="col"
            class="text-left px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
            :class="[
              {
                'py-2': dense,
                'py-3': !dense,
              },
            ]"
            v-for="(item, index) in structure"
            :key="index"
          >
            <slot :name="item.name + '_head'">
              {{ item.title }}
            </slot>
          </th>
          <th
            scope="col"
            class="text-xs font-medium text-gray-500 uppercase tracking-wider"
            :class="[
              {
                'py-2': dense,
                'py-3': !dense,
              },
            ]"
            v-if="action"
          ></th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr
          class="hover:bg-gray-100 group"
          :class="[]"
          v-for="(itemData, index) in data"
          :key="index"
        >
          <td
            scope="col"
            class="px-6"
            :class="[
              {
                'opacity-0 group-hover:opacity-100': !itemData.checked,
                'py-2': dense,
                'py-3': !dense,
              },
            ]"
            v-if="checkable"
          >
            <Checkbox v-model="itemData.checked"></Checkbox>
          </td>
          <td
            scope="col"
            class="whitespace-nowrap text-sm text-gray-900"
            :class="[
              {
                'py-2 px-3': dense,
                'py-3 px-6': !dense,
                'font-medium': item.fontMedium,
              },
            ]"
            v-for="(item, index) in structure"
            :key="index"
          >
            <slot :name="'before_' + item.name" :item="itemData"> </slot>
            <slot :name="item.name" :item="itemData">
              <span class="block" v-if="!itemData[item.name + '_link']">
                <slot :name="item.name + '_prefix'" :item="itemData"> </slot>
                x {{ itemData[item.name] }}
                <slot :name="item.name + '_suffix'" :item="itemData"> </slot>
              </span>
              <template v-else>
                <button class="bg-gray-100 px-1 leading-6" v-if="item.btnLink">
                  {{ itemData[item.name] }}
                </button>
                <router-link :to="itemData[item.name + '_link']" v-else>{{
                  itemData[item.name]
                }}</router-link>
              </template>
            </slot>
            <slot :name="'after_' + item.name" :item="itemData"> </slot>
          </td>
          <td
            :class="[
              {
                'py-2 px-3': dense,
                'py-3 px-6': !dense,
              },
            ]"
            class="text-right text-sm font-medium opacity-0 group-hover:opacity-100"
            v-if="action"
          >
            <div class="inline-flex space-x-3">
              <slot :name="deletable">
                <i-mdi-delete-outline v-if="!textAction" class="text-red-600" />
                <span v-else class="text-red-600">Delete</span>
              </slot>
              <slot :name="editable">
                <i-mdi-pencil-box-multiple-outline
                  v-if="!textAction"
                  class="text-green-600"
                />
                <span v-else class="text-green-600">Edit</span>
              </slot>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  props: {
    editable: Boolean,
    deletable: Boolean,
    action: Boolean,
    textAction: Boolean,
    dense: Boolean,
    noDivide: Boolean,
    noHead: Boolean,
    checkable: Boolean,
    structure: Array,
    data: Array,
    pager: Array,
  },
  setup(props, { emit }) {
    const checkAll = computed({
      get: () => props.data?.every((d) => d.checked),
      set: (value) => {
        props.data?.map((item) => (item.checked = value));
      },
    });
    return {
      checkAll,
    };
  },
});
</script>

<style scoped></style>
