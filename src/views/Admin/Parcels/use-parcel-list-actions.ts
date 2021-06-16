import useParcel from "@/use/parcels/parcel";
export default function useParceListActions({
  userls,
  parcels,
  list,
  labelRef,
  trackingEditor,
  parcelForm,
}) {
  return {
    delete: {
      action: async (item) => {
        const data = await useParcel.deleteOne(item.track_code);
      },
    },
    selectClient: {
      action: (item) => {
        userls.value.open().then(async (user) => {
          await parcels.updateParcelRecipient(item.track_code, user, list);
        });
      },
    },
    openLabel: {
      action: (item) => {
        labelRef.value.open(item);
      },
    },
    updateTracking: {
      action: (item) => {
        trackingEditor.value.init(
          {},
          {
            post_parent: item.id,
            type: null,
          },
          item.id
        );
      },
    },
    openParcelForm: {
      action: (item) => {
        parcelForm.value.open(item);
      },
    },
  };
}
