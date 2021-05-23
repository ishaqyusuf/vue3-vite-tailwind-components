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
  const toggleAll = computed({
    get: () => {
      return data.ids.every((id) => data.checkedIds.includes(id));
    },
    set: (isChecked) => {
      data.ids.map((id) => setCheckedItemsById({ id, isChecked }));
    },
  });
  const setCheckedItemsById = ({ id, isChecked }) => {
    const index = data.checkedIds.indexOf(id);
    if (isChecked && index === -1) data.checkedIds.push(id);
    else if (!isChecked && index !== 1) data.checkedIds.splice(index, 1);
  };
  const init = (items: any[] = [], _transformer = null) => {
    transformer.value = _transformer;
    // data.ids = items.map((item) => item.id);

    data.itemByIds = {};
    data.ids = [];
    data.items = items.map((item) => {
      data.itemByIds[item.id] = item;
      data.ids.push(item.id);
      return Object.freeze(item);
    });
  };
  const clear = () => {
    data.ids = [];
  };
  const transformer = ref<any>(null);

  const transFormData = (item) => {
    return transformer.value(item) ?? item;
  };

  return {
    clear,
    toggleAll,
    ...toRefs(data),
    extendedItems,
    updateItem,
    setCheckedItemsById,
    init,
    data,
  };
}
