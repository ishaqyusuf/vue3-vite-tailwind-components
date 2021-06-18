import { reactive } from "vue";

const useRouteData = reactive<{ params: any; query: any }>({
  params: {},
  query: {},
});
export default useRouteData;
