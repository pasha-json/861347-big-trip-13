import RouteView from "../view/route/route";
import CostView from "../view/cost/cost";
import MenuView from "../view/menu/menu";
import FiltersView from "../view/filters/filters";
import SortView from "../view/sort/sort";
import FormListView from "../view/form-list/form-list";
import FormAddView from "../view/form-add/form-add";
import {renderElement, RenderPosition} from "../utils/render";
import {isEscKeyPressed} from "../utils/common";
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

    this._siteMainElement = document.querySelector(`.page-body`);
    this._siteRouteElement = this._siteMainElement.querySelector(`.trip-main`);
    this._siteControlsElement = this._siteMainElement.querySelector(`.trip-main__trip-controls h2:first-child`);
    this._siteFiltersElement = this._siteMainElement.querySelector(`.trip-main__trip-controls h2:nth-child(2)`);
    this._siteSortElement = this._siteMainElement.querySelector(`.trip-events`);

  }
  _render(where, what, position) {
    renderElement(where, what, position);
  }
  _init() {
    this._renderRoute();
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
    this._render(this._siteSortElement, new FormListView().getElement(), RenderPosition.BEFOREEND);
    this._renderFormAdd();
  }
  _renderFormAdd() {
    this._siteListElement = this._siteMainElement.querySelector(`.trip-events__list`);
    this._render(this._siteListElement, new FormAddView(this._points[0]).getElement(), RenderPosition.BEFOREEND);
    const pointPresenter = new Point(this._points, this._siteListElement);
    pointPresenter._init();
  }
}
