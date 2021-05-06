<template>
  <div class="relative">
    <div class="inline-flex w-full">
      <slot name="label">
        <Label v-if="label">{{ label }}</Label>
      </slot>
      <Spacer></Spacer>
      <slot name="label-right"></slot>
    </div>
    <div
      ref="inputParent"
      :class="[
        inputFocus && 'ring-2',
        rounded ? 'rounded-full' : !tile && 'rounded-md',
        isDisabled && 'gray-scale',
        dark ? 'text-white' : 'bg-white',
        label && 'mt-1',
      ]"
      class="border relative px-2 border-gray-300 hover:border-blue-300 shadow space-x-2 items-center flex group"
    >
      <slot class="" name="prependInner">
        <!-- <ui-icon v-if="prependInnerIcon">{{ prependInnerIcon }}</ui-icon> -->
        <span class="font-semibold" v-if="prefix">{{ prefix }}</span>
      </slot>
      <div class="w-full h-full relative">
        <textarea
          ref="input"
          v-if="textarea"
          :value="inputDisplayValue"
          :placeholder="placeholder"
          :readonly="readonly"
          :disabled="isDisabled"
          @input="valueInput"
          :maxlength="maxlength"
          :class="[inputStyle, inputClass]"
          @keydown.enter="enter"
          @keydown.tab="close"
          @keydown.up="up"
          @keydown.down="down"
          @keydown.esc="close"
          @focus="focus"
          @blur="blur"
          class="py-2 rounded-md w-full h-full focus:outline-none"
        ></textarea>
        <slot v-else name="selection" v-bind:selected="value">
          <input
            ref="inputRef"
            :placeholder="placeholder"
            :readonly="readonly"
            :disabled="isDisabled"
            :value="inputDisplayValue"
            :type="typeValue"
            @input="valueInput"
            @focus="focus"
            @blur="blur"
            @keyup="keyup"
            @keydown="keydown"
            @keydown.enter="enter"
            @keydown.tab="close"
            @keydown.up="up"
            @keydown.down="down"
            :name="name"
            :id="id"
            @keydown.esc="close"
            autocomplete="new-password"
            :class="[select && 'cursor-pointer', inputStyle, inputClass]"
            class="w-full appearance-none focus:outline-none py-2"
          />
        </slot>
      </div>
      <slot name="appendInner">
        <!-- <ui-icon v-if="appendInnerIcon">{{ appendInnerIcon }}</ui-icon> -->
        <span class="font-semibold" v-if="suffix">{{ suffix }}</span>
        <button class="focus:outline-none" v-if="isClearable" @click="clear">
          <i-mdi-close />
        </button>
        <button
          class="focus:outline-none"
          v-if="password && hasValue"
          @click.prevent="togglePassword"
        >
          <i-mdi-eye-outline v-if="hideText" />
          <i-mdi-eye-outline v-else />
        </button>
      </slot>
      <i-mdi-chevron-down
        v-if="hasItems"
        class="transform transition-all"
        :class="[
          inputFocus && 'delay-100 font-semibold text-blue-300 rotate-180',
        ]"
      />
    </div>
    <div
      v-if="(items || menu) && inputFocus"
      class="absolute origin-bottom-left my-1 w-full bg-white text-gray-900 z-50"
    >
      <slot name="menu" v-bind="$props">
        <ul
          :class="[fadeList && 'opacity-0']"
          :style="listStyle"
          class="p-0 w-full overflow-y-auto max-h-56 rounded-b-lg shadow-xl border"
        >
          <template>
            <slot name="firstResult"></slot>
            <slot name="results" v-bind:items="results">
              <li
                v-for="(result, index) in [1, 2, 3, 4, 5, 6]"
                :key="index"
                @click.prevent="selectItem(result)"
              >
                <slot name="resultItem" v-bind:item="result">
                  <div
                    :class="[isSelected(index) && 'hover:bg-gray-400']"
                    class="appearance-none border-b p-2 cursor-default hover:bg-gray-200"
                  >
                    <slot name="item" v-bind:item="result">
                      {{ displayValue(result) }}
                    </slot>
                  </div>
                </slot>
              </li>
            </slot>
            <slot name="lastResult"></slot>
          </template>
        </ul>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted, onBeforeUpdate, reactive } from "vue";
