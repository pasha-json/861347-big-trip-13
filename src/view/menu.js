import {createElement} from "../utils.js";

const createMenuTemplate = ({items}) => {

  const menuItems = items.map(({title, isActive}) => {
    return `<a class="trip-tabs__btn  ${isActive ? `trip-tabs__btn--active` : ``}" href="#">${title}</a>`;
  }).join(``);

  return `<nav class="trip-controls__trip-tabs  trip-tabs">
  ${menuItems}
  </nav>`;
};

export default class MenuView {
  constructor(data) {
    this._element = null;
    this._data = data;
  }
  getTemplate() {
    return createMenuTemplate(this._data);
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

