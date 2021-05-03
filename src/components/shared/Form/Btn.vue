<script lang="ts">
import { resolveComponent, toRef, toRefs, h, computed } from "vue";
import { btnMixins } from "@/mixins/btn";
// import mixins from "vue-typed-mixins";

export default {
  mixins: [btnMixins],
  setup(props, { slots, emit }) {
    const objectValue = (object) =>
      typeof object === "object" ? object.value : object;

    // const loading = computed(() => props.loading).value;
    // const disabled = computed(() => objectValue(props.disabled)).value;
    const {
      fab,
      dense,
      icon,
      secondary,
      tertiary,
      color,
      tile,
      large,
      xLarge,
      small,
      type,
    } = props;
    const loading = toRef(props, "loading");
    const disabled = toRef(props, "disabled");
    console.log(disabled);
    const primary = !icon && !secondary && !tertiary;
    const _class = [
      disabled.value && "gray-scale",
      { "cursor-default": loading.value },
      { "border focus:ring-2 font-poppins shadow-lg": !tertiary && !icon },
      { "rounded-full w-9 h-9": fab },
      { "text-base focus:outline-none border-separate relative": true },
      { "rounded-lg": !tile },
      { "text-lg h-12": large },
      { "text-lg h-14": xLarge },
      { "text-sm h-7": small },
      primary && `bg-${color}-600 text-white hover:bg-${color}-700`,
      { "bg-white text-gray-700 hover:bg-gray-50": secondary },
    ];
    const prefix = (value) => (slots.prefix ? slots.prefix(value) : []);
    const suffix = (value) => (slots.suffix ? slots.suffix(value) : []);
    const defaultSlot = () => (slots.default ? slots.default() : []);

    const pathAttrs = {
      d: "M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z",
    };
    const svgAttrs = {
      fill: "currentColor",
      width: "1.2em",
      height: "1.2em",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
    };
    const loader = h(
      "div",
      {
        class: [
          {
            "absolute left-0 inline-flex items-center justify-center top-0 bottom-0  right-0": true,
            "opacity-0": !loading.value,
            " text-gray-900": !primary,
            "text-white": primary,
          },
        ],
      },
      [
        h(
          "svg",
          {
            ...svgAttrs,
            class: ["animate-spin"],
          },
          [
            h("path", {
              ...pathAttrs,
            }),
          ]
        ),
      ]
    );
    const button = h(
      "button",
      {
        onClick: ($event) => emit("click"),
        class: _class,
        type: type,
      },
      [
        loading.value && loader,
        h(
          "div",
          {
            class: [
              {
                "inline-flex items-center justify-center w-full space-x-2": true,
              },
              { "opacity-0": loading.value },
              { "px-4 h-9": !dense && !fab && !icon },
              { "px-2": dense },
            ],
          },
          [prefix({}), defaultSlot(), suffix({})]
        ),
      ]
    );
    const url = props.to ?? props.href;
    return () =>
      url ? h(resolveComponent("router-link"), { to: url }, [button]) : button;
  },
};
</script>

<style></style>
