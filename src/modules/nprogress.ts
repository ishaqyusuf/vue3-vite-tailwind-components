import NProgress from "nprogress";

export default {
  install: (app, router) => {
    // if (isClient) {
    router.beforeEach(() => {
      NProgress.start();
    });
    router.afterEach(() => {
      NProgress.done();
    });
  },
};
