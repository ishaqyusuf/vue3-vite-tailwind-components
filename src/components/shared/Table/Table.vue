<template>
  <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
    <table
      class="min-w-full table w-full border-collapse divide-gray-200"
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
        <TransitionRoot
          as="tr"
          :show="!itemData.deleted"
          class="hover:bg-gray-100 group"
          :class="[]"
          leave="transition tranform duration-300 ease-in delay-1000"
          leave-from="opacity-100 scale-100 bg-red-300"
          leave-to="opacity-50 scale-40"
          v-for="(itemData, index) in computedItems"
          :key="index"
        >
          <!-- <TransitionRoot as="template" :show="true"> -->
          <td
            scope="col"
            class="px-6"
            :class="[
              {
                'opacity-0 group-hover:opacity-100':
                  !itemData.checked && hideChecks,
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
            @mouseenter="item.hover = true"
            @mouseleave="item.hover = false"
            :key="index"
          >
            <slot :name="'before_' + item.name" :header="item" :item="itemData">
            </slot>
            <slot :name="item.name" :header="item" :item="itemData">
              <span class="block" v-if="!itemData[item.name + '_link']">
                <slot
                  :name="item.name + '_prefix'"
                  :header="item"
                  :item="itemData"
                >
                </slot>
                {{ itemData[item.name] }}
                <slot
                  :name="item.name + '_suffix'"
                  :header="item"
                  :item="itemData"
                >
                </slot>
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
            <slot :name="'after_' + item.name" :header="item" :item="itemData">
            </slot>
          </td>
          <td
            :class="[
              {
                'py-2 px-3': dense,
                'py-3 px-6': !dense,
                'opacity-0 group-hover:opacity-100': hideActions,
              },
            ]"
            class="text-right relative text-sm font-medium"
            v-if="action"
          >
            <div class="inline-flex">
              <slot :name="deletable">
                <Btn
                  dense
                  :icon="!textAction"
                  color="red-600"
                  large
                  confirm
                  auto-ignore
                  :text="textAction"
                >
                  <i-mdi-delete-outline v-if="!textAction" />
                  <span v-else class="text-green-600">Delete</span>
                </Btn>
              </slot>
              <slot :name="editable">
                <Btn dense :icon="!textAction" large :text="textAction">
                  <i-mdi-pencil-box-multiple-outline v-if="!textAction" />
                  <span v-else class="text-green-600">Edit</span>
                </Btn>
              </slot>
              <SimpleMenu open-on-hover rtl v-if="moreAction">
                <Btn dense :icon="!textAction" large :text="textAction">
                  <i-mdi-dots-horizontal v-if="!textAction" />
                  <span v-else>More</span>
                </Btn>
                <template v-slot:items>
                  <slot name="menu" />
                </template>
              </SimpleMenu>
            </div>
          </td>
        </TransitionRoot>
        <!-- </tr> -->
      </tbody>
    </table>
  </div>
  <!-- <TableAction :items="items" :show="floatingAction"></TableAction> -->
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { TransitionRoot } from "@headlessui/vue";
export default defineComponent({
  components: {
    TransitionRoot,
  },
  props: {
    editable: Boolean,
    deletable: Boolean,
    hideActions: Boolean,
    hideChecks: Boolean,
    textAction: Boolean,
    action: Boolean,
    floatingAction: Boolean,
    dense: Boolean,
    noDivide: Boolean,
    moreAction: Boolean,
    noHead: Boolean,
    checkable: Boolean,
    stickyAction: Boolean,
    structure: { type: Object, required: true },
    items: { type: Object, required: true },
    pager: Array,
    onDelete: Object,
  },
  setup(props, { emit }) {
    const checkAll = computed({
      get: () =>
        props.items?.every((d) => d.checked) && props.items?.length > 0,
      set: (value) => {
        props.items?.map((item) => (item.checked = value));
      },
    });
    onMounted(() => {
      // props.items.map((item) => {
      //   item.deleted = false;
      // });
    });
    // const items = computed(() => props.data);
    return {
      checkAll,
      computedItems: computed<any[]>(() => {
        return props.items.map((item) => {
          !item.deleted && (item.deleted = false);
          return item;
        });
      }),
      deleteItem: (item) => {
        item.deleted = true;
      },
      // items,
    };
  },
});
</script>

<style scoped></style>
