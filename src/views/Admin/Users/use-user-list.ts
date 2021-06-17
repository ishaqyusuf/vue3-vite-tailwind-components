import { TableStructure } from "@/@types/Interface";
import { useUsersApi } from "@/use/api/use-api";
import useList from "@/use/useList";
import { ref } from "vue";
export function userList(page) {
  const isClient = ref(page == "clients");

  const structures: TableStructure[] = [
    { name: "id", title: "User #" },
    { name: "user", title: "Profile" },
  ].filter(Boolean);
  if (isClient.value) {
    structures.push(
      ...[
        { name: "parcels", title: "Parcels" },
        { name: "shipped", title: "Shipped" },
        { name: "invoice", title: "Invoice" },
      ]
    );
  } else {
    structures.push(...[{ name: "role", title: "Role" }]);
  }
  const list = useList();
  list.initialize([], (item, data) => {
    return data;
  });
  const query: any = {};
  if (isClient.value) query.customers = true;
  else query.employees = true;
  const userApi = useUsersApi(query);
  return {
    structures,
    list,
    api: userApi,
  };
}

export default {};
