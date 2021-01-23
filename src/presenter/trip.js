import RouteView from "../view/route/route";
import CostView from "../view/cost/cost";
import MenuView from "../view/menu/menu";
import SortView from "../view/sort/sort";
// import FormAddView from "../view/form-add/form-add";
import FormListView from "../view/form-list/form-list";
import {remove, renderElement, RenderPosition} from "../utils/render";
import {filter} from "../utils/filter";
import {isEscKeyPressed, sortByDate, sortByPrice, sortByTime, generateTotalCost, generateRouteInfo} from "../utils/common";
import Point from "./point.js";
import PointNew from "./point-new.js";
import {SortType, generateMenu, UserAction, UpdateType, Filters} from "../consts/consts";
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
    // this._formAdd = new FormAddView();

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

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._pointNewPresenter = new PointNew(this._formList, this._handleViewAction, this._getOptions(), this._getPoints());
  }

  _init() {
    this._renderRoute();
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filteredPoints = filter[filterType](points);

    let pointsAfterFiltration = [];
    switch (this._currentSortType) {
      case SortType.TIME:
        pointsAfterFiltration = filteredPoints.sort(sortByTime);
        break;
      case SortType.PRICE:
        pointsAfterFiltration = filteredPoints.sort(sortByPrice);
        break;
      default:
        pointsAfterFiltration = filteredPoints.sort(sortByDate);
    }
    return pointsAfterFiltration;
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
    this._renderPointsList();
  }
  _createPoint() {
    this._currentSortType = SortType.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, Filters.EVERYTHING);
    this._pointNewPresenter.init();
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
    this._filterPresenter = null;
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
        this._currentSortType = SortType.DAY;
        this._renderRoute();
        break;
      case UpdateType.MAJOR:
        this._clearRoute();
        this._currentSortType = SortType.DAY;
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
    this._renderRoute();
  }
}
