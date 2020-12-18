import {createCostTemplate} from "./cost.tpl";
import Abstract from "../abstract/abstract";

export default class CostView extends Abstract {
  constructor(data) {
    super();
    this._data = data;
  }
  getTemplate() {
    return createCostTemplate(this._data);
  }
}
