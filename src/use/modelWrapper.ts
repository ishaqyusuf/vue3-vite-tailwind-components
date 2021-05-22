import { computed } from "vue";
export function useModelWrapper(
  props,
  emit,
  name = "modelValue",
  getFn: any = null,
  setFn: any = null
) {
  return computed({
    get: () => (getFn ? getFn() : props[name]),
    set: (value) => emit(`update:${name}`, setFn ? setFn(value) : value),
  });
}
