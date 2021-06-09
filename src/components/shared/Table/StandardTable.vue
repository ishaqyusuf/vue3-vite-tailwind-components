<template>
  <div>
    <div
      class="overflow-hidden border-gray-200"
      :class="{
        'rounded-lg': !tile,
        'shadow border-b': !vintage,
      }"
      v-if="ids.length > 0"
    >
      <table
        class="min-w-full table w-full border-collapse divide-gray-200"
        :class="{ 'divide-y': !noDivide && !noHead }"
      >
        <thead
          class=""
          :class="{
            hidden: noHead,
            'bg-gray-50': !vintage,
          }"
        >
          <tr>
            <th
              scope="col"
              class="text-left"
              :class="[
                {
                  'py-2 px-3 w-12': dense,
                  'py-3 px-6 w-16': !dense,
                },
              ]"
              v-if="checkable"
            >
              <Checkbox v-model="checkAll"></Checkbox>
            </th>
            <th
              scope="col"
              class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              :class="[
                {
                  'py-2 px-3': dense,
                  'py-3 px-6': !dense,
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
                  'py-2 px-3': dense,
                  'py-3 px-6': !dense,
                },
              ]"
              v-if="action"
            ></th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <TableRow
            @click="rowClick(id)"
            :class="{
              selector: 'cursor-pointer',
            }"
            v-for="(id, index) in ids"
            v-bind="$props"
            class="cursor-default"
            :index="id"
            :key="index"
            @emitAction="emitAction"
          >
            <template
              v-for="(slot, index) in slots"
              :key="index"
              v-slot:[slot]="slotProps"
            >
              <slot
                :name="slot"
                :item="slotProps.item"
                :header="slotProps.header"
              />
            </template>
          </TableRow>
        </tbody>
      </table>
    </div>
    <EmptyContainer v-else>
      <slot name="empty">
        <i-mdi-timer-sand-empty class="text-7xl text-gray-400" />
        <span>List is empty</span>
      </slot>
    </EmptyContainer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref, PropType } from "vue";
import { TransitionRoot } from "@headlessui/vue";
import table from "@/hooks/table";
import { TableWorker } from "@/@types/Interface";
import EmptyContainer from "@/components/shared/EmptyContainer.vue";
export default defineComponent({
  components: {
    TransitionRoot,
    EmptyContainer,
  },
  props: {
    ...table.props,
    worker: { type: Object as PropType<TableWorker>, required: true },
  },
  setup(props, { emit }) {
    onMounted(() => {});
    const { checkAll } = props.worker;
    const slots = ref<string[]>(
      [
        ...props.structure?.map((struct) => {
          return ["before_*", "*", "*_prefix", "*_suffix", "after_*"].map((s) =>
            s.replace("*", struct.name)
          );
        }),
        [
          "edit-btn",
          "menu-btn",
          "menu-items",
          "actions",
          "delete-btn",
          "more-actions",
          "more-btn",
        ],
      ].flat()
    );
    return {
      checkAll,
      slots,
      ids: computed(() => props.worker.data.ids),
      emitAction: (action, data) => {
        emit(action, data);
      },
      rowClick: (rowId) => {
        if (props.selector) emit("selected", rowId);
      },
    };
  },
});
</script>

<style scoped></style>
