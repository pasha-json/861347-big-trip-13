import Observer from "../utils/observer";

export default class PointsModel extends Observer {
  constructor() {
    super();
    this._points = [];
  }
  setPoints(UpdateType, points) {
    this._points = points.slice();

    this._notify(UpdateType);
  }
  getPoints() {
    return this._points;
  }
  addPoint(updateType, update) {

    this._points = [
      update,
      ...this._points
    ];

    this._notify(updateType, update);
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting task`);
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          price: point.base_price,
          date: {
            start: new Date(point.date_from),
            end: new Date(point.date_to)
          },
          destination: point[`destination`][`name`],
          description: point[`destination`][`description`],
          images: point[`destination`][`pictures`].map((elem) => {
            return elem[`src`];
          }),
          isFavourite: point.is_favorite,
          options: {
            type: point.type,
            options: point.offers !== null ? point.offers.map((elem) => {
              elem[`name`] = elem[`title`];
              elem.isIncluded = false;
              delete elem[`title`];
              return elem;
            }) : []
          }
        }
    );

    delete adaptedPoint.base_price;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    // delete adaptedPoint.destination;
    // delete adaptedPoint.pictures;
    delete adaptedPoint.is_favorite;
    // delete adaptedPoint.type;
    delete adaptedPoint.offers;

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          "base_price": point.price,
          "date_from": point.date.start.toISOString(),
          "date_to": point.date.end.toISOString(),
          "destination": {
            "name": point.destination,
            "description": point.description
          },
          "pictures": point.images,
          "is_favourite": point.isFavourite,
          "offers": point.options.options !== null ? point.options.options.map((elem) => {
            elem[`name`] = elem[`title`];
            delete elem[`name`];
            elem.price = Number(elem.price);
          }) : []
        }
    );

    delete adaptedPoint.price;
    delete adaptedPoint.date;
    delete adaptedPoint.destination;
    delete adaptedPoint.description;
    delete adaptedPoint.images;
    delete adaptedPoint.isFavourite;
    delete adaptedPoint.options;

    return adaptedPoint;
  }
}
