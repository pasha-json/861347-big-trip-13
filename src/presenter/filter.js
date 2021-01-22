import {UpdateType, Filters} from "../consts/consts";
import {filter} from "../utils/filter";
import FiltersView from "../view/filters/filters";
import {renderElement, replace, remove, RenderPosition} from "../utils/render";

export default class Filter {
  constructor(filterHeaderElement, filterModel, pointsModel) {
    this._filterHeaderElement = filterHeaderElement;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;

    this._currentFilterType = this._filterModel.getFilter();
    this._filters = this._getFilters();

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._filterModel.addObserver(this._handleModelEvent);
    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    const prevFilterComponent = this._filterComponent;
    this._filterComponent = new FiltersView(this._filters, this._currentFilterType);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      renderElement(this._filterHeaderElement, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }
    replace(this._filterHeaderElement, this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _getFilters() {
    const points = this._pointsModel.getPoints();

    return Object.keys(filter).reduce((acc, key) => {
      return Object.assign({}, acc, {[key]: filter[key](points)});
    }, {});
  }

  _handleModelEvent() {
    this._currentFilterType = this._filterModel.getFilter();
    this._filters = this._getFilters();

    if (this._currentFilterType !== Filters.EVERYTHING
      && this._filters[this._currentFilterType].length === 0) {
      this._filterModel.setFilter(UpdateType.MAJOR, Filters.EVERYTHING);

      return;
    }

    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilterType === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }
}
