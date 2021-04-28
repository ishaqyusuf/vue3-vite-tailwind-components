import FingerprintJs from "@fingerprintjs/fingerprintjs";
import { ref } from "vue";
import storage from "@/utils/localStorage";
const load = () =>
  new Promise(async (resolve) => {
    var device = storage.get("device");
    if (!device) {
      const fpl = await FingerprintJs.load();
      const { visitorId, components } = await fpl.get();

      device = { visitor_id: visitorId };
    }
    storage.set("device", device);
    resolve(device);
  });

export default {
  get: load,
};
