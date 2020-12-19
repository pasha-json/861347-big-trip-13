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
import {renderElement, RenderPosition} from "../utils/render";
import {isEscKeyPressed} from "../utils/common";


export default class Trip {
  constructor(points, cost, menu, filters, route, sort, POINT_COUNT) {

    this._points = points;
    this._cost = cost;
    this._menu = menu;
    this._filters = filters;
    this._route = route;
    this._sort = sort;
    this._POINT_COUNT = POINT_COUNT;

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
      for (let i = 1; i < this._POINT_COUNT; i++) {
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
