import { TableStructure } from "@/@types/Interface";
import PagerInterface from "@/@types/PagerInterface";
import { useUsersApi } from "@/use/api/use-api";
import { useExport } from "@/use/data/use-export";
import useList from "@/use/useList";
import { computed, reactive, ref } from "vue";

const page = ref();

const isClient = computed(() => page.value == "clients");

const userls = ref();
const userForm = ref();
const exportConfig = ref<any>([]);
const initialize = async (pg) => {
  initialized.value = false;
  page.value = pg;
  structures.value = [
    { name: "id", title: "User #" },
    { name: "user", title: "Profile" },
  ].filter(Boolean);
  if (isClient.value) {
    structures.value.push(
      ...[
        { name: "total_parcels", title: "Parcels" },
        { name: "shipped_parcels", title: "Shipped" },
        { name: "invoice", title: "Invoice" },
      ]
    );
  } else {
    structures.value.push(...[{ name: "position", title: "Role" }]);
  }
  initialized.value = true;
  exportConfig.value = useExport(structures.value);

  if (isClient.value) query.value.customers = true;
  else query.value.employees = true;
  userApi.value = useUsersApi(query.value);

  const data = await userApi.value.index();
  list.refresh(data.items, true);
  pager.value = data.pager;
};
const formConfig = reactive({
  title: "",
  password: false,
  eData: false,
});
const structures = ref<TableStructure[]>([]);
const initialized = ref(false);
const list = useList();
const openUserForm = async (user) => {
  userForm.value.open(user).then(async (_user) => {
    list.updateItem(_user.id, _user);
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
const query = ref<any>({});

const userApi = ref<any>();
const pager = ref<PagerInterface>({});
export default {
  pager,
  exportConfig,
  formConfig,
  initialize,
  structures,
  userls,
  userForm,
  isClient,
  list,
  api: userApi,
  initialized,
};
