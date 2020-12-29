import {createSortTemplate} from "./sort.tpl";
import Abstract from "../abstract/abstract";

export default class SortView extends Abstract {
  constructor() {
    super();
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }
  getTemplate() {
    return createSortTemplate();
  }
  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `LABEL`) {
      return;
    }
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }
  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}

