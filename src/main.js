import Trip from "./presenter/trip";
import {generatePoint} from "./mock/route-point";
import {generateTotalCost} from "./mock/cost";
import {Filters, generateMenu, POINT_COUNT} from "./consts/consts";
import {generateRouteInfo} from "./mock/route";
import {generateSorting} from "./mock/sort";
import {generateOptions} from "./mock/options";

const points = new Array(POINT_COUNT).fill().map(generatePoint);
const cost = generateTotalCost(points);
const options = generateOptions();

const menu = generateMenu();

const filters = Object.values(Filters);
const route = generateRouteInfo(points);
const sort = generateSorting();

const newTrip = new Trip(points, cost, menu, filters, route, sort, options);
newTrip._init();
