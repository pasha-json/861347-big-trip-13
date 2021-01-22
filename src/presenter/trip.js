import RouteView from "../view/route/route";
import CostView from "../view/cost/cost";
import MenuView from "../view/menu/menu";
// import FiltersView from "../view/filters/filters";
import SortView from "../view/sort/sort";
import FormListView from "../view/form-list/form-list";
import {remove, renderElement, RenderPosition} from "../utils/render";
import {isEscKeyPressed, sortByDate, sortByPrice, sortByTime, generateTotalCost, generateRouteInfo} from "../utils/common";
import Point from "./point.js";
import {SortType, generateMenu, UserAction, UpdateType} from "../consts/consts";
import EmptyView from "../view/empty/empty";


export default class Trip {
  constructor(pointsModel, optionsModel, filterModel) {
    this._menu = generateMenu();
    this._pointsModel = pointsModel;
    this._optionsModel = optionsModel;
    this._filterModel = filterModel;
    this._cost = generateTotalCost(this._pointsModel.getPoints());
    this._route = generateRouteInfo(this._pointsModel.getPoints());

    this._routeComponent = new RouteView(this._route);
    this._costComponent = new CostView(this._cost);
    this._menuComponent = new MenuView(this._menu);
    // this._filtersComponent = new FiltersView(this._filters, `FUTURE`);

    this._pointsModel = pointsModel;
    this._optionsModel = optionsModel;

    this._isEscKeyPressed = isEscKeyPressed;

    this._pointPresenter = {};

    this._currentSortType = SortType.DAY;

    this._siteMainElement = document.querySelector(`.page-body`);
    this._siteRouteElement = this._siteMainElement.querySelector(`.trip-main`);
    this._siteControlsElement = this._siteMainElement.querySelector(`.trip-main__trip-controls h2:first-child`);
    this._siteFiltersElement = this._siteMainElement.querySelector(`.trip-main__trip-controls h2:nth-child(2)`);
    this._siteSortElement = this._siteMainElement.querySelector(`.trip-events`);

    this._formList = new FormListView();
    this._sortComponent = null;
    this._emptyComponent = null;
    this._filterPresenter = null;

    // this._handlePointChange = this._handlePointChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);

  }

  _init() {
    this._renderRoute();
  }

  _getPoints() {
    let points = [];
    switch (this._currentSortType) {
      case SortType.DAY:
        points = this._pointsModel.getPoints().slice().sort(sortByDate);
        break;
      case SortType.TIME:
        points = this._pointsModel.getPoints().slice().sort(sortByTime);
        break;
      case SortType.PRICE:
        points = this._pointsModel.getPoints().slice().sort(sortByPrice);
        break;
      default:
        return this._pointsModel.getPoints();
    }
    return points;
  }

  _getOptions() {
    return this._optionsModel.getOptions();
  }

  _render(where, what, position) {
    renderElement(where, what, position);
  }

  _renderRoute() {
    if (this._getPoints().length === 0) {
      this._renderEmpty();
      return;
    }
    this._render(this._siteRouteElement, this._routeComponent.getElement(), RenderPosition.AFTERBEGIN);
    this._siteCostElement = this._siteRouteElement.querySelector(`.trip-main__trip-info`);
    this._renderCost();
  }
  _renderCost() {
    this._render(this._siteCostElement, this._costComponent.getElement(), RenderPosition.BEFOREEND);
    this._renderMenu();
  }
  _renderMenu() {
    this._render(this._siteControlsElement, this._menuComponent.getElement(), RenderPosition.AFTEREND);
    // this._renderFilters();
    this._renderSort();
  }
  _renderFilters() {
    this._filterPresenter = new Filter(this._siteFiltersElement, this._filterModel, this._pointsModel);
    this._filterPresenter.init();
    // this._render(this._siteFiltersElement, this._filtersComponent.getElement(), RenderPosition.AFTEREND);
    this._renderSort();
  }
  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortView(this._currentSortType);
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
  _renderEmpty() {
    this._emptyComponent = new EmptyView();
    this._render(this._formList, this._emptyComponent, RenderPosition.BEFOREEND);
  }
  _renderPoint(point) {
    const pointPresenter = new Point(this._formList, this._handleViewAction, this._handleModeChange, this._getPoints(), this._getOptions());
    pointPresenter._init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }
  _renderPointsList() {
    this._getPoints().forEach((point) => {
      this._renderPoint(point);
    });
  }
  _clearRoute() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._sortComponent);
    this._emptyComponent = null;
    remove(this._routeComponent);
    remove(this._costComponent);
    remove(this._menuComponent);
    // remove(this._filtersComponent);
    this._filterPresenter = null;

    // if (resetSortType) {
    //   this._currentSortType = SortType.DAY;
    // }
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter._resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATH:
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearRoute();
        this._renderRoute();
        break;
      case UpdateType.MAJOR:
        this._clearRoute();
        this._renderRoute();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._getPoints();

    this._clearRoute();
    // this._renderPointsList();
    this._renderRoute();
  }
}
