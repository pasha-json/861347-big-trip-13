import RouteView from "../view/route/route";
import CostView from "../view/cost/cost";
import MenuView from "../view/menu/menu";
import FiltersView from "../view/filters/filters";
import SortView from "../view/sort/sort";
import FormListView from "../view/form-list/form-list";
import {renderElement, RenderPosition} from "../utils/render";
import {isEscKeyPressed, updateItem, sortByDate, sortByPrice, sortByTime} from "../utils/common";
import Point from "./point.js";
import {SortType} from "../consts/consts";

export default class Trip {
  constructor(points, cost, menu, filters, route, sort, options) {

    this._points = points.slice();
    this._sourcedPoints = points.slice();
    this._cost = cost;
    this._menu = menu;
    this._filters = filters;
    this._route = route;

    this._typeList = new Set();
    this._points.forEach((elem) => {
      this._typeList.add(elem.type);
    });

    this._destinations = new Set();
    this._points.forEach((elem) => {
      this._destinations.add(elem.destination);
    });

    this._options = options;

    this._isEscKeyPressed = isEscKeyPressed;

    this._pointPresenter = {};

    this._currentSortType = SortType.DAY;

    this._siteMainElement = document.querySelector(`.page-body`);
    this._siteRouteElement = this._siteMainElement.querySelector(`.trip-main`);
    this._siteControlsElement = this._siteMainElement.querySelector(`.trip-main__trip-controls h2:first-child`);
    this._siteFiltersElement = this._siteMainElement.querySelector(`.trip-main__trip-controls h2:nth-child(2)`);
    this._siteSortElement = this._siteMainElement.querySelector(`.trip-events`);

    this._formList = new FormListView();
    this._sortComponent = new SortView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

  }

  _init() {
    this._renderRoute();
  }

  _render(where, what, position) {
    renderElement(where, what, position);
  }

  _renderRoute() {
    this._render(this._siteRouteElement, new RouteView(this._route).getElement(), RenderPosition.AFTERBEGIN);
    this._siteCostElement = this._siteRouteElement.querySelector(`.trip-main__trip-info`);
    this._renderCost();
  }
  _renderCost() {
    this._render(this._siteCostElement, new CostView(this._cost).getElement(), RenderPosition.BEFOREEND);
    this._renderMenu();
  }
  _renderMenu() {
    this._render(this._siteControlsElement, new MenuView(this._menu).getElement(), RenderPosition.AFTEREND);
    this._renderFilters();
  }
  _renderFilters() {
    this._render(this._siteFiltersElement, new FiltersView(this._filters).getElement(), RenderPosition.AFTEREND);
    this._renderSort();
  }
  _renderSort() {
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    this._render(this._siteSortElement, this._sortComponent.getElement(), RenderPosition.BEFOREEND);
    this._renderFormList();
  }
  _renderFormList() {
    this._render(this._siteSortElement, this._formList.getElement(), RenderPosition.BEFOREEND);
    this._renderFormAdd();
  }
  _renderFormAdd() {
    this._renderPointsList();
  }
  _renderPoint(point) {
    const pointPresenter = new Point(this._formList, this._handlePointChange, this._handleModeChange, this._typeList, this._destinations, this._options);
    pointPresenter._init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }
  _renderPointsList() {
    this._points.forEach((point) => {
      this._renderPoint(point);
    });
  }
  _clearPointList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }
  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this._points.sort(sortByDate);
        break;
      case SortType.TIME:
        this._points.sort(sortByTime);
        break;
      case SortType.PRICE:
        this._points.sort(sortByPrice);
        break;
      default:
        this._points = this._sourcedPoints.slice();
    }
    this._currentSortType = sortType;
  }
  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter._resetView());
  }

  _handlePointChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._pointPresenter[updatedPoint.id]._init(updatedPoint);
  }
  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortPoints(sortType);

    this._clearPointList();
    this._renderPointsList();
  }
}
