import { TableStructure } from "@/@types/Interface";
import { useUsersApi } from "@/use/api/use-api";
import useList from "@/use/useList";
import { reactive, ref } from "vue";
export function userList(page) {
  const isClient = ref(page == "clients");

  const userls = ref();
  const userForm = ref();

  const formConfig = reactive({
    title: "",
    password: false,
    eData: false,
  });
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
  const openUserForm = async (user) => {
    userForm.value.open(user).then(async (_user) => {
      list.updateItem(_user.id, _user);
      console.log(_user);
    });
  };
  list.initialize(
    [],
    (item, data) => {
      return data;
    },
    {
      createEmployee: async () => {},
      updatePassword: async (user) => {
        formConfig.title = "Update Password";
        formConfig.password = true;
        formConfig.eData = false;
        openUserForm(user);
      },
      updateRole: async (user) => {
        formConfig.title = "Update Role";
        formConfig.password = false;
        formConfig.eData = true;
        openUserForm(user);
      },
      userForm: async (user) => {
        const t = isClient.value ? "Client" : "Employee";
        formConfig.title = [user ? "Update" : "Create", t].join(" ");
        formConfig.password = formConfig.eData = false;
        openUserForm(user);
      },
    }
  );
  const query: any = {};
  if (isClient.value) query.customers = true;
  else query.employees = true;
  const userApi = useUsersApi(query);
  return {
    formConfig,
    structures,
    userls,
    userForm,
    isClient,
    list,
    api: userApi,
  };
}

export default {};
