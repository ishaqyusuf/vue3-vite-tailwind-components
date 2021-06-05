<template>
  <TRadioGroup v-model="value">
    <slot></slot>
    <!-- <div class="space-y-2">
            <RadioGroupOption
              as="template"
              v-for="mode in pkgEntryModes"
              :key="mode.id"
              :value="mode"
              v-slot="{ active, checked }"
            >
              <div
                :class="[
                  active
                    ? 'ring-2 ring-offset-2 ring-offset-blue-300 ring-white ring-opacity-60'
                    : '',
                  checked
                    ? 'bg-blue-900 bg-opacity-75 text-white '
                    : 'bg-white ',
                ]"
                class="relative flex p-2 rounded-lg shadow-md cursor-pointer focus:outline-none"
              >
                <div class="flex items-center justify-between w-full">
                  <div class="flex items-center">
                    <div class="text-sm">
                      <RadioGroupLabel
                        as="p"
                        :class="checked ? 'text-white' : 'text-gray-900'"
                        class="font-medium"
                      >
                        {{ mode.title }}
                      </RadioGroupLabel>
                      <RadioGroupDescription
                        as="span"
                        :class="
                          checked ? 'text-light-blue-100' : 'text-gray-500'
                        "
                        class="inline"
                      >
                        <span> {{ mode.subtitle }}</span>
                      </RadioGroupDescription>
                    </div>
                  </div>
                  <div v-show="checked" class="flex-shrink-0 text-gray-300">
                    <i-mdi-checkbox-marked-circle />
                  </div>
                </div>
              </div>
            </RadioGroupOption>
          </div> -->
  </TRadioGroup>
</template>

<script lang="ts">
import { useModelWrapper } from "@/use/modelWrapper";
import { ref } from "vue";

import { RadioGroup } from "@headlessui/vue";
export default {
  components: {
    TRadioGroup: RadioGroup,
  },
  props: {
    modelValue: [String, Object],
  },
  setup(props, { emit }) {
    const value = useModelWrapper(props, emit);
    return {
      value,
    };
  },
};
</script>

<style scoped></style>
