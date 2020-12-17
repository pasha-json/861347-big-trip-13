import {createSortTemplate} from "./sort.tpl.js";
import Abstract from "../abstract/abstract.js";

export default class SortView extends Abstract {
  constructor(data) {
    super();
    this._data = data;
  }
  getTemplate() {
    return createSortTemplate(this._data);
  }
}
