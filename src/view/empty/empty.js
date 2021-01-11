import {createEmptyTemplate} from "./empty.tpl";
import Abstract from "../abstract/abstract";

export default class EmptyView extends Abstract {
  getTemplate() {
    return createEmptyTemplate();
  }
}
