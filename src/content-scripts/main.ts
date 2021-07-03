import { createApp } from "vue";
import Popup from "./Popup.vue";
import "../assets/styles.css";
import websites from "@/hooks/use-websites";
import useCore from "@/hooks/use-core";

const MOUNT_EL_ID = "buydirect_popper";

chrome.runtime.onMessage.addListener((message) => {
  if (!useCore.initialize()) return;
  let mountEl = document.getElementById(MOUNT_EL_ID);
  if (mountEl) {
    mountEl.innerHTML = "";
  }
  mountEl = document.createElement("div");
  mountEl.setAttribute("id", MOUNT_EL_ID);
  document.body.prepend(mountEl);
  const vm = createApp(Popup).mount(mountEl);
  if (message.toggleVisible) {
    (vm as any).visible = !(vm as any).visible;
  }
});
