<template>
  <div class="relative">
    <slot name="label">
      <Label v-if="label">{{ label }}</Label>
    </slot>
    <div
      ref="inputParent"
      :class="[
        inputFocus && 'ring-2',
        rounded ? 'rounded-full' : !tile && 'rounded-md',
        isDisabled && 'gray-scale',
        dark ? 'text-white' : 'bg-white',
        label && 'mt-1',
      ]"
      class="border relative border-gray-300 hover:border-blue-300 shadow space-x-2 items-center flex group"
    >
      <slot name="prependInner">
        <ui-icon v-if="prependInnerIcon">{{ prependInnerIcon }}</ui-icon>
        <span class="font-semibold" v-if="prefixValue">{{ prefixValue }}</span>
      </slot>
      <div class="w-full h-full relative">
        <textarea
          ref="input"
          v-if="textarea"
          :value="inputDisplayValue"
          :placeholder="placeholder"
          :readonly="isReadOnly"
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
          class="p-2 rounded-md w-full h-full focus:outline-none"
        ></textarea>
        <slot v-else name="selection" v-bind:selected="value">
          <input
            ref="input"
            :placeholder="placeholder"
            :readonly="isReadOnly"
            :disabled="isDisabled"
            :value="inputDisplayValue"
            @change="modelValue = $event.target.value"
            :type="typeValue"
            @input="valueInput"
            @focus="focus"
            @blur="blur"
            @keyup="$emit('keyup')"
            @keydown="$emit('keydown')"
            @keydown.enter="enter"
            @keydown.tab="close"
            @keydown.up="up"
            @keydown.down="down"
            @keydown.esc="close"
            autocomplete="new-password"
            :class="[select && 'cursor-pointer', inputStyle, inputClass]"
            class="w-full appearance-none focus:outline-none p-2 rounded-md"
          />
        </slot>
      </div>
      <slot name="appendInner">
        <ui-icon v-if="appendInnerIcon">{{ appendInnerIcon }}</ui-icon>
        <span class="font-semibold" v-if="suffixValue">{{ suffixValue }}</span>
        <button v-if="isClearable" @click="clear">
          <ui-icon>mdi-close</ui-icon>
        </button>
        <button v-if="password && hasValue" @click="hideText = !hideText">
          <ui-icon>{{
            hideText ? "mdi-eye-outline" : "mdi-eye-off-outline"
          }}</ui-icon>
        </button>
      </slot>
      <ui-icon
        v-if="hasItems"
        class="transform transition-all"
        :class="[
          inputFocus && 'delay-100 font-semibold text-blue-300 rotate-180',
        ]"
        >mdi-chevron-down</ui-icon
      >
    </div>
    <div
      v-if="(items || menu) && inputFocus"
      class="absolute origin-bottom-left my-1 w-full bg-white text-gray-900 z-50"
    >
      <slot name="menu" v-bind="$props">
        <ul
          :class="[fadeList && 'opacity-0']"
          :style="{ width: inputWidth + 'px', 'z-index': '9999' }"
          class="p-0 w-full overflow-y-auto max-h-56 rounded-b-lg shadow-xl border"
        >
          <template>
            <slot name="firstResult"></slot>
            <slot name="results" v-bind:items="results">
              <li
                v-for="(result, key) in results"
                :key="key"
                @click.prevent="selectItem(result)"
              >
                <slot name="resultItem" v-bind:item="result">
                  <div
                    :class="[isSelected(key) && 'hover:bg-gray-400']"
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
import useTime from "@/hooks/time";
export default {
  props: {
    dark: Boolean,
    password: Boolean,
    value: {
      type: [String, Object, Number],
    },
    items: {},
    itemText: {},
    itemValue: {},
    type: { default: "text" },
    valueFormat: { type: Function },
    combobox: Boolean,
    select: Boolean,
    autoComplete: Boolean,
    rounded: Boolean,
    menu: Boolean,
    textarea: Boolean,
    inputClass: {
      type: [String, Object],
    },
    loading: {
      type: [Boolean, Object],
    },
    tile: Boolean,
    readonly: Boolean,
    disabled: Boolean,
    dense: Boolean,
    clearable: Boolean,
    prependIcon: {},
    placeholder: {},
    maxlength: {},
    prependInnerIcon: {},
    prefix: {},
    suffix: {},
    appendIcon: {},
    appendInnerIcon: {},
    label: {},
  },
  data() {
    return {
      inputFocus: false,
      rawVal: null,
      typing: false,
      lastValidVal: null,
      selectedIndex: null,
      fadeList: false,
      itemClick: false,
      onFocusValue: null,
      dirty: false,
      hideText: true,
    };
  },
  mounted() {
    this.$data.rawValue = this.$props.value;
  },
  computed: {
    isLoading() {
      let loading = this.$props.loading;
      return typeof loading === "object" ? loading.value : loading;
    },
    inputStyle() {
      return this.$props.dense ? "py-1" : "py-2";
    },
    typeValue() {
      return this.$props.password && !this.$data.hideText
        ? "text"
        : this.$props.type;
    },
    hasItems() {
      let props = this.$props;
      return (
        props.items ||
        props.select ||
        ((props.autoComplete || props.combobox) && props.length > 0)
      );
    },
    hasValue() {
      return this.$props.value;
    },
    isClearable() {
      return this.$props.clearable && this.$props.value;
    },
    prefixValue() {
      return this.$props.prefix;
    },
    suffixValue() {
      return this.$props.suffix;
    },
    isDisabled() {
      return this.$props.disabled || this.isLoading;
    },
    isReadOnly() {
      return this.$props.readonly || this.$props.select;
    },
    results() {
      return this.query();
    },
    inputDisplayValue() {
      if (this.valueFormat) return this.valueFormat(this.value);
      return this.getInputDisplayValue();
    },
    modelValue: {
      get() {
        if (this.itemValue)
          return (this.items.find(
            (item) =>
              this.getObjectValue(item, this.itemValue, this.itemValue) ==
              this.value
          ) ?? {})[this.itemText];
        let q = null;
        if (this.returnObject) q = this.itemText;
        return this.getObjectValue(this.value, q, this.value);
      },
      set(value) {
        this.setModelValue(value);
      },
    },
    inputWidth() {
      let val = 0;
      let i = this.$refs.inputParent as HTMLElement;
      if (i) val = i.offsetWidth;
      return val;
    },
  },
  methods: {
    clear() {
      this.setModelValue(null, true);
      this.blur();
    },
    valueInput($event) {
      this.$data.dirty = true;
      this.setModelValue($event.target.value);
    },
    query(s = null, important = false, exact = false) {
      if (!important && (this.$props.readonly || !this.$data.typing))
        return this.$props.items;
      let items = [];
      const [it, iv, ro] = [
        this.$props.itemText,
        this.$props.itemValue,
        this.$props.returnObject,
      ];
      let mvs = s ?? this.getInputDisplayValue();

      if (!mvs) return this.$props.items;
      let rt = ["^", mvs, exact && "$"].filter(Boolean).join("");
      const re = new RegExp(rt, `i`);
      items = this.$props.items.filter((item) => re.test(it ? item[it] : item));
      return items;
    },
    getInputDisplayValue() {
      let iv = this.$data.rawVal ?? this.$props.value;
      let ivt = this.$props.itemValue && this.$props.itemText;
      if (ivt && !this.$data.typing)
        iv = this.$props.items.find(
          (item) => item[this.$props.itemValue] == this.$props.value
        );
      return this.getObjectValue(iv, this.$props.itemText, iv);
    },
    setModelValue(value, strict = false) {
      //   if (!value && !this.$props.autoComplete) return;
      this.$data.typing = true;
      this.$data.rawVal = value;
      if (this.$props.items?.indexOf(this.$data.rawVal) >= 0)
        this.$data.lastValidVal = value;
      this.$emit("input", this.currentValue(value, strict));
    },
    currentValue(value = null, strict = false) {
      if (!value && !strict) value = this.$props.value;
      return !value || (this.$data.inputFocus && !this.$data.itemClick)
        ? value
        : this.getObjectValue(value, this.$props.itemValue, value);
    },
    selectItem(item) {
      this.$data.itemClick = true;
      this.setModelValue(item);
    },
    focus() {
      this.$data.lastValidVal = this.$data.rawVal;
      this.$data.selectedIndex = null;
      this.$data.onFocusValue = this.getInputDisplayValue();
      this.$data.inputFocus = true;
      this.$data.typing = this.$data.fadeList = this.$data.dirty = this.$data.itemClick = false;
    },
    getObjectValue(item, key, defaultValue = null) {
      return typeof item === "object" && key && item ? item[key] : defaultValue;
    },
    blur() {
      const props = this.$props;
      this.$data.fadeList = true;
      useTime.delay(200).then((d) => {
        let dirty = this.$data.dirty;
        this.$data.inputFocus = this.$data.typing = false;

        const [val, items, it, lvl, iv] = [
          props.value,
          props.items,
          props.itemText,
          this.$data.lastValidVal,
          props.itemValue,
        ];
        if (this.$props.autoComplete && !this.$data.itemClick && dirty) {
          let smv = null; //this.query(this.$data.onFocusValue, true, true)[0];
          if (typeof val === "string") smv = this.query(val, true, true)[0];
          else {
            if (items?.indexOf(val) >= 0) smv = val;
          }
          this.setModelValue(smv, true);
        }
        let cv = this.getInputDisplayValue();
        if (this.$data.onFocusValue != cv) {
          this.$emit("change", this.currentValue());
        }
      });
    },
    displayValue(item) {
      return this.getObjectValue(item, this.itemText, item);
    },
    isSelected(key) {
      return key === this.selectedIndex;
    },
    up($event) {
      let q = this.query();
      if (!q) return;
      if (this.$data.selectedIndex === null) {
        this.$data.selectedIndex = q.length - 1;
        return;
      }
      this.$data.selectedIndex =
        this.$data.selectedIndex === 0
          ? q.length - 1
          : this.$data.selectedIndex - 1;
      this.$forceUpdate();
      $event.preventDefault();
    },
    down($event) {
      let q = this.query();

      if (!q) return;
      if (this.$data.selectedIndex === null) {
        this.$data.selectedIndex = 0;
        return;
      }
      this.$data.selectedIndex =
        this.$data.selectedIndex === q.length - 1
          ? 0
          : this.$data.selectedIndex + 1;
      this.$forceUpdate();
      $event.preventDefault();
    },
    enter() {
      if (this.$data.selectedIndex === null) {
        this.$emit("nothingSelected", this.modelValue);
        this.blur();
        return;
      }
      this.selectItem(this.query()[this.$data.selectedIndex]);
    },
    close() {},
  },
};
</script>

<style scoped></style>
