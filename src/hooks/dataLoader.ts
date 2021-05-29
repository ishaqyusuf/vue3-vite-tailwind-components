import { reactive, ref, toRefs } from "vue";
import { $clientApi } from "@/core/services/client";
import { $dev } from "@/core/utils/functions";
import siteDataApi from "@/hooks/site-data-api";

const couriers = ref<string[]>([]);
const locations = ref<string[]>([]);
const trackNotes = ref<string[]>([]);
const pkgData = ref<any>({});

const loader = reactive({
  courier: false,
  locations: false,
  trackNote: false,
  pkgData: false,
});
const data = reactive({
  courierLoaded: false,
  locationLoaded: false,
  locations: [],
  trackNoteLoaded: false,
  trackNotes: [],
  pkgDataLoaded: false,
  pkgData: {},
});
const getSomething = async (what) => {
  return new Promise<never[]>((resolve, reject) => {
    $clientApi
      .get(what)
      .then((response) => {
        const { items } = response.data;
        resolve(items as never[]);
      })
      .catch((e) => {
        $dev.error(e);
        resolve([]);
      });
  });
};
const initCouriers = async () => {
  if (!loader.courier) {
    getSomething("/couriers").then((items) => {
      couriers.value = items;
      loader.courier = true;
    });
  }
};
const initPkgData = async (loaded: any = null) => {
  if (!loader.pkgData) {
    const data = await siteDataApi.get("parcel_data");
    const { content } = data;
    if (content) {
      pkgData.value = content;
      loader.pkgData = true;
    }
  }
  loaded && loaded(pkgData.value);
};
const initTrackNotes = async () => {
  if (!loader.trackNote) {
    getSomething("/track_notes").then((items) => {
      trackNotes.value = items;
      loader.trackNote = true;
    });
  }
};
const initLocations = async () => {
  if (!loader.locations) {
    getSomething("/locations").then((items) => {
      locations.value = items;
      loader.locations = true;
    });
  }
};
const updateCouriers = (value) => {
  !couriers.value.includes(value) && couriers.value.push(value);
};

export default {
  initLocations,
  initCouriers,
  initTrackNotes,
  updateCouriers,
  initPkgData,
  // ....
  couriers,
  locations,
  pkgData,
  trackNotes,
};
