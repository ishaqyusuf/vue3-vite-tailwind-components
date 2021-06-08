// import { TableStructure } from "@/@types/Interface";
// import { ref } from "vue";
// import useSmartApi from "../api/use-smart-api";
// import useAddress from "../api/useAddress";
// import useList from "../useList";

// const list = useList();
// list.initialize([], useAddress.transform, {
//   delete: async (item) => {
//     await useSmartApi.request("delete", ["address-book", item.id]);
//   },
//   editAddress: async (item) => {
//     openUserForm(item);
//   },
// });
// const structure: TableStructure[] = [
//   {
//     name: "main",
//   },
// ];

// const loaded =ref<Boolean>()
// function load() {
//     if(!loaded.value) {
//         list.initialize()
//     }
// }
// export default {
// structure
// };
