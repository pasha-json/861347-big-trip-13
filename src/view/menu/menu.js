import {createMenuTemplate} from "./menu.tpl";
import Abstract from "../abstract/abstract";

export default class MenuView extends Abstract {
  constructor(data) {
    super();
    this._data = data;
  }
  getTemplate() {
    return createMenuTemplate(this._data);
  }
}

