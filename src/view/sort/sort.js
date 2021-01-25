import {createSortTemplate} from "./sort.tpl";
import Abstract from "../abstract/abstract";

export default class SortView extends Abstract {
  constructor(sortType) {
    super();
    this._sortType = sortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }
  getTemplate() {
    return createSortTemplate(this._sortType);
  }
  _sortTypeChangeHandler(evt) {
    if (!evt.target.getAttribute(`data-sort-type`)) {
      return;
    }
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }
  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}

