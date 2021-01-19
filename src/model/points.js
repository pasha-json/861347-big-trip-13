import Observer from "../utils/observer";

export default class PointsModel extends Observer {
  constructor() {
    super();
    this._points = [];
  }
  setPoints(points) {
    this._points = points.slice();
  }
  getPoints() {
    return this._points;
  }
}
