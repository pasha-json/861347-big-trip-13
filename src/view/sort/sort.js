import {createSortTemplate} from "./sort.tpl";
import Abstract from "../abstract/abstract";

export default class SortView extends Abstract {
  constructor(data) {
    super();
    this._data = data;
  }
  getTemplate() {
    return createSortTemplate(this._data);
  }
}
