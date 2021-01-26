import Trip from "./presenter/trip";
import {generatePoint} from "./mock/route-point";
import {generateOptions} from "./mock/options";
import {POINT_COUNT, MenuItem} from "./consts/consts";
import PointsModel from "./model/points";
import OptionsModel from "./model/options";
import FilterModel from "./model/filter";
import Filter from "./presenter/filter";
import StatisticsView from "./view/statistics/statistics";
import {renderElement, RenderPosition} from "./utils/render";
import {generateTotalCost, generateRouteInfo} from "./utils/common";
import RouteView from "./view/route/route";
import CostView from "./view/cost/cost";
import MenuView from "./view/menu/menu";

const body = document.querySelector(`.page-body`);
const tripInfo = body.querySelector(`.page-header .trip-main`);
const filtersContainer = tripInfo.querySelector(`.trip-main__trip-controls`);
const tripElement = body.querySelector(`.page-main section.trip-events`);
const siteControlsElement = body.querySelector(`.trip-main__trip-controls h2:first-child`);

const points = new Array(POINT_COUNT).fill().map(generatePoint);
const options = generateOptions();

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const optionsModel = new OptionsModel();
optionsModel.setOptions(options);

const filterModel = new FilterModel();

const cost = generateTotalCost(pointsModel.getPoints());
const route = generateRouteInfo(pointsModel.getPoints());

const newTrip = new Trip(tripElement, pointsModel, optionsModel, filterModel);
newTrip._init();

const routeComponent = new RouteView(route);
const costComponent = new CostView(cost);
const menuComponent = new MenuView(tripInfo);
const statisticsComponent = new StatisticsView();


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
      // newTrip._createPoint(menuComponent.enableAddPointButton);
      newTrip._createPoint();
      tripInfo.querySelector(`.trip-main__event-add-btn`).disabled = true;
      break;
  }
};

menuComponent.setMenuClickHandler(handleSiteMenuClick);

// document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
//   evt.preventDefault();
//   newTrip._createPoint();
// });


