import {createEmptyTemplate} from "./empty.tpl";
import Abstract from "../abstract/abstract";

export default class EmptyView extends Abstract {
  constructor() {
    super();
  }
  getTemplate() {
    return createEmptyTemplate();
  }
}
