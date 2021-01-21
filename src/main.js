import Trip from "./presenter/trip";
import {generatePoint} from "./mock/route-point";
import {generateOptions} from "./mock/options";
import {POINT_COUNT} from "./consts/consts";
import PointsModel from "./model/points";
import OptionsModel from "./model/options";

const points = new Array(POINT_COUNT).fill().map(generatePoint);
const options = generateOptions();

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const optionsModel = new OptionsModel();
optionsModel.setOptions(options);

const newTrip = new Trip(pointsModel, optionsModel);
newTrip._init();


