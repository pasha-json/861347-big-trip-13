import {createEditTemplate} from "./form-edit.tpl";
import Smart from "../smart/smart";

export default class FormEditView extends Smart {
  constructor(point, types, destinations, options, points) {
    super();
    this._point = point;
    this._types = types;
    this._destinations = destinations;
    this._options = options;
    this._points = points;

    this._data = FormEditView.parsePointToData(point);

    this._clickHandler = this._clickHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this._pointTypeToggleHandler = this._pointTypeToggleHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);

    this._setInnerHandlers();
  }
  getTemplate() {
    return createEditTemplate(this._data, this._types, this._destinations);
  }

  static parsePointToData(point) {
    return Object.assign(
        {},
        point,
        {}
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);
    return data;
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._clickHandler = this._clickHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
  }
  _setInnerHandlers() {
    this.getElement().querySelector(`.event__type-wrapper`)
      .addEventListener(`click`, this._pointTypeToggleHandler);

    this.getElement().querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._destinationChangeHandler);
  }
  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }
  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._clickHandler);
  }
  _submitHandler(evt) {
    evt.preventDefault();
    this._callback.submit();
  }
  setSubmitHandler(callback) {
    this._callback.submit = callback;
    this.getElement().addEventListener(`submit`, this._submitHandler);
  }
  _pointTypeToggleHandler(evt) {
    const target = evt.target.closest(`label.event__type-label`);
    if (!target) {
      return;
    }
    const type = target.textContent;

    let options = [];

    this._options.forEach((elem) => {
      if (elem.type === `${type.toLowerCase()}`) {
        options = elem;
      }
    });

    this.updateData({type, options});

  }
  _destinationChangeHandler(evt) {

    const city = evt.target.value;
    let description = ``;
    let images = [];

    this._points.forEach((point) => {
      if (point.destination === `${city}`) {
        description = point.description;
        images = point.images;
      }
    });

    this.updateData({destination: city, description, images});
  }

}
