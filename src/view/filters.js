import {createElement} from "../utils.js";

const createFiltersTemplate = (filters) => {

  const filterItems = filters.map((value) => {
    const valueLowerCase = value.toLowerCase();
    return `<div class="trip-filters__filter">
        <input id="filter-${valueLowerCase}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${valueLowerCase}" checked>
        <label class="trip-filters__filter-label" for="filter-${valueLowerCase}">${value}</label>
      </div>`;
  }).join(``);

  return `<form class="trip-filters" action="#" method="get">
    ${filterItems}
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
};

export default class FiltersView {
  constructor(data) {
    this._element = null;
    this._data = data;
  }
  getTemplate() {
    return createFiltersTemplate(this._data);
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
