import {createRoutePinTemplate} from "./route-pin.tpl";
import Abstract from "../abstract/abstract";

export default class RoutePin extends Abstract {
  constructor(data, options, isDataLoaded) {
    super();
    this._data = data;
    this._options = options;

    this._editControl = this.getElement().querySelector(`.event__rollup-btn`);
    if (!isDataLoaded) {
      this._editControl.disabled = true;
    }

    this._clickHandler = this._clickHandler.bind(this);
    this._favouriteClickHandler = this._favouriteClickHandler.bind(this);
  }
  getTemplate() {
    return createRoutePinTemplate(this._data, this._options);
  }

  enableEditControl() {
    this._editControl.disabled = false;
  }
  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }
  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._clickHandler);
  }
  _favouriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favouriteClick();
  }
  setFavouriteClickHandler(callback) {
    this._callback.favouriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favouriteClickHandler);
  }
}
