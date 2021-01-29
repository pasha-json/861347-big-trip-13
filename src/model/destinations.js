import Observer from "../utils/observer";

export default class DestinationsModel extends Observer {
  constructor() {
    super();
    this._destinations = [];
  }
  getDestinations() {
    return this._destinations;
  }

  setDestinations(UpdateType, destinations) {
    this._destinations = destinations;
    this._notify(UpdateType);
  }

}
