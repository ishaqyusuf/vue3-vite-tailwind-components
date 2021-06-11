import { MetaDataType, useMetaApi } from "./use-meta-data-api";

export default {
  units: async () => {
    const { data } = await useMetaApi(MetaDataType.UNIT_SYSTEM).index(
      { single: true },
      {
        cache: true,
      }
    );
    return {
      currency: data.primary_currency,
      ...data,
    };
  },
};
