import {createElement} from "../../utils.js";
import {createFiltersTemplate} from "./filters.tpl.js";

export default class FiltersView {
  constructor(data) {
    this._element = null;
    this._data = data;
  }
  getTemplate() {
    return createFiltersTemplate(this._data);
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
