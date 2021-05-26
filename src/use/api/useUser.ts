import { $clientApi } from "@/core/services/client";
import alert from "@/hooks/alert";
import useAddress from "./useAddress";

async function getUser(form, address) {
  if (address) {
    const _address = await useAddress.saveAddress(address);
    form.address_id = _address.id;
  }
  if (!form.password) delete form.password;
  return form;
}
async function createUser(form, address: any = null) {
  const { data } = await $clientApi.post("usrs", {
    data: await getUser(form, address),
  });
  if (data.error) {
    alert.register(data.error, true);
  }
  return data;
}
async function updateUser(form, address: any = null) {
  const { data } = await $clientApi.post("usrs", {
    data: await getUser(form, address),
  });

  if (data.error) {
    alert.register(data.error, true);
  }
  return data;
}

export default {
  createUser,
  updateUser,
};
