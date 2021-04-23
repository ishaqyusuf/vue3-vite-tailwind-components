const titleHelper = (to, from, next) => {
  let metas = to.matched;
  if (metas.length == 0) metas = from.matched;
  let pubs: any[] = metas.slice().reverse();
  let meta = pubs[0]?.meta;

  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  const title = ["Vite"];
  if (nearestWithTitle) title.unshift(nearestWithTitle.meta.title);
  // if (to.name == "logout" || (from.name == "logout" && !to.name)) {
  //   _user.logout();
  // }
  document.title = title.filter(Boolean).join(" | ");
};

export default titleHelper;
