import {createEmptyTemplate} from "./empty.tpl.js";
import Abstract from "../abstract/abstract.js";

export default class EmptyView extends Abstract {
  constructor() {
    super();
  }
  getTemplate() {
    return createEmptyTemplate();
  }
}
