import { $clientApi } from "@/core/services/client";
import { $dev } from "@/core/utils/functions";
import qs from "qs";
async function getAddress(id) {
  const url = ["address-book", id].join("/");
  const { data } = await $clientApi.get(url);
  return data;
}
async function getAddreses(query) {
  const url = ["address-book", qs.stringify(query)].join("?");
  const { data } = await $clientApi.get(url);
  return data.items;
}
async function deleteAddress(id) {
  const url = ["address-book", id].join("/");
  const { data } = await $clientApi.delete(url);
  return data;
}
async function saveAddress(form, success = null, error = null) {
  const id = form.id;
  const url = ["address-book", id].filter(Boolean).join("/");
  const formData = {
    data: form,
  };
  const req = !id
    ? $clientApi.post(url, formData)
    : $clientApi.patch(url, formData);
  try {
    const { data } = await req;
    return data;
  } catch (error) {
    $dev.error(error);
  }
}

export default {
  getAddress,
  getAddreses,
  deleteAddress,
  saveAddress,
};