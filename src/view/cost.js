import {createElement} from "../utils.js";

const createCostTemplate = (cost) => {
  return `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
</p>`;
};

export default class CostView {
  constructor(data) {
    this._element = null;
    this._data = data;
  }
  getTemplate() {
    return createCostTemplate(this._data);
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
