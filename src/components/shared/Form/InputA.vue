<template>
  <div class="relative text-base text-gray-900">
    <slot name="label"></slot>
    <div
      ref="inputParent"
      :class="[
        isFocused && 'ring-2',
        rounded ? 'rounded-full' : !tile && 'rounded-lg',
      ]"
      class="border relative border-gray-500 h-full bg-white hover:border-blue-500 rounded-lg shadow space-x-2 items-center flex group"
    >
      <ui-icon v-if="prependInnerIcon" class="pl-2">{{
        prependInnerIcon
      }}</ui-icon>
      <span class="font-semibold pl-2" v-if="prefixValue">{{
        prefixValue
      }}</span>
      <div class="w-full h-full relative">
        <textarea
          ref="input"
          v-if="textarea"
          :value="value"
          :placeholder="placeholder"
          :disabled="disableInput"
          @input="inputChange"
          :maxlength="maxlength"
          :class="[inputStyle, inputClass]"
          @keydown.enter="enter"
          @keydown.tab="close"
          @keydown.up="up"
          @keydown.down="down"
          @keydown.esc="close"
          @focus="focus"
          @blur="blur"
          class="p-2 w-full h-full focus:outline-none"
        ></textarea>
        <input
          v-else
          v-model="mVal"
          @focus="focus"
          @blur="blur"
          :type="type"
          autocomplete="off"
          class="p-2 w-full rounded-lg appearance-none focus:outline-none bg-white"
          @keydown.enter="enter"
          @keydown.tab="close"
          @keydown.up="up"
          @keydown.down="down"
          @keydown.esc="close"
          :placeholder="placeholder"
          :disabled="disableInput"
          :maxlength="maxlength"
          :class="[inputStyle, inputClass]"
          @click="search"
          ref="input"
        />
        <!-- <input
          v-else
          ref="input"
          v-model="display"
          
          @input="inputChange"
          
        /> -->
      </div>
      <button class="pr-2" v-if="appendIcon" @click="appendClick">
        <ui-icon>{{ appendIcon }}</ui-icon>
      </button>
      <span class="font-semibold pr-2" v-if="suffixValue">{{
        suffixValue
      }}</span>
      <button class="pr-2" v-if="isClearable" @click="clear">
        <ui-icon>mdi-close</ui-icon>
      </button>
      <!-- @click="inputFocus(true)" -->
      <span
        v-if="source"
        class="transform transition-all"
        :class="[
          isFocused && 'delay-100 font-semibold text-blue-300 rotate-180',
        ]"
      >
        <ui-icon>mdi-chevron-down</ui-icon>
      </span>
    </div>
    <div
      class="absolute py-1 w-full bottom-0 list bg-white text-gray-900 z-50"
      v-if="showResults && !noResults"
    >
      <ul
        :style="{ width: inputWidth + 'px' }"
        class="p-0 overflow-y-auto max-h-56 rounded-b-lg shadow-xl border"
      >
        <!-- <div
        @click="modelValue = item"
        v-for="(item, index) in qItems"
        :key="index"
      >
        {{ itemValueString(item) }}
      </div> -->
        <template v-if="!hasError">
          <slot name="firstResult"></slot>
          <li
            v-for="(result, key) in results"
            :key="key"
            @click.prevent="select(result)"
            class="appearance-none border-b p-2 cursor-default hover:bg-gray-200"
            :class="{ autocomplete__selected: isSelected(key) }"
            v-html="formatDisplay(result)"
          ></li>
          <slot name="lastResult"></slot>
        </template>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import debounce from "lodash/debounce";

