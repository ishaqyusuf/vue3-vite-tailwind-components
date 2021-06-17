import { TableStructure } from "@/@types/Interface";
import { useUsersApi } from "@/use/api/use-api";
import useList from "@/use/useList";
import { ref } from "vue";
export function userList(page) {
  const isClient = ref(page == "clients");
  const title = ref(page);
  const userls = ref();
  const userForm = ref();
  const structures: TableStructure[] = [
    { name: "id", title: "User #" },
    { name: "user", title: "Profile" },
  ].filter(Boolean);
  if (isClient.value) {
    structures.push(
      ...[
        { name: "total_parcels", title: "Parcels" },
        { name: "shipped_parcels", title: "Shipped" },
        { name: "invoice", title: "Invoice" },
      ]
    );
  } else {
    structures.push(...[{ name: "position", title: "Role" }]);
  }
  const list = useList();
  list.initialize(
    [],
    (item, data) => {
      return data;
    },
    {
      createEmployee: async () => {},
      userForm: async (user) => {
        userForm.value.open(user).then(async (user) => {
          console.log(user);
        });
      },
    }
  );
  const query: any = {};
  if (isClient.value) query.customers = true;
  else query.employees = true;
  const userApi = useUsersApi(query);
  return {
    structures,
    userls,
    userForm,
    isClient,
    list,
    api: userApi,
  };
}

export default {};
