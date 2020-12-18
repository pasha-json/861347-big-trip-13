import {createRouteTemplate} from "./route.tpl";
import Abstract from "../abstract/abstract";

export default class RouteView extends Abstract {
  constructor(data) {
    super();
    this._data = data;
  }
  getTemplate() {
    return createRouteTemplate(this._data);
  }
}
