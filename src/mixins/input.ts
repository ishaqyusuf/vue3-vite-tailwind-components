export const inputMixins = {
  props: {
    props: {
      required: { type: Boolean },
      pattern: {},
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
  },
};
