<template>
  <div
    class="relative space-y-1"
    :class="{
      'text-black-100': dark,
    }"
  >
    <slot name="label">
      <Label :dark="dark" v-if="label">{{ label }}</Label>
    </slot>
    <div
      class="px-2 space-x-2 inline-flex items-center w-full"
      :class="{
        'ring-2': focused && !disabled,
        'rounded-full': rounded,
        'rounded-md': !tile,
        'bg-white': !dark,
        'text-black-100 border-black-300': dark,
        'gray-scale': disabled,
        'px-2': !dense,
        'px-1': dense,
        border: !plain,
      }"
    >
      <span class="font-semibold" v-if="prefix">{{ prefix }}</span>
      <slot name="prependInner"></slot>
      <textarea
        v-if="textarea"
        ref="input"
        @input="typing"
        @focus="inputFocus"
        @keydown.enter="enter"
        :type="hideText ? 'password' : 'text'"
        @blur="inputBlur"
        v-model="valued"
        :placeholder="placeholder"
        @keydown.up="up"
        @keydown.esc="closeInput"
        @keydown.down="down"
        class="focus:outline-none w-full h-full bg-transparent"
        tabindex="0"
        autocomplete="new-password"
        :name="name"
        :id="id"
        :readonly="readonly || select"
        :class="{
          'cursor-pointer': select,
          'py-1': dense,
          'py-2': !dense,
        }"
      ></textarea>
      <input
        ref="input"
        v-else
        @input="typing"
        @focus="inputFocus"
        @keydown.enter="enter"
        :type="hideText ? 'password' : 'text'"
        :placeholder="placeholder"
        @blur="inputBlur"
        v-model="valued"
        @keydown.up="up"
        @keydown.esc="closeInput"
        @keydown.down="down"
        class="focus:outline-none w-full bg-transparent"
        tabindex="0"
        autocomplete="new-password"
        :name="name"
        :id="id"
        :readonly="readonly || select"
        :class="{
          'cursor-pointer': select,
          'py-1': dense,
          'py-2': !dense,
          'text-center': centerText,
        }"
      />

      <button
        class="focus:outline-none"
        v-if="clearable && valued"
        @click="clearInput"
      >
        <i-mdi-close />
      </button>
      <button
        class="focus:outline-none"
        v-if="password && valued"
        @click="togglePassword"
      >
        <i-mdi-eye-outline v-if="hideText" />
        <i-mdi-eye-off-outline v-else />
      </button>
      <i-mdi-chevron-down
        v-if="items"
        class="transform transition-all"
        :class="{
          'delay-100 font-semibold text-blue-300 rotate-180': focused,
        }"
      />
      <span class="font-semibold" v-if="suffix">{{ suffix }}</span>
      <slot name="appendInner"></slot>
    </div>

    <InputMenu
      @selected="valued = $event"
      v-bind="$props"
      tabindex="1"
      v-if="results && (listOpened || focused)"
      :results="results"
      :class="{
        'opacity-0': results.length == 0,
      }"
      :state="state"
    ></InputMenu>
  </div>
</template>

