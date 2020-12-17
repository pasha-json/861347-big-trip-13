import {createFormListTemplate} from "./form-list.tpl.js";
import Abstract from "../abstract/abstract.js";

export default class FormListView extends Abstract {
  constructor() {
    super();
  }
  getTemplate() {
    return createFormListTemplate();
  }
}
