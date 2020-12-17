import {createRoutePinTemplate} from "./route-pin.tpl.js";
import Abstract from "../abstract/abstract.js";

export default class RoutePinView extends Abstract {
  constructor(data) {
    super();
    this._data = data;
  }
  getTemplate() {
    return createRoutePinTemplate(this._data);
  }
}
