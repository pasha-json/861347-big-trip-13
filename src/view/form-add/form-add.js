import {createAddFormTemplate} from "./form-add.tpl";
import Smart from "../smart/smart";
import flatpickr from "flatpickr";
import "../../../node_modules/flatpickr/dist/flatpickr.min.css";

const DEFAULT_POINT_TYPE = `Flight`;

const EMPTY_POINT = {
  pointType: DEFAULT_POINT_TYPE,
  destination: ``,
  offers: [],
  price: ``,
  date: {
    start: null,
    end: null,
  },
  isFavorite: false
};

export default class FormAddView extends Smart {
  constructor(options, points) {
    super();
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

    this._submitHandler = this._submitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);

    this._setDatepicker();
    console.log(this._types, this._destinations, this._options);
  }
  getTemplate() {
    return createAddFormTemplate(EMPTY_POINT, this._types, this._destinations, this._options);
  }
  _submitHandler(evt) {
    evt.preventDefault();
    this._callback.submit();
  }
  setSubmitHandler(callback) {
    this._callback.submit = callback;
    this.getElement().addEventListener(`submit`, this._submitHandler);
  }
  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick();
  }
  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
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
}
