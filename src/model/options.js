import Observer from "../utils/observer";

export default class OptionsModel extends Observer {
  constructor() {
    super();
    this._options = [];
  }
  getOptions() {
    return this._options;
  }

  setOptions(UpdateType, offers) {
    this._options = offers.slice();
    this._notify(UpdateType);
  }

}
