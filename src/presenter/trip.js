import RouteView from "../view/route/route";
import CostView from "../view/cost/cost";
import MenuView from "../view/menu/menu";
import FiltersView from "../view/filters/filters";
import SortView from "../view/sort/sort";
import FormListView from "../view/form-list/form-list";
import FormAddView from "../view/form-add/form-add";
import {renderElement, RenderPosition} from "../utils/render";
import {isEscKeyPressed, updateItem} from "../utils/common";
import Point from "./point.js";


export default class Trip {
  constructor(points, cost, menu, filters, route, sort) {

    this._points = points;
    this._cost = cost;
    this._menu = menu;
    this._filters = filters;
    this._route = route;
    this._sort = sort;

    this._isEscKeyPressed = isEscKeyPressed;

    this._pointPresenter = {};

    this._siteMainElement = document.querySelector(`.page-body`);
    this._siteRouteElement = this._siteMainElement.querySelector(`.trip-main`);
    this._siteControlsElement = this._siteMainElement.querySelector(`.trip-main__trip-controls h2:first-child`);
    this._siteFiltersElement = this._siteMainElement.querySelector(`.trip-main__trip-controls h2:nth-child(2)`);
    this._siteSortElement = this._siteMainElement.querySelector(`.trip-events`);

    this._formList = new FormListView();

    this._handlePointChange = this._handlePointChange.bind(this);

  }

  _init() {
    this._renderRoute();
  }

  _handlePointChange(updatedPoint) {
    this._routePoints = updateItem(this._routePoints, updatedPoint);
    this._pointPresenter[updatedPoint.id]._init(updatedPoint);
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
    this._render(this._siteSortElement, new SortView(this._sort).getElement(), RenderPosition.BEFOREEND);
    this._renderFormList();
  }
  _renderFormList() {
    this._render(this._siteSortElement, this._formList.getElement(), RenderPosition.BEFOREEND);
    this._renderFormAdd();
  }
  _renderFormAdd() {
    this._render(this._formList.getElement(), new FormAddView(this._points[0]).getElement(), RenderPosition.BEFOREEND);
    this._renderPointsList();
  }
  _renderPoint(point) {
    const pointPresenter = new Point(this._formList);
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
}