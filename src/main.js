import {createRouteTemplate} from "./view/route.js";
import {createCostTemplate} from "./view/cost.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFiltersTemplate} from "./view/filters.js";
import {createSortTemplate} from "./view/sort.js";
import {createFormListTemplate} from "./view/form-list.js";
import {createAddFormTemplate} from "./view/form-add.js";
import {createEditTemplate} from "./view/form-edit.js";
import {createRoutePinTemplate} from "./view/route-pin.js";
import {generatePoint} from "./mock/route-point.js";
import {generateTotalCost} from "./mock/cost.js";
import {generateMenu} from "./view/const.js";
import {generateFilters} from "./view/const.js";
import {generateRouteInfo} from "./mock/route.js";
import {generateSorting} from "./mock/sort.js";

const POINT_COUNT = 20;

const points = new Array(POINT_COUNT).fill().map(generatePoint);
const cost = generateTotalCost(points);

const menu = generateMenu();

const filters = Object.values(generateFilters());
const route = generateRouteInfo(points);
const sort = generateSorting();

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.page-body`);
const siteRouteElement = siteMainElement.querySelector(`.trip-main`);
const siteControlsElement = siteMainElement.querySelector(`.trip-main__trip-controls h2:first-child`);
const siteFiltersElement = siteMainElement.querySelector(`.trip-main__trip-controls h2:nth-child(2)`);
const siteSortElement = siteMainElement.querySelector(`.trip-events`);


render(siteRouteElement, createRouteTemplate(route), `afterbegin`);

const siteCostElement = siteRouteElement.querySelector(`.trip-main__trip-info`);

render(siteCostElement, createCostTemplate(cost), `beforeend`);
render(siteControlsElement, createMenuTemplate(menu), `afterend`);
render(siteFiltersElement, createFiltersTemplate(filters), `afterend`);
render(siteSortElement, createSortTemplate(sort), `beforeend`);
render(siteSortElement, createFormListTemplate(), `beforeend`);

const siteListElement = siteMainElement.querySelector(`.trip-events__list`);

render(siteListElement, createAddFormTemplate(points[0]), `beforeend`);
render(siteListElement, createEditTemplate(points[0]), `afterbegin`);

for (let i = 1; i < POINT_COUNT; i++) {
  render(siteListElement, createRoutePinTemplate(points[i]), `beforeend`);
}

