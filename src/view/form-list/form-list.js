import {createElement} from "../../utils.js";
import {createFormListTemplate} from "./form-list.tpl.js";

export default class FormListView {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createFormListTemplate();
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
