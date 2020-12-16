import {createElement} from "../../utils.js";
import {createRouteTemplate} from "./route.tpl.js";

export default class RouteView {
  constructor(data) {
    this._element = null;
    this._data = data;
  }
  getTemplate() {
    return createRouteTemplate(this._data);
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
