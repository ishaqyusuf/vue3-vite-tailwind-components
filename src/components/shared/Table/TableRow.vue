<template>
  <!-- :show="!item.deleted" -->
  <TransitionRoot
    as="tr"
    class="hover:bg-gray-100 group"
    :class="[]"
    show
    leave="transition tranform duration-300 ease-in delay-1000"
    leave-from="opacity-100 scale-100 bg-red-300"
    leave-to="opacity-50 scale-40"
  >
    <td
      scope="col"
      class="cursor-default"
      :class="[
        {
          'opacity-0 group-hover:opacity-100': !checked && hideChecks,

          'py-2 px-3 w-12': dense,
          'py-3 px-6 w-16': !dense,
        },
      ]"
      v-if="checkable"
    >
      <Checkbox v-model="checked"></Checkbox>
    </td>
    <td
      scope="col"
      class="whitespace-nowrap text-sm text-gray-900"
      :class="[
        {
          'py-2 px-3': dense,
          'py-3 px-6': !dense,
          'font-medium': struct.fontMedium,
          'text-left': !struct.textRight && !struct.textCenter,
          'text-right': struct.textRight,
          'text-center': struct.textCenter,
        },
        item.colStyle,
        struct.td,
      ]"
      v-for="(struct, index) in structure"
      @mouseenter="struct.hover = true"
      @mouseleave="struct.hover = false"
      :key="index"
    >
      <slot :name="'before_' + struct.name" :header="struct" :item="item">
      </slot>
      <slot :name="struct.name" :header="struct" :item="item">
        <span class="block" v-if="!item[struct.name + '_link']">
          <slot :name="struct.name + '_prefix'" :header="struct" :item="item">
          </slot>
          {{ struct.computed ? struct.computed(item) : item[struct.name] }}
          <slot :name="struct.name + '_suffix'" :header="struct" :item="item">
          </slot>
        </span>
        <template v-else>
          <div class="block">
            <button class="bg-gray-100 px-1 leading-6" v-if="struct.btnLink">
              {{ struct.computed ? struct.computed(item) : item[struct.name] }}
            </button>
            <router-link
              class="hover:text-blue-600"
              :to="item[struct.name + '_link']"
              v-else
            >
              {{ struct.computed ? struct.computed(item) : item[struct.name] }}
            </router-link>
          </div>
        </template>
      </slot>
      <slot :name="'after_' + struct.name" :header="struct" :item="item">
        <span class="text-opacity-50"> {{ item["after_" + struct.name] }}</span>
      </slot>
    </td>
    <td
      :class="[
        {
          'py-2 px-3': dense,
          'py-3 px-6': !dense,
        },
      ]"
      class="text-right relative text-sm font-medium"
      v-if="action"
    >
      <div class="inline-flex space-x-2">
        <slot name="actions" :item="item">
          <div
            class="inline-flex space-x-2"
            :class="{
              'opacity-0 group-hover:opacity-100': hideActions,
            }"
          >
            <slot name="more-actions" :item="item"></slot>
            <slot name="delete-btn" :item="item">
              <Btn
                dense
                v-if="deletable"
                :icon="!textAction"
                color="red-600"
                large
                async
                :action="deleteItem"
                confirm
                :text="textAction"
              >
                <i-mdi-delete-outline v-if="!textAction" />
                <span v-else class="text-green-600">Delete</span>
              </Btn>
            </slot>

            <slot name="edit-btn" :item="item">
              <Btn
                dense
                :icon="!textAction"
                v-if="editable"
                large
                :text="textAction"
              >
                <i-mdi-pencil-box-multiple-outline v-if="!textAction" />
                <span v-else class="text-green-600">Edit</span>
              </Btn>
            </slot>
          </div>
          <slot name="more-btn" :item="item">
            <Menu rtl v-if="moreAction" ref="menu">
              <slot name="menu-btn" :item="item">
                <Btn dense :icon="!textAction" large :text="textAction">
                  <i-mdi-dots-vertical
                    class="text-black-400"
                    v-if="!textAction"
                  />
                  <span v-else>More</span>
                </Btn>
              </slot>
              <template #items>
                <slot name="menu-items" :item="item" />
              </template>
            </Menu>
          </slot>
        </slot>
      </div>
    </td>
  </TransitionRoot>
</template>

<script lang="ts">
import { computed, PropType, ref, watch } from "vue";
import table from "@/hooks/table";
import { TransitionRoot } from "@headlessui/vue";
export default {
  components: {
    TransitionRoot,
  },
  props: {
    ...table.props,
    index: { type: Number, required: true },
  },
  setup(props, { emit }) {
    const { data, ...useList } = props.useList;

    const item = computed(() => data.itemsById[props.index]);

    const checked = computed({
      get: () => {
        return data.checkedIds?.includes(props.index);
      },
      set: (isChecked) => {
        useList.setCheckedItemsById({ id: props.index, isChecked });
      },
    });
    return {
      item,
      checked,
      editItem: async () => {},
      deleteItem: async () => {
        await useList.deleteItem(item.value);
      },
    };
  },
};
</script>

<style scoped></style>
