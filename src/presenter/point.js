import FormEditView from "../view/form-edit/form-edit";
import RoutePinView from "../view/route-pin/route-pin";
import {renderElement, RenderPosition, remove, replace} from "../utils/render";
import {isEscKeyPressed} from "../utils/common";
import {UserAction, UpdateType} from "../consts/consts";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`
};


export default class Point {
  constructor(siteListElement, changeData, changeMode, points, options, destinations) {
    this._siteListElement = siteListElement;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._points = points;
    this._options = options;
    this._destinations = destinations;

    this._routePoint = null;
    this._editForm = null;
    this._mode = Mode.DEFAULT;

    this._replaceRoutePointToForm = this._replaceRoutePointToForm.bind(this);
    this._replaceFormToRoutePoint = this._replaceFormToRoutePoint.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._handleFavouriteClick = this._handleFavouriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);

  }

  _init(point) {
    this._renderPins(point);
  }
  _renderRoutePin(point) {

    const prevRoutePoint = this._routePoint;
    const prevEditForm = this._editForm;

    this._point = point;

    this._routePoint = new RoutePinView(this._point, this._options);
    this._editForm = new FormEditView(this._point, this._options, this._points, this._destinations);

    this._routePoint.setClickHandler(this._replaceRoutePointToForm);
    this._editForm.setSubmitHandler(this._handleFormSubmit);
    this._routePoint.setFavouriteClickHandler(this._handleFavouriteClick);
    this._editForm.setDeleteClickHandler(this._handleDeleteClick);
    this._editForm.setClickHandler(this._handleCloseClick);

    if (prevRoutePoint === null || prevEditForm === null) {
      renderElement(this._siteListElement, this._routePoint, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._routePoint, prevRoutePoint);
    }
    if (this._mode === Mode.EDITING) {
      replace(this._editForm, prevEditForm);
      this._mode = Mode.DEFAULT;
    }

    remove(prevRoutePoint);
    remove(prevEditForm);

  }
  _renderPins(point) {
    this._renderRoutePin(point);
  }

  _resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToRoutePoint();
    }
  }

  _replaceRoutePointToForm() {
    replace(this._editForm, this._routePoint);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToRoutePoint() {
    replace(this._routePoint, this._editForm);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    if (isEscKeyPressed(evt)) {
      evt.preventDefault();
      this._handleCloseClick();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
  _handleCloseClick() {
    this._editForm.reset(this._point);
    this._replaceFormToRoutePoint();
  }

  destroy() {
    remove(this._routePoint);
    remove(this._editForm);
  }

  _handleFavouriteClick() {
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._point,
            {
              isFavourite: !this._point.isFavourite
            }
        )
    );
  }

  _handleFormSubmit(point) {
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        point
    );
  }

  _handleDeleteClick(point) {
    this._changeData(
        UserAction.DELETE_POINT,
        UpdateType.MINOR,
        point
    );
  }

  setViewState(state) {
    const resetFormState = () => {
      this._editForm.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    switch (state) {
      case State.SAVING:
        this._editForm.updateData({
          isDisabled: true,
          isSaving: true
        });
        break;
      case State.DELETING:
        this._editForm.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
      case State.ABORTING:
        // this._routePoint.shake(resetFormState);
        // this._editForm.shake(resetFormState);
        break;
    }
  }
}
