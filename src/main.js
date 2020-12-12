import RouteView from "./view/route.js";
import CostView from "./view/cost.js";
import MenuView from "./view/menu.js";
import FiltersView from "./view/filters.js";
import SortView from "./view/sort.js";
import FormListView from "./view/form-list.js";
import FormAddView from "./view/form-add.js";
import FormEditView from "./view/form-edit.js";
import RoutePinView from "./view/route-pin.js";
import {generatePoint} from "./mock/route-point.js";
import {generateTotalCost} from "./mock/cost.js";
import {generateMenu} from "./view/const.js";
import {generateFilters} from "./view/const.js";
import {generateRouteInfo} from "./mock/route.js";
import {generateSorting} from "./mock/sort.js";
import {renderElement, RenderPosition} from "./utils.js";

const POINT_COUNT = 20;

const points = new Array(POINT_COUNT).fill().map(generatePoint);
const cost = generateTotalCost(points);

const menu = generateMenu();

const filters = Object.values(generateFilters());
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
renderElement(siteListElement, new FormEditView(points[0]).getElement(), RenderPosition.AFTERBEGIN);


for (let i = 1; i < POINT_COUNT; i++) {
  renderElement(siteListElement, new RoutePinView(points[i]).getElement(), RenderPosition.BEFOREEND);
}

