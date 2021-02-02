import {createEmptyTemplate} from "./empty.tpl";
import Abstract from "../abstract/abstract";

export default class Empty extends Abstract {
  getTemplate() {
    return createEmptyTemplate();
  }
}
