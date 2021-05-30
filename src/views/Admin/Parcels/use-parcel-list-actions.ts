export default function useParceListActions({
  userls,
  parcels,
  tableWorker,
  labelRef,
  trackingEditor,
  parcelForm,
}) {
  return {
    selectRecipient: {
      action: (item) => {
        userls.value.open().then(async (user) => {
          await parcels.updateParcelRecipient(
            item.track_code,
            user,
            tableWorker
          );
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
