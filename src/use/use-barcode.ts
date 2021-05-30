import JsBarcode from "jsbarcode";
export function useBarcode($el, value) {
  JsBarcode($el, String(value), {
    // elementTag: "svg",
    displayValue: true,
  });
}
