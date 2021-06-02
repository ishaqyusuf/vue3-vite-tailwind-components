import { $clientApi } from "@/core/services/client";

import qs from "qs";

const getNotes = async (query) => {
  const { data } = await $clientApi.get("notes?" + qs.stringify(query));
  return data;
};
const saveNote = async (form, slug = null) => {
  const url = ["notes", slug].filter(Boolean).join("/");
  const req = slug ? $clientApi.patch(url, form) : $clientApi.post(url, form);

  const { data } = await req;
  return data;
};
const deleteNote = async (slug) => {
  const { data } = await $clientApi.delete("notes/" + slug);
  return data;
};
export default {
  getNotes,
  saveNote,
  deleteNote,
};
