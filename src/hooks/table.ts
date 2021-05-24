import { TableWorker } from "@/@types/Interface";
import { any } from "cypress/types/bluebird";
import { ref, computed, reactive, toRefs, PropType } from "vue";
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
    editable: Boolean,
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
    worker: { type: Object as PropType<TableWorker>, required: true },
  },
  refreshable,
};

export function tableHook<T>(): TableWorker {
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
  const items = ref<any[]>([]);
  const extendedItems = computed(() => {
    return data.ids.map((id) => ({
      id,
      item: transFormData(data.itemByIds[id]),
      isChecked: data.checkedIds.includes(id),
    }));
  });
  const updateItem = (id, _item: T) => {
    const item = data.itemByIds[id];
    if (item) {
      data.itemByIds[id] = Object.freeze({
        ...item,
        ..._item,
      });
    }
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
    _transformer = null,
    _actions: tableAction = {}
  ) => {
    reset();
    transformer.value = _transformer;
    actions.value = _actions;
    refresh(items, true);
  };
  const refresh = (_items: any[] = [], clearState = false) => {
    if (clearState) data.checkedIds = [];
    data.items = [];
    data.itemByIds = {};
    data.ids.splice(0);
    // [data.items, data.ids].map((arr) => arr.splice(0));
    const newItems = (items.value = data.items = _items.map((item) => {
      const freezed = (data.itemByIds[item.id] = Object.freeze(item));
      data.ids.indexOf(item.id) < 0 && data.ids.push(item.id);
      return freezed;
    }));
  };
  const reset = () => {
    data.ids = data.checkedIds = data.items = [];
  };
  const transformer = ref<any>(null);

  const transFormData = (item) => {
    return transformer.value(item) ?? item;
  };

  const deleteItem = async (id) => {
    return performAction("delete", id, () => {
      const index = data.ids.findIndex((v) => v == id);
      if (index > -1) data.ids.splice(index, 1);
    });
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
  };
}
