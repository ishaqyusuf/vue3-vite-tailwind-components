import { TableStructure } from "@/@types/Interface";
import { ref } from "vue";
import useSmartApi from "../api/use-smart-api";
import useAddress from "../api/useAddress";
import useList from "../useList";
import userAccount from "../user-account";

const list = useList();

const getAddress = (id) => {
  return list.itemByIds[id];
};
const structure: TableStructure[] = [
  {
    name: "main",
  },
];

const isAdmin = ref<boolean>();
const loaded = ref<Boolean>();
const init = async () => {
  if (!loaded.value) {
    list.initialize([], useAddress.transform, {
      delete: async (item) => {
        await useSmartApi.request("delete", ["address-book", item.id]);
      },
      editAddress: async (item) => {
        openUserForm(item);
      },
    });
    isAdmin.value = userAccount.can("readAdmin");
    const addressBook = await useSmartApi.request("get", "address-book", {
      all_books: true,
      department: isAdmin.value,
    });
    list.refresh(addressBook.items);
  }
};

const userForm = ref();
var usr = userAccount.user.value;
const { full_name: name, email } = usr ?? {};
const openUserForm = (
  form = {
    name,
    email,
    phone: {},
    user_id: isAdmin.value ? null : usr.id,
    type: isAdmin.value ? "department" : null,
  }
) => {
  userForm.value.open(form).then((address) => {
    list.updateItem(address.id, address, true);
  });
};
export default {
  isAdmin,
  init,
  structure,
  getAddress,
  list,
};
