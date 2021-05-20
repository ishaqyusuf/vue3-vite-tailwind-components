<template>
  <transition
    enter-active-class="transition transform duration-100 ease-out"
    enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100  opacity-100"
    leave-active-class="transition duration-75 ease-in"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0"
  >
    <Container
      v-if="showFloatingAction"
      simple
      class="fixed z-50 inline-flex origin-bottom justify-between shadow-xl bottom-0 mb-4 w-full p-4 rounded-full bg-black-800 text-gray-50"
    >
      <div class="inline-flex space-x-4 items-center" tertiary>
        <Btn icon @click="close"><i-mdi-close class="text-black-200" /></Btn>
        <div class="space-x-3">
          <span class="rounded-full px-2 bg-black-400 text-sm">{{
            selection
          }}</span>
          <span>items selected</span>
        </div>
      </div>
      <div class="inline-flex space-x-4">
        <Menu v-if="hasMore">
          <Btn dark rounded large color="gray-700">
            <i-mdi-dots-horizontal />
            <span>More</span>
          </Btn>
          <template v-slot:items>
            <slot name="menu" />
          </template>
        </Menu>
        <slot name="more" />
        <Btn v-if="label" dark rounded large color="gray-700">
          <i-mdi-printer />
          <span>Label</span>
        </Btn>
        <Btn v-if="print" dark rounded large color="gray-700">
          <i-mdi-printer />
          <span>Print</span>
        </Btn>
        <Btn
          v-if="edit"
          @click="emitAction('delete')"
          dark
          rounded
          large
          color="gray-700"
        >
          <i-mdi-pencil-outline />
          <span>Edit</span>
        </Btn>
        <Btn v-if="deletable" dark rounded large color="red-700">
          <i-mdi-trash-can-outline />
          <span>Delete</span>
        </Btn>
      </div>
    </Container>
  </transition>
</template>

<script lang="ts">
import { ref, computed } from "vue";

export default {
  props: {
    items: Object,
    show: Boolean,
    deletable: Boolean,
    edit: Boolean,
    print: Boolean,
    label: Boolean,
    hasMore: Boolean,
  },
  setup(props, { emit }) {
    return {
      selection: computed(() => props.items.filter((i) => i.checked).length),
      showFloatingAction: computed(
        () => props.show && props.items?.some((i) => i.checked)
      ),
      close: () => {
        props.items.map((i) => (i.checked = false));
      },
      emitAction: (action) => {
        emit(action);
        console.log(action);
      },
    };
  },
};
</script>

<style scoped></style>
