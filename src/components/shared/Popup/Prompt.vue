<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-black-900 bg-opacity-10" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              :class="{
                'p-6': !dense,
              }"
              class="inline-block bg-white w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl"
            >
              <slot name="container"
                ><slot name="body"
                  ><slot name="title">
                    <DialogTitle
                      v-if="title"
                      as="h3"
                      class="text-lg font-medium leading-6 text-gray-900"
                    >
                      {{ title }}
                    </DialogTitle>
                  </slot>
                  <slot name="info">
                    <div class="mt-2" v-if="info">
                      <p class="text-sm text-gray-500">
                        {{ info }}
                      </p>
                    </div>
                  </slot>
                </slot>

                <div
                  class="mt-4"
                  :class="{ 'flex justify-end space-x-2': action }"
                >
                  <button
                    type="button"
                    v-if="!action"
                    class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    @click="closeModal()"
                  >
                    {{ ok }}
                  </button>
                  <template v-else>
                    <button
                      type="button"
                      class="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      @click="closeModal()"
                    >
                      {{ cancel }}
                    </button>
                    <button
                      type="button"
                      class="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      @click="closeModal(true)"
                    >
                      {{ ok }}
                    </button>
                  </template>
                </div></slot
              >
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { ref } from "vue";
import { useModelWrapper } from "@/use/modelWrapper";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from "@headlessui/vue";

export default {
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
  },
  emits: ["ok"],
  props: {
    title: String,
    ok: { type: String, default: "Ok" },
    cancel: { type: String, default: "Cancel" },
    okAction: Object,
    action: Boolean,
    dense: Boolean,
    info: String,
    modelValue: Boolean,
  },
  setup(props, { emit }) {
    const isOpen = useModelWrapper(props, emit);
    return {
      isOpen,

      closeModal(ok = false) {
        isOpen.value = false;
        ok && emit("ok");
      },
    };
  },
};
</script>
