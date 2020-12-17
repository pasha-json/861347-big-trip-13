import {createRouteTemplate} from "./route.tpl.js";
import Abstract from "../abstract/abstract.js";

export default class RouteView extends Abstract {
  constructor(data) {
    super();
    this._data = data;
  }
  getTemplate() {
    return createRouteTemplate(this._data);
  }
}
