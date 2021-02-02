import {createLoadingTemplate} from "./loading.tpl";
import Abstract from "../abstract/abstract";

export default class Loading extends Abstract {

  getTemplate() {
    return createLoadingTemplate();
  }
}
