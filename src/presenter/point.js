import FormEditView from "../view/form-edit/form-edit";
import RoutePinView from "../view/route-pin/route-pin";
import EmptyView from "../view/empty/empty";
import {renderElement, RenderPosition} from "../utils/render";
import {isEscKeyPressed} from "../utils/common";

export default class Point {
  constructor(points, siteListElement) {
    this._points = points;
    this._siteListElement = siteListElement;

  }
  _render(where, what, position) {
    renderElement(where, what, position);
  }
  _init() {
    this._renderPins();
  }
  _renderRoutePin(data) {
    const routePoint = new RoutePinView(data);
    const editForm = new FormEditView(data);

    const replaceRoutePointToForm = () => {
      this._siteListElement.replaceChild(editForm.getElement(), routePoint.getElement());
    };

    const replaceFormToRoutePoint = () => {
      this._siteListElement.replaceChild(routePoint.getElement(), editForm.getElement());
    };

    const onEscKeyDown = (evt) => {
      if (isEscKeyPressed(evt)) {
        evt.preventDefault();
        replaceFormToRoutePoint();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    routePoint.setClickHandler(() => {
      replaceRoutePointToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    editForm.setSubmitHandler(() => {
      replaceFormToRoutePoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    editForm.setClickHandler(() => {
      replaceFormToRoutePoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    this._render(this._siteListElement, routePoint.getElement(), RenderPosition.BEFOREEND);

  }
  _renderPins() {
    if (this._points.length > 1) {
      for (let i = 1; i < this._points.length; i++) {
        this._renderRoutePin(this._points[i]);
      }
    } else {
      this._renderEmpty();
    }
  }
  _renderEmpty() {
    this._render(this._siteListElement, new EmptyView().getElement(), RenderPosition.BEFOREEND);
  }
}
