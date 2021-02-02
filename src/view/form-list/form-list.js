import {createFormListTemplate} from "./form-list.tpl";
import Abstract from "../abstract/abstract";

export default class FormList extends Abstract {
  getTemplate() {
    return createFormListTemplate();
  }
}
