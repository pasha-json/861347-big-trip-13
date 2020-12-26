import FormEditView from "../view/form-edit/form-edit";
import RoutePinView from "../view/route-pin/route-pin";
import EmptyView from "../view/empty/empty";
import {renderElement, RenderPosition, remove, replace} from "../utils/render";
import {isEscKeyPressed} from "../utils/common";

export default class Point {
  constructor(siteListElement) {
    this._siteListElement = siteListElement;

    this._routePoint = null;
    this._editForm = null;

    this._replaceRoutePointToForm = this._replaceRoutePointToForm.bind(this);
    this._replaceFormToRoutePoint = this._replaceFormToRoutePoint.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);

  }

  _init(point) {
    this._renderPins(point);
  }
  _renderRoutePin(point) {

    const prevRoutePoint = this._routePoint;
    const prevEditForm = this._editForm;

    this._routePoint = new RoutePinView(point);
    this._editForm = new FormEditView(point);

    this._routePoint.setClickHandler(this._replaceRoutePointToForm);
    this._editForm.setSubmitHandler(this._replaceFormToRoutePoint);
    this._editForm.setClickHandler(this._replaceFormToRoutePoint);

    if (prevRoutePoint === null || prevEditForm === null) {
      renderElement(this._siteListElement, this._routePoint, RenderPosition.BEFOREEND);
      return;
    }

    if (this._siteListElement.getElement().contains(prevRoutePoint.getElement())) {
      replace(this._siteListElement, this._routePoint, prevRoutePoint);
    }
    if (this._siteListElement.getElement().contains(prevEditForm.getElement())) {
      replace(this._siteListElement, this._editForm, prevEditForm);
    }

    remove(this._routePoint);
    remove(this._editForm);

  }
  _renderPins(point) {
    this._renderRoutePin(point);
  }
  _renderEmpty() {
    this._render(this._siteListElement, new EmptyView().getElement(), RenderPosition.BEFOREEND);
  }

  _replaceRoutePointToForm() {
    replace(this._siteListElement, this._editForm, this._routePoint);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceFormToRoutePoint() {
    replace(this._siteListElement, this._routePoint, this._editForm);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
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
}
