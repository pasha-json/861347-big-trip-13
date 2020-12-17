import {createAddFormTemplate} from "./form-add.tpl.js";
import Abstract from "../abstract/abstract.js";

export default class FormAddView extends Abstract {
  constructor(data) {
    super();
    this._data = data;
  }
  getTemplate() {
    return createAddFormTemplate(this._data);
  }
}
