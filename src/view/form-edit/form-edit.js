import {createElement} from "../../utils.js";
import {createEditTemplate} from "./form-edit.tpl.js";

export default class FormEditView {
  constructor(data) {
    this._element = null;
    this._data = data;
  }
  getTemplate() {
    return createEditTemplate(this._data);
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
