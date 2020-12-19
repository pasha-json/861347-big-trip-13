import RouteView from "../view/route/route";
import CostView from "../view/cost/cost";
import MenuView from "../view/menu/menu";
import FiltersView from "../view/filters/filters";
import SortView from "../view/sort/sort";
import FormListView from "../view/form-list/form-list";
import FormAddView from "../view/form-add/form-add";
import FormEditView from "../view/form-edit/form-edit";
import RoutePinView from "../view/route-pin/route-pin";
import EmptyView from "../view/empty/empty";
import {generatePoint} from "../mock/route-point";
import {generateTotalCost} from "../mock/cost";
import {Filters, generateMenu, POINT_COUNT} from "../consts/consts";
import {generateRouteInfo} from "../mock/route";
import {generateSorting} from "../mock/sort";
import {renderElement, RenderPosition} from "../utils/render";
import {isEscKeyPressed} from "../utils/common";


export default class Trip {
  constructor() {

    this._costView = new CostView();
    this._menuView = new MenuView();
    this._filtersView = new FiltersView();
    this._sortView = new SortView();
    this._formListView = new FormListView();
    this._formAddView = new FormAddView();
    this._formEditView = new FormEditView();
    this._routePinView = new RoutePinView();
    this._emptyView = new EmptyView();

    this._pointCount = POINT_COUNT;
    this._points = new Array(POINT_COUNT).fill().map(this._generatePoint);

    this._isEscKeyPressed = isEscKeyPressed;

    this._siteMainElement = document.querySelector(`.page-body`);
    this._siteRouteElement = this._siteMainElement.querySelector(`.trip-main`);
    this._siteControlsElement = this._siteMainElement.querySelector(`.trip-main__trip-controls h2:first-child`);
    this._siteFiltersElement = this._siteMainElement.querySelector(`.trip-main__trip-controls h2:nth-child(2)`);
    this._siteSortElement = this._siteMainElement.querySelector(`.trip-events`);

  }
  _getCost() {
    return generateTotalCost(this._points);
  }
  _getRoute(points) {
    return generateRouteInfo(points);
  }
  _getSort() {
    return generateSorting();
  }
  _getMenu() {
    return generateMenu();
  }
  _getFilters() {
    return Object.values(Filters);
  }
  _generatePoint() {
    return generatePoint();
  }
  _render(where, what, position) {
    renderElement(where, what, position);
  }
  _generateTotalCost(points) {
    return generateTotalCost(points);
  }
  _init() {
    this._renderRoute();
  }
  _renderRoute() {
    this._render(this._siteRouteElement, new RouteView(this._getRoute(this._points)).getElement(), RenderPosition.AFTERBEGIN);
    this._siteCostElement = this._siteRouteElement.querySelector(`.trip-main__trip-info`);
    this._renderCost();
  }
  _renderCost() {
    this._render(this._siteCostElement, new CostView(this._getCost()).getElement(), RenderPosition.BEFOREEND);
    this._renderMenu();
  }
  _renderMenu() {
    this._render(this._siteControlsElement, new MenuView(this._getMenu()).getElement(), RenderPosition.AFTEREND);
    this._renderFilters();
  }
  _renderFilters() {
    this._render(this._siteFiltersElement, new FiltersView(this._getFilters()).getElement(), RenderPosition.AFTEREND);
    this._renderSort();
  }
  _renderSort() {
    this._render(this._siteSortElement, new SortView(this._getSort()).getElement(), RenderPosition.BEFOREEND);
    this._renderFormList();
  }
  _renderFormList() {
    this._render(this._siteSortElement, new FormListView().getElement(), RenderPosition.BEFOREEND);
    this._renderFormAdd();
  }
  _renderFormAdd() {
    this._siteListElement = this._siteMainElement.querySelector(`.trip-events__list`);
    this._render(this._siteListElement, new FormAddView(this._points[0]).getElement(), RenderPosition.BEFOREEND);
    this._renderPins();
  }
  _renderRoutePin(data) {
    const routePoint = new RoutePinView(data);
    const editForm = new FormEditView(data);

    const replaceRoutePointToForm = () => {
      this._siteListElement.replaceChild(editForm.getElement(), routePoint.getElement());
    };

    const replaceFormToRoutePoint = () => {
      this._siteListElement.replaceChild(routePoint.getElement(), editForm.getElement());
    };

    const onEscKeyDown = (evt) => {
      if (isEscKeyPressed(evt)) {
        evt.preventDefault();
        replaceFormToRoutePoint();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    routePoint.setClickHandler(() => {
      replaceRoutePointToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    editForm.setSubmitHandler(() => {
      replaceFormToRoutePoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    editForm.setClickHandler(() => {
      replaceFormToRoutePoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    this._render(this._siteListElement, routePoint.getElement(), RenderPosition.BEFOREEND);

  }
  _renderPins() {
    if (this._points.length > 1) {
      for (let i = 1; i < POINT_COUNT; i++) {
        this._renderRoutePin(this._points[i]);
      }
    } else {
      this._renderEmpty();
    }
  }
  _renderFormEdit() {
    // Отрисовка формы редактирования
  }
  _renderEmpty() {
    this._render(this._siteListElement, new EmptyView().getElement(), RenderPosition.BEFOREEND);
  }
}
