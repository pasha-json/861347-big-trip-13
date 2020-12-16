import {createElement} from "../../utils.js";
import {createAddFormTemplate} from "./form-add.tpl.js";

export default class FormAddView {
  constructor(data) {
    this._element = null;
    this._data = data;
  }
  getTemplate() {
    return createAddFormTemplate(this._data);
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
