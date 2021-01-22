import {createFiltersTemplate} from "./filters.tpl";
import Abstract from "../abstract/abstract";

export default class FiltersView extends Abstract {
  constructor(data, type) {
    super();
    this._data = data;
    this._type = type;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }
  getTemplate() {
    return createFiltersTemplate(this._data, this._type);
  }
  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }

  _filterTypeChangeHandler(evt) {
    const target = evt.target.closest(`input`);
    if (!target) {
      return;
    }
    this._callback.filterTypeChange(evt.target.value);
  }
}