export default {
  //Vue.extend({
  props: {
    /**
     * Data source for the results
     *   `String` is a url, typed input will be appended
     *   `Function` received typed input, and must return a string; to be used as a url
     *   `Array` and `Object` (see `results-property`) are used directly
     */
    prefix: { type: String },
    appendIcon: { type: String },
    prependIcon: { type: String },
    prependInnerIcon: { type: String },
    suffix: { type: String },
    clearable: Boolean,
    tile: Boolean,
    rounded: Boolean,
    dense: Boolean,
    source: {
      type: [String, Function, Array, Object],
      // required: true,
    },
    method: {
      type: String,
      default: "get",
    },
    placeholder: {
      default: "",
    },
    initialValue: {
      type: [String, Number],
    },
    initialDisplay: {
      type: String,
    },
    inputClass: {
      type: [String, Object],
    },
    value: {},
    disableInput: {
      type: Boolean,
    },
    auto: {
      type: Boolean,
    },
    name: {
      type: String,
    },
    resultsProperty: {
      type: String,
    },
    itemText: {
      type: [String, Function],
      default: "name",
    },
    itemValue: String,
    resultsFormatter: {
      type: Function,
    },
    showNoResults: {
      type: Boolean,
      default: true,
    },
    loading: { type: [Boolean, Object] },
    disabled: { type: [Boolean, Object] },
    textarea: {
      type: Boolean,
    },
    requestHeaders: {
      type: Object,
    },
    credentials: {
      type: String,
    },
    clearButtonIcon: {
      type: String,
    },
    maxlength: {
      type: Number,
    },
    type: {
      default: "text",
    },
  },
  data() {
    return {
      results: null,
      selectedIndex: null,
      isFocused: false,
      typing: false,
      error: null,
      selectedId: null,
      selectedDisplay: null,
      eventListener: false,
      //   inputWidth: 0,
    };
  },
  computed: {
    mVal: {
      get() {
        if (this.itemValue)
          return (this.items.find(
            (item) => item[this.itemValue] == this.value
          ) ?? {})[this.itemText];
        if (this.itemText && this.returnObject)
          return this.value[this.itemText];
        return this.value;
      },
      set(value) {
        if (this.$props.items) {
          if (this.$props.autoComplete) {
            let mv = this.$props.items.find((item) => item == value);
            if (!mv) return;
          }
          this.$data.selectedDisplay = value;
        }
        if (this.itemValue) this.$emit("input", value[this.itemValue]);
        else this.$emit("input", value);
      },
    },
    isClearable() {
      return this.clearable && this.value;
    },
    isLoading() {
      return typeof this.loading === "object"
        ? this.loading.value
        : this.loading;
    },
    isDisabled() {
      return typeof this.disabled === "object"
        ? this.disabled.value
        : this.disabled;
    },
    prefixValue() {
      return this.prefix;
    },
    suffixValue() {
      return this.suffix;
    },
    inputStyle() {
      return this.$props.dense ? "py-1" : "py-2";
    },
    // display: {
    //   get() {
    //     return this.value;
    //   },
    //   set(value) {
    //     this.$emit("input", value);
    //   },
    // },
    inputWidth: {
      get() {
        let val = 0;
        let i = this.$refs.inputParent as HTMLElement;
        if (i) val = i.offsetWidth;
        return val;
      },
    },
    showResults() {
      return Array.isArray(this.results) || this.hasError;
    },
    noResults() {
      return Array.isArray(this.results) && this.results.length === 0;
    },
    noResultMessage() {
      return (
        this.noResults &&
        !this.isLoading &&
        this.isFocused &&
        !this.hasError &&
        this.showNoResults
      );
    },
    isEmpty() {
      return !this.modelValue;
    },
    hasError() {
      return this.error !== null;
    },
    listStyle() {
      if (this.isLoading) {
        return {
          color: "#ccc",
        };
      }
      return {};
    },
  },
  methods: {
    inputChange($event) {
      this.modelValue = $event.target.value;
      this.$emit("input", this.modelValue);
      this.typing = true;
      this.search();
    },
    search() {
      this.selectedIndex = null;
      switch (true) {
        case typeof this.source === "string":
          // No resource search with no input
          if (!this.modelValue || this.modelValue.length < 1) {
            return;
          }
          return this.resourceSearch(this.source + this.modelValue);
        case typeof this.source === "function":
          // No resource search with no input
          if (!this.modelValue || this.modelValue.length < 1) {
            return;
          }
          return this.resourceSearch(this.source(this.modelValue));
        case Array.isArray(this.source):
          return this.arrayLikeSearch();
        default:
        // throw new TypeError();
      }
    },
    resourceSearch: debounce(function (url) {
      if (!this.modelValue) {
        this.results = [];
        return;
      }
      this.loading = true;
      this.setEventListener();
      this.request(url);
    }, 200),

    request(url) {
      let promise = fetch(url, {
        method: this.method,
        credentials: this.getCredentials(),
        headers: this.getHeaders(),
      });
      return promise
        .then((response) => {
          if (response.ok) {
            this.error = null;
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((response) => {
          this.results = this.setResults(response);
          this.emitRequestResultEvent();
          this.loading = false;
        })
        .catch((error) => {
          this.error = error.message;
          this.loading = false;
        });
    },
    getHeaders() {
      const headers = {
        Accept: "application/json, text/plain, */*",
      };
      if (this.requestHeaders) {
        for (var prop in this.requestHeaders) {
          headers[prop] = this.requestHeaders[prop];
        }
      }
      return new Headers(headers);
    },
    getCredentials() {
      let credentials = "same-origin";
      if (this.credentials) {
        credentials = this.credentials;
      }
      return credentials;
    },
    setResults(response) {
      if (this.resultsFormatter) {
        return this.resultsFormatter(response);
      }
      if (this.resultsProperty && response[this.resultsProperty]) {
        return response[this.resultsProperty];
      }
      if (Array.isArray(response)) {
        return response;
      }
      return [];
    },
    emitRequestResultEvent() {
      if (this.results.length === 0) {
        this.$emit("noResults", { query: this.modelValue });
      } else {
        this.$emit("results", { results: this.results });
      }
    },
    arrayLikeSearch() {
      this.setEventListener();
      if (!this.modelValue || !this.typing) {
        this.results = this.source;
        this.$emit("results", { results: this.results });
        this.loading = false;
        return true;
      }
      this.results = this.source.filter((item) => {
        return this.formatDisplay(item)
          .toLowerCase()
          .includes(this.modelValue.toLowerCase());
      });
      this.$emit("results", { results: this.results });
      this.loading = false;
    },
    select(obj) {
      if (!obj) {
        return;
      }
      let val =
        this.itemText && obj[this.itemText]
          ? obj[this.itemText]
          : typeof obj === "string"
          ? obj
          : obj.id;
      let sv = (this.selectedDisplay = this.modelValue = this.formatDisplay(
        obj
      ));
      const [iv, rb] = [this.$props.itemValue, this.$props.returnObject];
      if (val && typeof val === "object") {
        if (iv) sv = val[iv];
        if (rb) sv = val;
      }
      this.$emit("input", sv);
      this.$emit("selected", {
        value: this.value,
        display: this.modelValue,
        selectedObject: obj,
      });
      this.close();
    },
    formatDisplay(obj) {
      if (typeof obj === "string") return obj;
      switch (typeof this.itemText) {
        case "function":
          return this.itemText(obj);
        case "string":
          if (!obj[this.itemText]) {
            throw new Error(
              `"${this.itemText}" property expected on result but is not defined.`
            );
          }
          return obj[this.itemText];
        default:
          throw new TypeError();
      }
    },
    focus() {
      if (!this.selectedDisplay && this.modelValue)
        this.selectedDisplay = this.modelValue;
      this.isFocused = true;
      this.typing = false;
      this.$emit("focus");
    },
    blur() {
      this.isFocused = false;
      this.$emit("blur");
    },
    isSelected(key) {
      return key === this.selectedIndex;
    },
    up() {
      if (!this.results) return;
      if (this.selectedIndex === null) {
        this.selectedIndex = this.results.length - 1;
        return;
      }
      this.selectedIndex =
        this.selectedIndex === 0
          ? this.results.length - 1
          : this.selectedIndex - 1;
    },
    down() {
      if (!this.results) return;
      if (this.selectedIndex === null) {
        this.selectedIndex = 0;
        return;
      }
      this.selectedIndex =
        this.selectedIndex === this.results.length - 1
          ? 0
          : this.selectedIndex + 1;
    },
    enter() {
      if (this.selectedIndex === null) {
        this.$emit("nothingSelected", this.modelValue);
        return;
      }
      this.select(this.results[this.selectedIndex]);
      this.$emit("enter", this.modelValue);
    },
    clear() {
      this.modelValue = null;
      // this.value = null;
      this.results = null;
      this.error = null;
      this.$emit("clear");
    },
    close() {
      const [d, sd, auto] = [this.modelValue, this.selectedDisplay, this.auto];
      auto &&
        d &&
        d != sd &&
        (sd ? (this.modelValue = this.selectedDisplay) : this.clear());
      this.selectedDisplay = this.modelValue;
      this.results = null;
      this.error = null;
      this.removeEventListener();
      this.$emit("close");
    },
    setEventListener() {
      if (this.eventListener) {
        return false;
      }
      this.eventListener = true;
      document.addEventListener("click", this.clickOutsideListener, true);
      return true;
    },
    removeEventListener() {
      this.eventListener = false;
      document.removeEventListener("click", this.clickOutsideListener, true);
    },
    clickOutsideListener(event) {
      if (this.$el && !this.$el.contains(event.target)) {
        this.close();
      }
    },
  },
  mounted() {
    // this.value = this.initialValue;
    this.modelValue = this.$props.value;
    // this.$data.modelValue = this.selectedDisplay = this.$props.value;
  },
};
</script>

<style scoped>
ul {
  /* max-width: inherit; */
  /* width: inherit; */
}
</style>
