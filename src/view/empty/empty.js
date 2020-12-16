import {createElement} from "../../utils.js";
import {createEmptyTemplate} from "./empty.tpl.js";

export default class EmptyView {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createEmptyTemplate();
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