import useTime from "@/hooks/time";
export default {
  props: {
    dark: Boolean,
    password: Boolean,
    value: {},
    items: Array,
    name: String,
    id: String,
    itemText: String,
    itemValue: String,
    type: { default: "text" },
    valueFormat: Function,
    combobox: Boolean,
    select: Boolean,
    autoComplete: Boolean,
    rounded: Boolean,
    menu: Boolean,
    textarea: Boolean,
    inputClass: {},
    loading: Boolean,
    tile: Boolean,
    readonly: Boolean,
    disabled: Boolean,
    dense: Boolean,
    clearable: Boolean,
    prependIcon: String,
    placeholder: String,
    maxlength: Number,
    prependInnerIcon: String,
    prefix: String,
    suffix: String,
    appendIcon: String,
    appendInnerIcon: String,
    label: String,
  },
  setup(props, { emit }) {
    const data = {
      inputFocus: ref(false),
      rawVal: ref(null),
      typing: ref(false),
      lastValidVal: ref(null),
      selectedIndex: ref(-1),
      fadeList: ref(false),
      itemClick: ref(false),
      onFocusValue: ref(null),
      dirty: ref(false),
      hideText: ref(true),
    };
    const inputRef = ref(null);
    const {
      inputFocus,
      rawVal,
      typing,
      lastValidVal,
      selectedIndex,
      fadeList,
      itemClick,
      onFocusValue,
      dirty,
      hideText,
    } = data;
    onMounted(() => {
      rawVal.value = props.value;
    });
    const inputValue = computed({
      get: () => {
        if (props.itemValue)
          return (props.items.find(
            (item) =>
              getObjectValue(item, props.itemValue, props.itemValue) ==
              props.value
          ) ?? {})[props.itemText];
        let q = null;
        if (props.returnObject) q = props.itemText;
        return getObjectValue(props.value, q, props.value);
      },
      set: (value) => {
        setModelValue(value);
      },
    });
    function getObjectValue(item, key, defaultValue = null) {
      return typeof item === "object" && key && item ? item[key] : defaultValue;
    }
    function setModelValue(value, strict = false) {
      typing.value = true;
      rawVal.value = value;
      if (props.items?.indexOf(rawVal.value) >= 0) lastValidVal.value = value;
      emit("update:modelValue", currentValue(value, strict));
    }
    function currentValue(value = null, strict = false) {
      if (!value && !strict) value = props.value;
      return !value || (inputFocus.value && !itemClick.value)
        ? value
        : getObjectValue(value, props.itemValue, value);
    }
    const selectItem = (item) => {
      itemClick.value = true;
      setModelValue(item);
    };
    function focus() {
      lastValidVal.value = rawVal.value;
      selectedIndex.value = -1;
      onFocusValue.value = getInputDisplayValue();
      inputFocus.value = true;
      typing.value = fadeList.value = dirty.value = itemClick.value = false;
    }
    function blur() {
      fadeList.value = true;
      useTime.delay(200).then((d) => {
        inputFocus.value = typing.value = false;

        const [val, items, it, lvl, iv] = [
          props.value,
          props.items,
          props.itemText,
          lastValidVal.value,
          props.itemValue,
        ];
        if (props.autoComplete && !itemClick.value && dirty.value) {
          let smv = null; //query(onFocusValue, true, true)[0];
          if (typeof val === "string") smv = query(val, true, true)[0];
          else {
            if (items?.indexOf(val) >= 0) smv = val;
          }
          setModelValue(smv, true);
        }
        let cv = getInputDisplayValue();
        if (onFocusValue.value != cv) {
          emit("change", currentValue());
        }
      });
    }
    function displayValue(item) {
      return getObjectValue(item, props.itemText, item);
    }
    function isSelected(key) {
      return key === selectedIndex.value;
    }
    function up($event) {
      let q = query();
      if (!q) return;
      if (selectedIndex.value === null) {
        selectedIndex.value = q.length - 1;
        return;
      }
      selectedIndex.value =
        selectedIndex.value === 0 ? q.length - 1 : selectedIndex.value - 1;
      $event.preventDefault();
    }
    function down($event) {
      let q = query();

      if (!q) return;
      if (selectedIndex.value === null) {
        selectedIndex.value = 0;
        return;
      }
      selectedIndex.value =
        selectedIndex.value === q.length - 1 ? 0 : selectedIndex.value + 1;
      $event.preventDefault();
    }
    function enter() {
      if (selectedIndex.value === null) {
        emit("nothingSelected", inputValue);
        blur();
        return;
      }
      selectItem(query()[selectedIndex.value]);
    }
    function close() {}
    function clear() {
      setModelValue(null, true);
      blur();
      // inputRef.value.focus();
    }
    function valueInput($event) {
      dirty.value = true;
      setModelValue($event.target.value);
    }
    function query(s = "", important = false, exact = false) {
      if (!important && (props.readonly || !typing)) return props.items;
      let items = [];
      const [it, iv, ro] = [
        props.itemText,
        props.itemValue,
        props.returnObject,
      ];
      let mvs = s ?? getInputDisplayValue();

      if (!mvs) return props.items;
      let rt = ["^", mvs, exact && "$"].filter(Boolean).join("");
      const re = new RegExp(rt, `i`);
      items = props.items.filter((item) => re.test(it ? item[it] : item));
      return items;
    }
    function getInputDisplayValue() {
      let iv = rawVal.value ?? props.value;
      let ivt = props.itemValue && props.itemText;
      if (ivt && !typing)
        iv = props.items.find((item) => item[props.itemValue] == props.value);
      return getObjectValue(iv, props.itemText, iv);
    }
    const inputDisplayValue = computed(() =>
      props.valueFormat
        ? props.valueFormat(props.value)
        : getInputDisplayValue()
    );
    const refs = ref([]);
    const results = computed(() => query());
    onBeforeUpdate(() => {
      refs.value = [];
    });
    const inputWidth = computed(() => {
      let val = 0;
      let i = refs.value[0] as HTMLElement;
      if (i) val = i.offsetWidth;
      return val;
    });
    const hasItems = computed(
      () =>
        props.items ||
        props.select ||
        ((props.autoComplete || props.combobox) && props.length > 0)
    );
    const isClearable = computed(
      () => inputDisplayValue.value && props.clearable
    );
    const isReadonly = computed(() => props.loading || props.disabled);
    const styles = computed(() => [
      {
        "pr-2": hasItems.value || props.appendInner || props.suffix,
      },
      { "pl-2": props.prependInner || props.prefix },
    ]);

    const togglePassword = (event) => {
      data.hideText.value = !data.hideText.value;
      inputRef.value.focus();
      event.preventDefault();
    };
    return {
      styles,
      inputRef,
      listStyle: computed(() => {
        return { width: inputWidth + "px", "z-index": 9999 };
      }),
      keyup: () => emit("keyup"),
      keydown: () => emit("keydown"),
      selectItem,
      results,
      clear,
      close,
      inputWidth,
      isSelected,
      inputDisplayValue,
      displayValue,
      valueInput,
      ...data,
      isLoading: computed(() => props.loading),
      isDisabled: computed(
        () => props.loading || props.disabled || props.select
      ),
      togglePassword,
      inputStyle: computed(() => (props.dense ? "py-1" : "py-2")),
      typeValue: computed(() =>
        props.password && !data.hideText.value ? "text" : props.type
      ),
      hasItems,
      hasValue: computed(() => inputDisplayValue.value),
      isClearable,
      isReadonly,
      inputValue, //: useModelWrapper(props, emit, "modelValue"),
      up,
      down,
      enter,
      focus,
      blur,
    };
  },
};
</script>

<style scoped></style>
