import Trip from "./presenter/trip";
import {generatePoint} from "./mock/route-point";
import {generateOptions} from "./mock/options";
import {POINT_COUNT, MenuItem, UpdateType} from "./consts/consts";
import PointsModel from "./model/points";
import OptionsModel from "./model/options";
import FilterModel from "./model/filter";
import DestinationsModel from "./model/destinations";
import Filter from "./presenter/filter";
import StatisticsView from "./view/statistics/statistics";
import {renderElement, RenderPosition} from "./utils/render";
import {generateTotalCost, generateRouteInfo} from "./utils/common";
import RouteView from "./view/route/route";
import CostView from "./view/cost/cost";
import MenuView from "./view/menu/menu";
import Api from "./api/api";

const AUTHORIZATION = `Basic wefju4rvnrijnvehuHJGhgji6`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip/`;

const body = document.querySelector(`.page-body`);
const tripInfo = body.querySelector(`.page-header .trip-main`);
const filtersContainer = tripInfo.querySelector(`.trip-main__trip-controls`);
const tripElement = body.querySelector(`.page-main section.trip-events`);
const siteControlsElement = body.querySelector(`.trip-main__trip-controls h2:first-child`);

// const points = new Array(POINT_COUNT).fill().map(generatePoint);
// console.log(points);

const points = [];

const destinationsModel = new DestinationsModel();
const pointsModel = new PointsModel();
const optionsModel = new OptionsModel();
const filterModel = new FilterModel();

const statisticsComponent = new StatisticsView();

const api = new Api(END_POINT, AUTHORIZATION);

api.getPoints().then((newPoints) => {
  // console.log(newPoints);
  // pointsModel.setPoints(UpdateType.MAJOR, newPoints);

});

api.getOffers().then((offers) => {
  console.log(offers);
  // optionsModel.setOptions(UpdateType.MAJOR, offers);

});

api.getDestinations().then((destinations) => {
  console.log(destinations);
  // destinationsModel.setDestinations(UpdateType.MAJOR, destinations);

});

const options = generateOptions();
// console.log(options);


pointsModel.setPoints(UpdateType.MAJOR, points);


optionsModel.setOptions(UpdateType.MAJOR, options);

console.log(Boolean(pointsModel.getPoints().toString()));

const cost = pointsModel.getPoints().toString() ? generateTotalCost(pointsModel.getPoints()) : null;
const route = pointsModel.getPoints().toString() ? generateRouteInfo(pointsModel.getPoints()) : {};

const newTrip = new Trip(tripElement, pointsModel, optionsModel, filterModel, destinationsModel);
newTrip._init();

const routeComponent = new RouteView(route);
const costComponent = new CostView(cost);
const menuComponent = new MenuView(tripInfo);


renderElement(tripInfo, routeComponent.getElement(), RenderPosition.AFTERBEGIN);
const siteCostElement = tripInfo.querySelector(`.trip-main__trip-info`);

renderElement(siteCostElement, costComponent.getElement(), RenderPosition.BEFOREEND);

renderElement(siteControlsElement, menuComponent.getElement(), RenderPosition.AFTEREND);

const filterPresenter = new Filter(filtersContainer, filterModel, pointsModel);
filterPresenter.init();

renderElement(tripElement, statisticsComponent, RenderPosition.AFTEREND);

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      newTrip.show();
      statisticsComponent.hide();
      break;
    case MenuItem.STATS:
      newTrip.hide();
      statisticsComponent.init(pointsModel.getPoints());
      statisticsComponent.show();
      break;
    case MenuItem.ADD_POINT:
      statisticsComponent.hide();
      newTrip.show();
      newTrip._createPoint();
      tripInfo.querySelector(`.trip-main__event-add-btn`).disabled = true;
      break;
  }
};

menuComponent.setMenuClickHandler(handleSiteMenuClick);


