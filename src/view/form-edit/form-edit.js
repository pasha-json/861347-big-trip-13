import {createEditTemplate} from "./form-edit.tpl.js";
import Abstract from "../abstract/abstract.js";

export default class FormEditView extends Abstract {
  constructor(data) {
    super();
    this._data = data;
  }
  getTemplate() {
    return createEditTemplate(this._data);
  }
}
