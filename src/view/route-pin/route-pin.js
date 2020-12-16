import {createElement} from "../../utils.js";
import {createRoutePinTemplate} from "./route-pin.tpl.js";

export default class RoutePinView {
  constructor(data) {
    this._element = null;
    this._data = data;
  }
  getTemplate() {
    return createRoutePinTemplate(this._data);
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
