import {createEditTemplate} from "./form-edit.tpl";
import Smart from "../smart/smart";
import flatpickr from "flatpickr";

import "../../../node_modules/flatpickr/dist/flatpickr.min.css";

const priceKeyDownRegex = /^[0-9]|ArrowLeft|ArrowRight|Delete|Backspace|Tab$/;

export default class FormEditView extends Smart {
  constructor(point, options, points, destinations) {
    super();
    this._point = Object.assign({}, point);
    this._options = options.slice();
    this._points = points.slice();
    this._destinations = destinations.slice();

    this._cities = new Set();
    this._destinations.forEach((elem) => {
      this._cities.add(elem.name);
    });

    this._types = new Set();
    this._points.forEach((elem) => {
      this._types.add(elem.type);
    });

    this._data = this._parsePointToData(point);
    this._datepicker = null;

    this._updatedOptions = [];

    const input = this.getElement().querySelector(`.event__input--destination`);
    input.setAttribute(`required`, `true`);

    this._clickHandler = this._clickHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this._pointTypeToggleHandler = this._pointTypeToggleHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._dateStartChangeHandler = this._dateStartChangeHandler.bind(this);
    this._dateEndChangeHandler = this._dateEndChangeHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._offerChangeHandler = this._offerChangeHandler.bind(this);

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
        this._parsePointToData(point)
    );
  }

  _parsePointToData(point) {
    const type = point.type.toLowerCase();
    const options = this._options.filter((elem) => elem.type === type).slice();

    let offers = null;
    options.forEach((elem) => {
      if (elem.type === `${type.toLowerCase()}`) {
        offers = elem;
      }
    });
    return Object.assign(
        {},
        point,
        {
          options: offers,
          isDisabled: false,
          isSaving: false,
          isDeleting: false
        }
    );
  }

  _parseDataToPoint(data) {
    data = Object.assign({}, data);

    delete data.options;
    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;
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

    this.getElement().querySelector(`.event__input--price`)
      .addEventListener(`keydown`, this._priceKeyDownHandler);

    this.getElement().querySelector(`.event__input--price`)
      .addEventListener(`input`, this._priceChangeHandler);

    const optionsNode = this.getElement().querySelector(`.event__available-offers`);
    if (optionsNode) {
      optionsNode
        .addEventListener(`click`, this._offerChangeHandler);

    }
  }

  _priceKeyDownHandler(evt) {
    if (!priceKeyDownRegex.test(evt.key)) {
      evt.preventDefault();
    }
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
    this._callback.submit(this._data);
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

    const options = this._options.filter((elem) => elem.type === type.toLowerCase());

    let offers = null;
    options.forEach((elem) => {
      if (elem.type === `${type.toLowerCase()}`) {
        offers = elem;
      }
    });
    this.updateData({type, options: offers});

  }
  _destinationChangeHandler(evt) {

    const city = evt.target.value;

    if (!city || !this._cities.has(city)) {
      evt.target.value = this._data.destination;
      return;
    }
    let description = ``;
    let images = [];

    this._destinations.forEach((elem) => {
      if (elem.name === `${city}`) {
        description = elem.description;
        images = elem.pictures;
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

  _priceChangeHandler(evt) {
    let price = Number.parseInt(evt.target.value, 10);

    if (price !== price) {
      price = 0;
    }

    this.updateData({price}, true);
  }

  _offerChangeHandler(evt) {

    const target = evt.target.closest(`label.event__offer-label`);
    if (!target) {
      return;
    }

    const name = target.querySelector(`span`).textContent;

    const options = this._data.options.offers.slice();
    console.log(options);


    const updatedOptions = options.map((option) => {
      if (option.title === name) {
        option.isIncluded = !option.isIncluded;
      }
      return option;
    });
    console.log(this._data);

    this.updateData({options: {offers: updatedOptions, type: this._data.type.toLowerCase()}}, true);

    console.log(this._data);

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
    this._callback.deleteClick(this._parseDataToPoint(this._data));
  }
  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
  }

}
