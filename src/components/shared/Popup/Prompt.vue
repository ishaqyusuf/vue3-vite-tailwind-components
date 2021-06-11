<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog :open="isOpen" as="div">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen text-center">
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
              :class="[
                {
                  'bg-white max-w-md my-8 shadow-xl': !pilot,
                  'rounded-2xl': rounded,
                  'rounded-lg': !tile && !rounded,
                },
                containerClass,
              ]"
              class="inline-block w-full text-left align-middle transition-all transform"
            >
              <slot name="container">
                <slot name="body">
                  <div
                    class="inline-flex w-full justify-between p-4 bg-gray-50"
                    :class="{}"
                  >
                    <!-- shadow: !flatHeader, -->
                    <slot name="title">
                      <DialogTitle
                        v-if="title"
                        as="h3"
                        class="text-lg font-medium leading-6 text-gray-900"
                      >
                        {{ title }}
                      </DialogTitle>
                    </slot>
                    <div
                      v-if="cancelable"
                      class="inline-flex flex-1 justify-end"
                    >
                      <Btn @click="closeModal" icon>
                        <i-mdi-close class="text-base" />
                      </Btn>
                    </div>
                  </div>
                  <slot name="info">
                    <div class="mt-2" v-if="info">
                      <p class="text-sm text-gray-500">
                        {{ info }}
                      </p>
                    </div>
                  </slot>
                </slot>

                <div
                  v-if="!noAction"
                  class="mt-4 flex justify-end space-x-2 p-4 bg-gray-100"
                >
                  <slot name="action-btn" :close-modal="closeModal">
                    <Btn
                      v-if="!hideCancel"
                      @click="closeModal(false)"
                      color="red-500"
                    >
                      {{ cancel }}</Btn
                    >
                    <Btn
                      v-if="!hideOk"
                      :async="okAction != null"
                      :action="okBtn"
                      color="green-500"
                    >
                      {{ ok }}
                    </Btn>
                  </slot>
                </div>
              </slot>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { ref } from "vue";
import { emits, useModelWrapper } from "@/use/modelWrapper";
import alert from "@/hooks/alert";
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
  emits: [...emits, "ok"],
  props: {
    title: String,
    flatHeader: Boolean,
    ok: { type: String, default: "Ok" },
    cancel: { type: String, default: "Cancel" },
    hideCancel: Boolean,
    hideOk: Boolean,
    okAction: Function,
    action: Boolean,
    cancelable: Boolean,
    dense: Boolean,
    rounded: Boolean,
    tile: Boolean,
    noAction: Boolean,
    info: String,
    containerClass: String,
    modelValue: Boolean,
    pilot: Boolean,
  },
  setup(props, { emit }) {
    const isOpen = useModelWrapper(props, emit);

    const closeModal = (_ok = false) => {
      emit(_ok ? "ok" : "closed");
      isOpen.value = false;
    };
    return {
      isOpen,
      async okBtn() {
        if (props.okAction) {
          const response = await props.okAction();
          if (response) {
            const { msg, error } = response;
            if (msg) alert.register(msg, error);
          }
        } else closeModal(true);
      },
      closeModal,
    };
  },
};
</script>
