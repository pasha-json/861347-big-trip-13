import {createMenuTemplate} from "./menu.tpl.js";
import Abstract from "../abstract/abstract.js";

export default class MenuView extends Abstract {
  constructor(data) {
    super();
    this._data = data;
  }
  getTemplate() {
    return createMenuTemplate(this._data);
  }
}

