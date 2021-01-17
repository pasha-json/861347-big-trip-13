import {createFormListTemplate} from "./form-list.tpl";
import Abstract from "../abstract/abstract";

export default class FormListView extends Abstract {
  getTemplate() {
    return createFormListTemplate();
  }
}
