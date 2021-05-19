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
  refreshable,
};
