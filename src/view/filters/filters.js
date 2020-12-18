import {createFiltersTemplate} from "./filters.tpl";
import Abstract from "../abstract/abstract";

export default class FiltersView extends Abstract {
  constructor(data) {
    super();
    this._data = data;
  }
  getTemplate() {
    return createFiltersTemplate(this._data);
  }
}
