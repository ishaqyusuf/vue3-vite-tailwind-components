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
            <Checkbox v-model="toggleAll"></Checkbox>
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
        <TableRow
          v-for="(id, index) in $props.worker?.data.ids"
          v-bind="$props"
          :index="id"
          :key="index"
        >
          <!-- <template
            v-for="(slot, index) in ['description']"
            :key="index"
            v-slot:[slot]="slotProps"
          >
            <slot :name="slot" :note="slotProps.note"></slot>
          </template> -->
        </TableRow>
      </tbody>
    </table>
  </div>
  <!-- <TableAction :items="items" :show="floatingAction"></TableAction> -->
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, PropType } from "vue";
import { TransitionRoot } from "@headlessui/vue";
import table from "@/hooks/table";
import { TableWorker } from "@/@types/Interface";
export default defineComponent({
  components: {
    TransitionRoot,
  },
  props: {
    ...table.props,
    worker: { type: Object as PropType<TableWorker>, required: true },
  },
  setup(props, { emit }) {
    onMounted(() => {});
    // const items = computed(() => props.data);
    return {
      toggleAll: props.worker.toggleAll,
    };
  },
});
</script>

<style scoped></style>
