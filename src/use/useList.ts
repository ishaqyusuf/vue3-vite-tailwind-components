import alert from "@/hooks/alert";
import { reactive, ref, computed, toRefs } from "@vue/reactivity";

export default function useList<T>() {
  const data = reactive<{
    items: any[]; //T[];
    ids: number[];
    itemByIds: { [id in number]: any };
    checkedIds: number[];
  }>({
    items: [],
    ids: [],
    itemByIds: {},
    checkedIds: [],
  });
  const refItemByIds = ref<{ [id in number]: any }>({});

  const loading = ref(false);
  const items = ref<any[]>([]);
  const extendedItems = computed(() => {
    return data.ids.map((id) => ({
      id,
      item: transFormData(data.itemByIds[id]),
      isChecked: data.checkedIds.includes(id),
    }));
  });
  const updateItem = (id, _item: T, _push = true) => {
    const item = data.itemByIds[id];

    if (item) {
      data.itemByIds[id] = Object.freeze({
        ...item,
        ..._item,
      });
    } else _push ? push(_item) : unshift(_item);
  };

  const checkAll = computed({
    get: () => {
      return (
        data.ids.length > 0 &&
        data.ids.every((id) => data.checkedIds.includes(id))
      );
    },
    set: (isChecked) => {
      toggleAll(isChecked);
    },
  });
  const clearChecks = () => data.checkedIds.splice(0);
  const toggleAll = (isChecked) =>
    data.ids.map((id) => setCheckedItemsById({ id, isChecked }));
  const setCheckedItemsById = ({ id, isChecked }) => {
    const index = data.checkedIds.indexOf(id);
    if (isChecked && index === -1) data.checkedIds.push(id);
    else if (!isChecked && index !== 1) data.checkedIds.splice(index, 1);
  };
  const initialize = (
    items: any[] = [],
    _transformer: any = null,
    _actions: tableAction = {}
  ) => {
    reset();
    transformer.value = _transformer;
    actions.value = _actions;
    refresh(items, true);
    loading.value = true;
  };
  const refresh = (_items: any[] = [], clearState = false) => {
    if (clearState) data.checkedIds = [];
    data.items = [];
    refItemByIds.value = data.itemByIds = {};
    data.ids.splice(0);
    // [data.items, data.ids].map((arr) => arr.splice(0));
    items.value = data.items = _items.map((item) => {
      const freezed = (refItemByIds.value[item.id] = data.itemByIds[
        item.id
      ] = Object.freeze(item));
      data.ids.indexOf(item.id) < 0 && data.ids.push(item.id);
      return freezed;
    });
    loading.value = false;
  };
  const reset = () => {
    data.ids = data.checkedIds = data.items = [];
  };
  const transformer = ref<any>(null);

  const transFormData = (item) => {
    return transformer.value(item) ?? item;
  };
  const deleteItem = async (id, _alert = true) => {
    return performAction("delete", id, () => {
      removeItem(id, true);
    });
  };
  const deleteMany = async (ids: number[]) => {
    return performAction("deleteMany", ids, () => {
      ids.map((id) => removeItem(id, false));
    });
  };
  const deleteSelection = async () => deleteMany(data.checkedIds);
  const removeItem = (id, _alert = false) => {
    const index = data.ids.findIndex((v) => v == id);
    if (index > -1) {
      data.ids.splice(index, 1);
      _alert && alert.register("Deleted!");
    } else _alert && alert.register("Unable to complete", true);
  };

  const unshift = (item) => {
    data.ids.unshift(item.id);
    addItem(item);
  };
  const push = (item) => {
    data.ids.push(item.id);
    addItem(item);
  };
  const addItem = (item) => {
    data.itemByIds[item.id] = Object.freeze(item);
  };
  const performAction = async (_action, id, then) => {
    const getAction = actions.value[_action];
    if (getAction)
      getAction.async ? await getAction.action(id) : getAction.action(id);
    then();
  };
  type tableAction = {
    [id in string]: {
      action?: any;
      async?: Boolean;
    };
  };
  const actions = ref<tableAction>({});
  return {
    reset,
    refItemByIds,
    checkAll,
    toggleAll,
    extendedItems,
    updateItem,
    setCheckedItemsById,
    initialize,
    refresh,
    data,
    ...toRefs(data),
    deleteItem,
    clearChecks,
    deleteMany,
    unshift,
    push,
    deleteSelection,
    loading,
  };
}
