import {createLoadingTemplate} from "./loading.tpl";
import Abstract from "../abstract/abstract";

export default class LoadingView extends Abstract {

  getTemplate() {
    return createLoadingTemplate();
  }
}
