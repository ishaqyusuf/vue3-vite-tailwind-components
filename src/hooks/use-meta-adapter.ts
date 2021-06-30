import { MetaDataType, useMetaApi } from "@/use/api/use-meta-data-api";
import { reactive } from "vue";

export async function loadTransformedClientForm() {
  const rData = reactive<any>({});
  try {
    const data = await useMetaApi(MetaDataType.PARCEL_CLIENT_DATA, true).index(
      {},
      {
        cache: true,
      }
    );
    if (data) {
      rData.data = data?.content?.data ?? {};
      rData.vff = data?.content?.forms ?? {};
      rData.dff = data?.content?.readonly ?? {};
    }
  } catch {}
  return rData;
}
