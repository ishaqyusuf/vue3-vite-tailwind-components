<template>
  <div class="" :class="{ 'text-right': rtl }">
    <TMenu v-slot="{ open }" as="div" class="relative inline-block text-left">
      <TMenuButton class="focus:outline-none">
        <slot />
      </TMenuButton>

      <transition
        enter-active-class="transition transform duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <TMenuItems
          :class="[!noWidth && width, { 'origin-top-right  right-0': rtl }]"
          class="absolute mt-1 bg-white z-10 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <slot name="items" :open="open" />
        </TMenuItems>
      </transition>
    </TMenu>
  </div>
</template>

<script lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

export default {
  props: {
    rtl: Boolean,
    width: { type: String, default: "w-56" },
    noWidth: Boolean,
  },
  components: {
    TMenu: Menu,
    TMenuButton: MenuButton,
    TMenuItems: MenuItems,
    TMenuItem: MenuItem,
  },
};
</script>
