import {createAddFormTemplate} from "./form-add.tpl";
import Abstract from "../abstract/abstract";

export default class FormAddView extends Abstract {
  constructor(data) {
    super();
    this._data = data;
  }
  getTemplate() {
    return createAddFormTemplate(this._data);
  }
}
