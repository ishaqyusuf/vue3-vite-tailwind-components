import useParcel from "@/use/parcels/parcel";

export default function useParceListActions({
  userls,
  parcels,
  list,
  labelRef,
  trackingEditor,
  parcelForm,
  parcelAddress,
}) {
  const clientWorker = (item, current = null) => {
    parcelAddress.value.openForm(item, current).then(async (user) => {
      await parcels.updateParcelRecipient(item.track_code, user, list);
    });
  };
  return {
    delete: {
      action: async (item) => {
        const data = await useParcel.deleteOne(item.track_code);
      },
    },
    selectClient: {
      action: (item) => clientWorker(item),
    },
    updateClient: async (data: any = {}) =>
      clientWorker(data.item, data.current),
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
