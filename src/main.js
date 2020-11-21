import {createRouteTemplate} from "./view/route.js";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.page-body`);
const siteTripElement = siteMainElement.querySelector(`.trip-main`);

render(siteTripElement, createRouteTemplate(), `afterbegin`);
