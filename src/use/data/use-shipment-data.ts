export default {
  statusList: ["Active", "Inactive", "Completed", "Cancel", "Draft"],
  pkgEntryModes: [
    {
      id: 0,
      automatic: true,
      title: "Automatic Entry",
      subtitle:
        "Automate parcel entry by setting specific attributes to automatically grab scanned and future parcels from database.",
    },
    {
      id: 1,
      automatic: false,
      title: "Manual Entry",
      subtitle:
        "Manually add parcels to the shipment through the parcels dashboard or the active parcels tab from shipment dashboard",
    },
  ],
  dateType: [
    {
      id: 0,
      title: "Single Date",
    },
    {
      id: 1,
      title: "Date Range",
    },
    {
      id: 2,
      title: "Multiple Dates",
    },
  ],
};
