import {createRoutePinTemplate} from "./route-pin.tpl.js";
import Abstract from "../abstract/abstract.js";

export default class RoutePinView extends Abstract {
  constructor(data) {
    super();
    this._data = data;
    this._clickHandler = this._clickHandler.bind(this);
  }
  getTemplate() {
    return createRoutePinTemplate(this._data);
  }
  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }
  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._clickHandler);
  }
}
