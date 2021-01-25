import Observer from "../utils/observer";
import {Filters} from "../consts/consts";

export default class FilterModel extends Observer {
  constructor() {
    super();
    this._activeFilter = Filters.EVERYTHING;
  }
  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }
  getFilter() {
    return this._activeFilter;
  }
}
