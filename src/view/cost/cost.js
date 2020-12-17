import {createCostTemplate} from "./cost.tpl.js";
import Abstract from "../abstract/abstract.js";

export default class CostView extends Abstract {
  constructor(data) {
    super();
    this._data = data;
  }
  getTemplate() {
    return createCostTemplate(this._data);
  }
}