<script lang="ts">
import { reactive, ref, onMounted, toRefs, toRef, watch, computed } from "vue";
import input from "@/hooks/input";
import time from "@/hooks/time";
import { useModelWrapper } from "@/use/modelWrapper";
import { $clientApi } from "@/core/services/client";
export default {
  props: {
    ...input.props,
  },
  setup(props, { emit }) {
    const getValue = () => {
      const { itemText, valueFormat, itemValue, items, modelValue } = props;
      if (itemText || itemValue || items) {
        const isObject = typeof modelValue === "object";
        if (!isObject) {
          if (itemValue && modelValue) {
            const realItem = items.find(
              (item) => item[itemValue] == modelValue
            );
            if (itemText) return realItem[itemText];
          }
        }
        if (isObject && itemText && !itemValue) {
          // returned value is an object
          return modelValue[itemText];
        }
        if (modelValue && props.items) {
          if (isObject) {
            if (itemText) return modelValue[itemText];
            if (itemValue && !itemText)
              return props.items.find((item) => item[itemValue] == modelValue);
          }
        }
      }
      return valueFormat ? valueFormat(modelValue) : modelValue;
    };
    const setValue = (value) => {
      const { itemText, itemValue, autoComplete, source } = props;
      const isObject = typeof value === "object";
      if (itemText) {
        const val = isObject
          ? value
          : props.items.find((item) => item[itemText] == value);
        if (val) {
          if (itemValue) return val[itemValue];
          return val;
        }
        if (!autoComplete) return val;
      }
      return value;
    };
    const useCustomGetter =
      props.itemText || props.itemValue || props.valueFormat; //props.items && (props.autoComplete || props.combobox || props.select);
    const valued = useModelWrapper(
      props,
      emit,
      "modelValue",
      useCustomGetter && getValue,
      useCustomGetter && setValue
    );
    // const items = computed(() =>
    //   props.source ? sourceData.items : props.items
    // );
    const validateInput = (value) => {
      const { autoComplete, combobox, source, itemText, itemValue } = props;
      if (autoComplete && (itemText || itemValue)) {
        const item = props.items.find(
          (item) => (itemText ? item[itemText] : item) == value
        );
        return item;
      }
      return value;
    };
    const currentValue = ref();
    async function inputBlur() {
      await time.delay(100);
      emit("blur");
      if (state.preventBlur) {
        state.preventBlur = false;
        return;
      }
      state.isTyping = state.focused = false;
      const { autoComplete, combobox, itemText, itemValue } = props;
      // const item = validateInput(valued.value);
      if (autoComplete) {
        // if (!item) valued.value = currentValue.value;
        // else
        emit("selected", valued.value);
      }
    }
    const sourceData = reactive({
      source: "",
      items: [],
    });

    async function loadSource() {
      const { source } = props;
      if (!source) {
        sourceData.items = [];
        sourceData.source = "";
      }
      if (sourceData.source != source && source) {
        const response = await $clientApi.get(source);
        sourceData.items = response.data.items;
        sourceData.source = source;
        valued.value = validateInput(valued.value);
      }
    }
    function inputFocus() {
      state.focused = state.listOpened = true;
      currentValue.value = validateInput(valued.value) ? valued.value : null;
      emit("focus");
    }
    const input = ref();
    const data = reactive({
      inputBlur,
      inputFocus,
      results: [],
    });
    const state = reactive({
      isTyping: false,
      preventBlur: false,
      listOpened: false,
      focused: false,
      hideText: props.password,
      index: -1,
    });
    function typing() {
      state.isTyping = true;
    }
    async function initResults() {
      const value = valued.value;
      const { itemText, source, itemValue, returnObject, items } = props;
      await loadSource();
      const _items = source ? sourceData.items : items;
      var results = _items;
      if (value) {
        let rt = ["^", value].filter(Boolean).join("");
        const re = new RegExp(rt, `i`);
        results = _items?.filter(
          (item) => !state.isTyping || re.test(itemText ? item[itemText] : item)
        );
      }
      data.results = results;
    }
    onMounted(() => {
      initResults();
    });
    const inputType = ref(props.type);
    watch(
      [valued, props.items, props.source, state].filter(Boolean),
      async (value, old) => {
        initResults();
      }
    );
    const multiChoice = () => {
      if (data.results?.length > 0) return true;
      return false;
    };

    return {
      valued,
      inputType,
      ...toRefs(data),
      ...toRefs(state),
      typing,
      state,
      up($event) {
        if (!multiChoice()) return;
        $event.preventDefault();
        state.index = Math.max(0, state.index - 1);
      },
      down($event) {
        if (!multiChoice()) return;

        $event.preventDefault();
        state.index = Math.min(data.results.length, state.index + 1);
      },
      closeInput($event) {
        inputBlur();
        state.listOpened = false;
        input.value.parent.focus();
      },
      input,
      clearInput($event) {
        $event.preventDefault();
        state.preventBlur = true;
        input.value.focus();
        valued.value = null;
        // inputFocus();
      },
      togglePassword($e) {
        $e.preventDefault();
        state.preventBlur = true;
        state.hideText = !state.hideText;
        inputType.value = state.hideText ? "password" : "text";
      },
      enter($e) {
        if (!multiChoice()) {
          return;
        }
        if (state.index) {
          valued.value = this.results[state.index];
          state.listOpened = state.focused = false;
          input.value.blur();
        }
      },
    };
  },
};
</script>

<style scoped></style>
