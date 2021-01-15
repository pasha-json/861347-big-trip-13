import FormEditView from "../view/form-edit/form-edit";
import RoutePinView from "../view/route-pin/route-pin";
import EmptyView from "../view/empty/empty";
import {renderElement, RenderPosition, remove, replace} from "../utils/render";
import {isEscKeyPressed} from "../utils/common";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};


export default class Point {
  constructor(siteListElement, changeData, changeMode, typesOfPoints, destinations, options) {
    this._siteListElement = siteListElement;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._typesOfPoints = typesOfPoints;
    this._destinations = destinations;
    this._options = options;

    this._routePoint = null;
    this._editForm = null;
    this._mode = Mode.DEFAULT;

    this._replaceRoutePointToForm = this._replaceRoutePointToForm.bind(this);
    this._replaceFormToRoutePoint = this._replaceFormToRoutePoint.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._handleFavouriteClick = this._handleFavouriteClick.bind(this);

  }

  _init(point) {
    this._renderPins(point);
  }
  _renderRoutePin(point) {

    const prevRoutePoint = this._routePoint;
    const prevEditForm = this._editForm;

    this._point = point;

    this._routePoint = new RoutePinView(this._point);
    this._editForm = new FormEditView(this._point, this._typesOfPoints, this._destinations, this._options);

    this._routePoint.setClickHandler(this._replaceRoutePointToForm);
    this._editForm.setSubmitHandler(this._replaceFormToRoutePoint);
    this._editForm.setClickHandler(this._replaceFormToRoutePoint);
    this._routePoint.setFavouriteClickHandler(this._handleFavouriteClick);

    if (prevRoutePoint === null || prevEditForm === null) {
      renderElement(this._siteListElement, this._routePoint, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._siteListElement, this._routePoint, prevRoutePoint);
    }
    if (this._mode === Mode.EDITING) {
      replace(this._siteListElement, this._editForm, prevEditForm);
    }

    remove(prevRoutePoint);
    remove(prevEditForm);

  }
  _renderPins(point) {
    this._renderRoutePin(point);
  }
  _renderEmpty() {
    this._render(this._siteListElement, new EmptyView().getElement(), RenderPosition.BEFOREEND);
  }
  _resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToRoutePoint();
    }
  }

  _replaceRoutePointToForm() {
    replace(this._siteListElement, this._editForm, this._routePoint);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToRoutePoint() {
    replace(this._siteListElement, this._routePoint, this._editForm);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    if (isEscKeyPressed(evt)) {
      evt.preventDefault();
      this._replaceFormToRoutePoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  destroy() {
    remove(this._routePoint);
    remove(this._editForm);
  }

  _handleFavouriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._point,
            {
              isFavourite: !this._point.isFavourite
            }
        )
    );
  }
}
