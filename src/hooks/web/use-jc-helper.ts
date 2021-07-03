import { IWebInterface } from "@/@types/IWebInterface";

export function useJcHelper(): IWebInterface {
  const initialize = () => {};

  const webData: IWebInterface = {
    name: "JC Penny",
    url: "https://www.jcpenny.com",
    cart: "https://www.jcpenny.com/cart",
    cartBtn: "input#add-to-cart-button",
  };

  return {
    ...webData,
    initialize,
  };
}
