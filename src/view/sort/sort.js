import {createElement} from "../../utils.js";
import {createSortTemplate} from "./sort.tpl.js";

export default class SortView {
  constructor(data) {
    this._element = null;
    this._data = data;
  }
  getTemplate() {
    return createSortTemplate(this._data);
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
