import { $clientApi } from "@services/client";
import { $dev } from "@/core/utils/functions";
import qs from "qs";

const fetchMany = async (query) => {
  try {
    const { data } = await $clientApi.get(`/parcels?${qs.stringify(query)}`);
    return data;
  } catch (err) {
    $dev.error(err);
  }
};
const fetchOne = async (id, query = {}) => {
  try {
    const { data } = await $clientApi.get(
      `/parcels/${id}?${qs.stringify(query)}`
    );
    return data;
  } catch (err) {
    $dev.error(err);
  }
};
const createOne = async (form) => {
  try {
    const { data } = await $clientApi.post("/parcels", form);
    return data;
  } catch (err) {
    $dev.error(err);
  }
};
const updateOne = async (id, _data) => {
  try {
    const { data } = await $clientApi.patch(`/parcels/${id}`, _data);
    return data;
  } catch (err) {
    $dev.error(err);
  }
};
const deleteOne = async (id) => {
  try {
    const { data } = await $clientApi.delete(`/parcels/${id}`);
    return data;
  } catch (err) {
    $dev.error(err);
  }
};
const deleteMany = async (ids) => {
  try {
    const { data } = await $clientApi.post(`/parcels/batch-delete`, { ids });
    return data;
  } catch (err) {
    $dev.error(err);
  }
};
export default {
  fetchMany,
  fetchOne,
  createOne,
  updateOne,
  deleteOne,
  deleteMany,
};
