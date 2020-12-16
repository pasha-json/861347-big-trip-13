import {createElement} from "../../utils.js";
import {createMenuTemplate} from "./menu.tpl.js";

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

