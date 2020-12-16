import {createElement} from "../../utils.js";
import {createCostTemplate} from "./cost.tpl.js";

export default class CostView {
  constructor(data) {
    this._element = null;
    this._data = data;
  }
  getTemplate() {
    return createCostTemplate(this._data);
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
