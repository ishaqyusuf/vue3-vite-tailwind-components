import { computed } from "vue";
export function useModelWrapper(
  props,
  emit,
  name = "modelValue",
  getFn = () => props[name]
) {
  return computed({
    get: () => getFn(),
    set: (value) => emit(`update:${name}`, value),
  });
}
