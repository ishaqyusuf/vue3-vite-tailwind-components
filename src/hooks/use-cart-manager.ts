import { ICartItem } from "@/@types/ICartItem";
import useCore from "./use-core";

function addToCart(title, price, img, url, qty = 1, fee = 0) {
  var cart: ICartItem = {
    title,
    price,
    img,
    qty,
    fee,
    url,
  };
}
export default {
  addToCart,
};
