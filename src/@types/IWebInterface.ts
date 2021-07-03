import { IWebSelector } from "./IWebSelector";

export interface IWebInterface {
  name?;
  url?;
  cart?;
  cartBtn?;
  initialize?;
  selectors?: IWebSelector;
}
