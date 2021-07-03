import { IWebInterface } from "@/@types/IWebInterface";
import { useAmazonHelper } from "./web/use-amazon-helper";
import { useJcHelper } from "./web/use-jc-helper";

const websites: IWebInterface[] = [useJcHelper(), useAmazonHelper()];
export default websites;
