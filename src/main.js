import Trip from "./presenter/trip";
import {MenuItem, UpdateType} from "./consts/consts";
import PointsModel from "./model/points";
import OptionsModel from "./model/options";
import FilterModel from "./model/filter";
import DestinationsModel from "./model/destinations";
import Filter from "./presenter/filter";
import StatisticsView from "./view/statistics/statistics";
import {renderElement, RenderPosition} from "./utils/render";
import MenuView from "./view/menu/menu";
import Api from "./api/api";

const AUTHORIZATION = `Basic wefju4rvnrijnvehuHJGhgji64556`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;

const body = document.querySelector(`.page-body`);
const tripInfo = body.querySelector(`.page-header .trip-main`);
const filtersContainer = tripInfo.querySelector(`.trip-main__trip-controls`);
const tripElement = body.querySelector(`.page-main section.trip-events`);
const siteControlsElement = body.querySelector(`.trip-main__trip-controls h2:first-child`);

const destinationsModel = new DestinationsModel();
const pointsModel = new PointsModel();
const optionsModel = new OptionsModel();
const filterModel = new FilterModel();

const statisticsComponent = new StatisticsView();
const menuComponent = new MenuView(tripInfo);

const api = new Api(END_POINT, AUTHORIZATION);

const newTrip = new Trip(tripElement, pointsModel, optionsModel, filterModel, destinationsModel, api);
newTrip.init();
newTrip.setAddPointButtonEnableHandler(menuComponent.enableAddPointButton);

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      newTrip.resetSortType();
      newTrip.show();
      newTrip.restoreControls();
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
      newTrip.createPoint();
      tripInfo.querySelector(`.trip-main__event-add-btn`).disabled = true;
      break;
  }
};

const filterPresenter = new Filter(filtersContainer, filterModel, pointsModel);
filterPresenter.init();

renderElement(tripElement, statisticsComponent, RenderPosition.AFTEREND);

api.getOffers()
  .then((offers) => {
    optionsModel.setOptions(UpdateType.OFFERS_INIT, offers);
  })
  .catch(() => {
    optionsModel.setOptions(UpdateType.OFFERS_FAILED, []);
  });

api.getDestinations()
  .then((destinations) => {
    destinationsModel.setDestinations(UpdateType.DESTINATIONS_INIT, destinations);
  })
  .catch(() => {
    destinationsModel.setDestinations(UpdateType.DESTINATIONS_FAILED, []);
  });

api.getPoints()
  .then((points) => {
    pointsModel.setPoints(UpdateType.INIT, points);
    renderElement(siteControlsElement, menuComponent.getElement(), RenderPosition.AFTEREND);
    menuComponent.setMenuClickHandler(handleSiteMenuClick);
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
    renderElement(siteControlsElement, menuComponent.getElement(), RenderPosition.AFTEREND);
    menuComponent.setMenuClickHandler(handleSiteMenuClick);
  });

