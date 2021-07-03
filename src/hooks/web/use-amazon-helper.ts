import { IWebInterface } from "@/@types/IWebInterface";
import useCartManager from "../use-cart-manager";
import { querySelectorAllClick, trimmedText, waitForEl } from "../use-web-util";

export function useAmazonHelper(): IWebInterface {
  const initialize = () => {
    waitForEl(webData.cartBtn, () => {
      querySelectorAllClick(webData.cartBtn, (e) => addToCart(e));
    });
  };

  const addToCart = (el) => {
    const selector = webData.selectors;
    useCartManager.addToCart(
      trimmedText(selector?.title),
      trimmedText(selector?.price),
      document.querySelector(selector?.img)?.attr("src"),
      window.location.toString()
    );
  };
  const webData: IWebInterface = {
    name: "Amazon",
    url: "https://www.amazon",
    cart: "/gp/cart/view.html",
    cartBtn: "input#add-to-cart-button",
    selectors: {
      store: "a#bylineInfo",
      price: "span#price_inside_buybox",
      title: "span#productTitle",
      qty: "select#quantity option:selected",
      img: "div.imgTagWrapper img",
      fee: "div#shippingMessageInsideBuyBox_feature_div span",
    },
  };

  return {
    ...webData,
    initialize,
  };
}
