import Trip from "./presenter/trip";
import {generatePoint} from "./mock/route-point";
import {generateOptions} from "./mock/options";
import {POINT_COUNT} from "./consts/consts";
import PointsModel from "./model/points";
import OptionsModel from "./model/options";
import FilterModel from "./model/filter";
import Filter from "./presenter/filter";

const body = document.querySelector(`.page-body`);
const tripInfo = body.querySelector(`.page-header .trip-main`);
const filtersContainer = tripInfo.querySelector(`.trip-main__trip-controls`);

const points = new Array(POINT_COUNT).fill().map(generatePoint);
const options = generateOptions();

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const optionsModel = new OptionsModel();
optionsModel.setOptions(options);

const filterModel = new FilterModel();

const newTrip = new Trip(pointsModel, optionsModel, filterModel);
newTrip._init();

const filterPresenter = new Filter(filtersContainer, filterModel, pointsModel);
filterPresenter.init();


