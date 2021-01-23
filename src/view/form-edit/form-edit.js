import {createEditTemplate} from "./form-edit.tpl";
import Smart from "../smart/smart";
import flatpickr from "flatpickr";

import "../../../node_modules/flatpickr/dist/flatpickr.min.css";

export default class FormEditView extends Smart {
  constructor(point, options, points) {
    super();
    this._point = point;
    this._options = options;
    this._points = points;

    this._destinations = new Set();
    this._points.forEach((elem) => {
      this._destinations.add(elem.destination);
    });

    this._types = new Set();
    this._points.forEach((elem) => {
      this._types.add(elem.type);
    });

    this._data = FormEditView.parsePointToData(point);
    this._datepicker = null;

    this._clickHandler = this._clickHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this._pointTypeToggleHandler = this._pointTypeToggleHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._dateStartChangeHandler = this._dateStartChangeHandler.bind(this);
    this._dateEndChangeHandler = this._dateEndChangeHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }
  removeElement() {
    super.removeElement();

    if (this._datepicker) {
      this._datepicker = null;
    }
  }
  getTemplate() {
    return createEditTemplate(this._data, this._types, this._destinations, this._options);
  }

  reset(point) {
    this.updateData(
        FormEditView.parsePointToData(point)
    );
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
    this._setDatepicker();
    this._setInnerHandlers();
    this.setClickHandler(this._callback.click);
    this.setSubmitHandler(this._callback.submit);
    this.setDeleteClickHandler(this._callback.deleteClick);
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
    this._callback.submit(FormEditView.parseDataToPoint(this._data));
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

    this._points.forEach((elem) => {
      if (elem.type === `${type}`) {
        options = elem.options;
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

  _dateStartChangeHandler(evt) {
    const date = Object.assign({}, this._data.date);
    date.start = new Date(evt).toISOString();
    this.updateData({date}, true);
  }

  _dateEndChangeHandler(evt) {
    const date = Object.assign({}, this._data.date);
    date.end = new Date(evt).toISOString();
    this.updateData({date}, true);
  }

  _setDatepicker() {
    if (this._datepicker) {
      this._deleteDatePicker();
    }

    const [startDate, endDate] = Array.from(
        this.getElement().querySelectorAll(`.event__input--time`)
    );

    this._datepicker = {
      start: flatpickr(startDate, {
        enableTime: true,
        dateFormat: `d/m/y H:i`,
        defaultsDate: this._data.date.start,
        onChange: this._dateStartChangeHandler,
      }),
      end: flatpickr(endDate, {
        enableTime: true,
        dateFormat: `d/m/y H:i`,
        defaultsDate: this._data.date.end,
        onChange: this._dateEndChangeHandler,
      }),
    };
  }
  _deleteDatePicker() {
    this._datepicker.start.destroy();
    this._datepicker.end.destroy();
    this._datepicker = null;
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(FormEditView.parseDataToPoint(this._data));
  }
  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
  }

}
