import RouteView from "./view/route/route.js";
import CostView from "./view/cost/cost.js";
import MenuView from "./view/menu/menu.js";
import FiltersView from "./view/filters/filters.js";
import SortView from "./view/sort/sort.js";
import FormListView from "./view/form-list/form-list.js";
import FormAddView from "./view/form-add/form-add.js";
import FormEditView from "./view/form-edit/form-edit.js";
import RoutePinView from "./view/route-pin/route-pin.js";
import EmptyView from "./view/empty/empty.js";
import {generatePoint} from "./mock/route-point.js";
import {generateTotalCost} from "./mock/cost.js";
import {Filters, generateMenu, POINT_COUNT} from "./consts/consts.js";
import {generateRouteInfo} from "./mock/route.js";
import {generateSorting} from "./mock/sort.js";
import {renderElement, RenderPosition} from "./utils/render.js";
import {isEscKeyPressed} from "./utils/common.js";

const points = new Array(POINT_COUNT).fill().map(generatePoint);
const cost = generateTotalCost(points);

const menu = generateMenu();

const filters = Object.values(Filters);
const route = generateRouteInfo(points);
const sort = generateSorting();


const siteMainElement = document.querySelector(`.page-body`);
const siteRouteElement = siteMainElement.querySelector(`.trip-main`);
const siteControlsElement = siteMainElement.querySelector(`.trip-main__trip-controls h2:first-child`);
const siteFiltersElement = siteMainElement.querySelector(`.trip-main__trip-controls h2:nth-child(2)`);
const siteSortElement = siteMainElement.querySelector(`.trip-events`);


renderElement(siteRouteElement, new RouteView(route).getElement(), RenderPosition.AFTERBEGIN);

const siteCostElement = siteRouteElement.querySelector(`.trip-main__trip-info`);

renderElement(siteCostElement, new CostView(cost).getElement(), `beforeend`);
renderElement(siteControlsElement, new MenuView(menu).getElement(), RenderPosition.AFTEREND);
renderElement(siteFiltersElement, new FiltersView(filters).getElement(), RenderPosition.AFTEREND);
renderElement(siteSortElement, new SortView(sort).getElement(), RenderPosition.BEFOREEND);
renderElement(siteSortElement, new FormListView().getElement(), RenderPosition.BEFOREEND);

const siteListElement = siteMainElement.querySelector(`.trip-events__list`);

renderElement(siteListElement, new FormAddView(points[0]).getElement(), RenderPosition.BEFOREEND);

const renderRoutePoints = (data) => {
  const routePoint = new RoutePinView(data);
  const editForm = new FormEditView(data);

  const replaceRoutePointToForm = () => {
    siteListElement.replaceChild(editForm.getElement(), routePoint.getElement());
  };

  const replaceFormToRoutePoint = () => {
    siteListElement.replaceChild(routePoint.getElement(), editForm.getElement());
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

  renderElement(siteListElement, routePoint.getElement(), RenderPosition.BEFOREEND);
};

if (points.length > 1) {
  for (let i = 1; i < POINT_COUNT; i++) {
    renderRoutePoints(points[i]);
  }
} else {
  renderElement(siteListElement, new EmptyView().getElement(), RenderPosition.BEFOREEND);
}

