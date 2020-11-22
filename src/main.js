import {createRouteTemplate} from "./view/route.js";
import {createCostTemplate} from "./view/cost.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFiltersTemplate} from "./view/filters.js";
import {createSortTemplate} from "./view/sort.js";
import {createFormListTemplate} from "./view/form-list.js";
import {createAddFormTemplate} from "./view/form-add.js";
import {createEditTemplate} from "./view/form-edit.js";
import {createRoutePinTemplate} from "./view/route-pin.js";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.page-body`);
const siteRouteElement = siteMainElement.querySelector(`.trip-main`);
const siteControlsElement = siteMainElement.querySelector(`.trip-main__trip-controls h2:first-child`);
const siteFiltersElement = siteMainElement.querySelector(`.trip-main__trip-controls h2:nth-child(2)`);
const siteSortElement = siteMainElement.querySelector(`.trip-events`);


render(siteRouteElement, createRouteTemplate(), `afterbegin`);

const siteCostElement = siteRouteElement.querySelector(`.trip-main__trip-info`);

render(siteCostElement, createCostTemplate(), `beforeend`);
render(siteControlsElement, createMenuTemplate(), `afterend`);
render(siteFiltersElement, createFiltersTemplate(), `afterend`);
render(siteSortElement, createSortTemplate(), `beforeend`);
render(siteSortElement, createFormListTemplate(), `beforeend`);

const siteListElement = siteMainElement.querySelector(`.trip-events__list`);

render(siteListElement, createAddFormTemplate(), `beforeend`);
render(siteListElement, createEditTemplate(), `afterbegin`);

const PINS_NUMBER = 3;

for (let i = 0; i < PINS_NUMBER; i++) {
  render(siteListElement, createRoutePinTemplate(), `beforeend`);
}

