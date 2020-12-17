import {createFiltersTemplate} from "./filters.tpl.js";
import Abstract from "../abstract/abstract.js";

export default class FiltersView extends Abstract {
  constructor(data) {
    super();
    this._data = data;
  }
  getTemplate() {
    return createFiltersTemplate(this._data);
  }
}
