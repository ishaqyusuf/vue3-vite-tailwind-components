<template>
  <div class="flex flex-col">
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
      class="border relative border-gray-300 hover:border-blue-300 shadow group"
    >
      <div class="flex px-2 items-center space-x-2">
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
            :class="[dense ? 'py-1' : 'py-2', inputClass]"
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
              :class="[
                select && 'cursor-pointer',
                dense ? 'py-1' : 'py-2',
                inputClass,
              ]"
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
        class="absolute my-1 origin-bottom-left w-full bg-white text-gray-900 z-50"
      >
        <slot name="menu" v-bind="$props">
          <ul
            :class="[fadeList && 'opacity-0']"
            :style="listStyle"
            class="p-0 w-full overflow-y-auto max-h-56 rounded-b-lg shadow-xl border"
          >
            <!-- <template> -->
            <slot name="firstResult"></slot>
            <slot name="results" v-bind:items="results">
              <li
                v-for="(result, index) in results"
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
            <!-- </template> -->
          </ul>
        </slot>
      </div>
    </div>
    <!-- <InputeMenu :data="data" v-bind="$props"></InputeMenu> -->
  </div>
</template>

<script lang="ts">
import {
  ref,
  computed,
  onMounted,
  toRefs,
  onBeforeUpdate,
  reactive,
} from "vue";
import useTime from "@/hooks/time";
import input from "@/hooks/input";
export default {
  props: input.props,
  setup(props, { emit }) {
    const data = reactive({
      inputFocus: false,
      rawVal: null,
      typing: false,
      lastValidVal: null,
      selectedIndex: -1,
      fadeList: false,
      itemClick: false,
      onFocusValue: null,
      dirty: false,
      val: null,
      hideText: true,
    });
    const inputRef = ref<any>(null);

    onMounted(() => {
      data.rawVal = props.value;
      data.val = inputDisplayValue.value;
    });

    function getObjectValue(item, key, defaultValue = null) {
      return typeof item === "object" && key && item ? item[key] : defaultValue;
    }
    function setModelValue(value, strict = false) {
      data.typing = true;
      data.rawVal = value;
      if (props.items?.indexOf(data.rawVal) >= 0) data.lastValidVal = value;
      emit("update:modelValue", currentValue(value, strict));
      data.val = inputDisplayValue.value;
    }
    function currentValue(value = null, strict = false) {
      if (!value && !strict) value = props.value;
      return !value || (data.inputFocus && !data.itemClick)
        ? value
        : getObjectValue(value, props.itemValue, value);
    }
    const selectItem = (item) => {
      data.itemClick = true;
      setModelValue(item);
    };
    function focus() {
      data.lastValidVal = data.rawVal;
      data.selectedIndex = -1;
      data.onFocusValue = getInputDisplayValue();
      data.inputFocus = true;
      data.typing = data.fadeList = data.dirty = data.itemClick = false;
    }
    function blur() {
      data.fadeList = true;
      useTime.delay(200).then((d) => {
        data.inputFocus = data.typing = false;

        const [val, items, it, lvl, iv] = [
          props.value,
          props.items,
          props.itemText,
          data.lastValidVal,
          props.itemValue,
        ];
        if (props.autoComplete && !data.itemClick && data.dirty) {
          let smv = null; //query(onFocusValue, true, true)[0];
          if (typeof val === "string") smv = query(val, true, true)[0];
          else {
            if (items?.indexOf(val) >= 0) smv = val;
          }
          setModelValue(smv, true);
        }
        let cv = getInputDisplayValue();
        if (data.onFocusValue != cv) {
          emit("change", currentValue());
        }
      });
    }
    function displayValue(item) {
      return getObjectValue(item, props.itemText, item);
    }
    function isSelected(key) {
      return key === data.selectedIndex;
    }
    function up($event) {
      let q = query();
      if (!q) return;
      if (data.selectedIndex === null) {
        data.selectedIndex = q.length - 1;
        return;
      }
      data.selectedIndex =
        data.selectedIndex === 0 ? q.length - 1 : data.selectedIndex - 1;
      $event.preventDefault();
    }
    function down($event) {
      let q = query();

      if (!q) return;
      if (data.selectedIndex === null) {
        data.selectedIndex = 0;
        return;
      }
      data.selectedIndex =
        data.selectedIndex === q.length - 1 ? 0 : data.selectedIndex + 1;
      $event.preventDefault();
    }
    function enter() {
      if (data.selectedIndex === null) {
        blur();
        return;
      }
      selectItem(query()[data.selectedIndex]);
    }
    function close() {}
    function clear() {
      setModelValue(null, true);
      blur();
      // inputRef.value.focus();
    }
    function valueInput($event) {
      data.dirty = true;
      setModelValue($event.target.value);
    }
    function query(s: any = null, important = false, exact = false) {
      if (!important && (props.readonly || !data.typing)) return props.items;
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
      let iv = data.rawVal ?? props.value;
      let ivt = props.itemValue && props.itemText;
      if (ivt && !data.typing)
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
    // const inputWidth = computed(() => {
    //   let val = 0;
    //   let i = refs.value[0] as HTMLElement;
    //   if (i) val = i.offsetWidth;
    //   return val;
    // });
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
      data.hideText = !data.hideText;
      inputRef.value.focus();
      event.preventDefault();
    };
    return {
      styles,
      inputRef,
      listStyle: {
        "z-index": 9999,
      },
      keyup: () => emit("keyup"),
      keydown: () => emit("keydown"),
      selectItem,
      results,
      clear,
      close,
      // inputWidth,
      isSelected,
      inputDisplayValue,
      displayValue,
      valueInput,
      data,
      ...toRefs(data),
      isDisabled: computed(
        () => props.loading || props.disabled || props.select
      ),
      togglePassword,
      typeValue: computed(() =>
        props.password && !data.hideText ? "text" : props.type
      ),
      hasItems,
      hasValue: computed(() => inputDisplayValue.value),
      isClearable,
      isReadonly,
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
