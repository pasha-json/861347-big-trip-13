import Observer from "../utils/observer";

export default class OptionsModel extends Observer {
  constructor() {
    super();
    this._options = [];
  }
  setOptions(options) {
    this._options = options.slice();
  }
  getOptions() {
    return this._options;
  }
}
