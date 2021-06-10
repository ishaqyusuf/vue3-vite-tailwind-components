import { IUseList } from "@/@types/Interface";
import { any } from "cypress/types/bluebird";
import { ref, computed, reactive, toRefs, PropType } from "vue";
import alert from "./alert";
import time from "./time";
//old query,new query,keys
const refreshable = (oq, nq, noRefreshKeys = [""], keys = ["page"]) => {
  var canRefresh = false;
  var blackList = Object.keys(nq).some((k) =>
    noRefreshKeys.some((n) => n == k)
  );
  if (!blackList)
    keys.map((k) => {
      let ov = oq[k];
      let nv = nq[k];
      if (!canRefresh)
        canRefresh =
          [ov, nv].filter(Boolean).length == 1 || (ov && nv && ov != nv);
    });
  return canRefresh;
};
export default {
  props: {
    selector: Boolean,
    editable: Boolean,
    vintage: Boolean,
    tile: Boolean,
    deletable: Boolean,
    hideActions: Boolean,
    hideChecks: Boolean,
    textAction: Boolean,
    action: Boolean,
    floatingAction: Boolean,
    dense: Boolean,
    noDivide: Boolean,
    moreAction: Boolean,
    noHead: Boolean,
    checkable: Boolean,
    stickyAction: Boolean,
    structure: { type: Object, required: true },
    pager: Array,
    onDelete: Object,
    // worker: { type: Object as PropType<IUseList>, required: true },
    useList: useListPropType(),
  },
  refreshable,
};
export function useListPropType() {
  return {
    type: Object as PropType<IUseList>,
    default: () => {
      return {};
    },
  };
}
export function tableHook<T>() {
  const data = reactive<{
    items: any[]; //T[];
    ids: number[];
    itemsById: { [id in number]: any };
    checkedIds: number[];
  }>({
    items: [],
    ids: [],
    itemsById: {},
    checkedIds: [],
  });
  const loading = ref(false);
  const items = ref<any[]>([]);
  const extendedItems = computed(() => {
    return data.ids.map((id) => ({
      id,
      item: transFormData(data.itemsById[id]),
      isChecked: data.checkedIds.includes(id),
    }));
  });
  const updateItem = (id, _item: T, _push = true) => {
    const item = data.itemsById[id];

    if (item) {
      data.itemsById[id] = Object.freeze({
        ...item,
        ..._item,
      });
    } else _push ? push(_item) : unshift(_item);
  };

  const checkAll = computed({
    get: () => {
      return data.ids.every((id) => data.checkedIds.includes(id));
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
    data.itemsById = {};
    data.ids.splice(0);
    // [data.items, data.ids].map((arr) => arr.splice(0));
    const newItems = (items.value = data.items = _items.map((item) => {
      const freezed = (data.itemsById[item.id] = Object.freeze(item));
      data.ids.indexOf(item.id) < 0 && data.ids.push(item.id);
      return freezed;
    }));
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
    data.itemsById[item.id] = Object.freeze(item);
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
    checkAll,
    toggleAll,
    extendedItems,
    updateItem,
    setCheckedItemsById,
    initialize,
    refresh,
    data,
    deleteItem,
    clearChecks,
    deleteMany,
    unshift,
    push,
    deleteSelection,
    loading,
  };
}
