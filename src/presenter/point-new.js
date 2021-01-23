import FormEditView from "../view/form-edit/form-edit";
import {generateId} from "../mock/route-point";
import {renderElement, RenderPosition, remove, replace} from "../utils/render";
import {isEscKeyPressed} from "../utils/common";
import {UserAction, UpdateType} from "../consts/consts";

// const Mode = {
//   DEFAULT: `DEFAULT`,
//   EDITING: `EDITING`
// };

const DEFAULT_POINT_TYPE = `Flight`;

const EMPTY_POINT = {
  type: DEFAULT_POINT_TYPE,
  destination: ``,
  offers: [],
  price: ``,
  date: {
    start: null,
    end: null,
  },
  isFavorite: false
};


export default class PointNew {
  constructor(siteListElement, changeData, options, points) {
    this._siteListElement = siteListElement;
    this._changeData = changeData;
    // this._changeMode = changeMode;

    this._options = options;
    this._points = points;

    this._pointEditComponent = null;

    // this._routePoint = null;
    // this._editForm = null;
    // this._mode = Mode.DEFAULT;

    // this._replaceRoutePointToForm = this._replaceRoutePointToForm.bind(this);
    // this._replaceFormToRoutePoint = this._replaceFormToRoutePoint.bind(this);
    // this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._handleFavouriteClick = this._handleFavouriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);

  }

  init() {
    if (this._pointEditComponent !== null) {
      return;
    }

    this._pointEditComponent = new FormEditView(EMPTY_POINT, this._options, this._points);
    this._pointEditComponent.setSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    renderElement(this._siteListElement, this._pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  destroy() {
    if (this._pointEditComponent === null) {
      return;
    }
    this._pointEditComponent._deleteDatePicker();
    remove(this._pointEditComponent);
    this._pointEditComponent = null;
  }
  // _renderRoutePin(point) {

  // const prevRoutePoint = this._routePoint;
  // const prevEditForm = this._editForm;

  // this._point = point;

  // this._routePoint = new RoutePinView(this._point, this._options);
  // this._editForm = new FormEditView(this._point, this._options, this._points);

  // this._routePoint.setClickHandler(this._replaceRoutePointToForm);
  // this._editForm.setSubmitHandler(this._handleFormSubmit);
  // this._editForm.setClickHandler(this._replaceFormToRoutePoint);
  // this._routePoint.setFavouriteClickHandler(this._handleFavouriteClick);
  // this._editForm.setDeleteClickHandler(this._handleDeleteClick);

  // if (prevRoutePoint === null || prevEditForm === null) {
  //   renderElement(this._siteListElement, this._routePoint, RenderPosition.BEFOREEND);
  //   return;
  // }

  // if (this._mode === Mode.DEFAULT) {
  //   replace(this._siteListElement, this._routePoint, prevRoutePoint);
  // }
  // if (this._mode === Mode.EDITING) {
  //   replace(this._siteListElement, this._editForm, prevEditForm);
  // }

  //   remove(prevRoutePoint);
  //   remove(prevEditForm);

  // }
  // _renderPins(point) {
  //   this._renderRoutePin(point);
  // }

  // _resetView() {
  //   if (this._mode !== Mode.DEFAULT) {
  //     this._replaceFormToRoutePoint();
  //   }
  // }

  // _replaceRoutePointToForm() {
  //   replace(this._siteListElement, this._editForm, this._routePoint);
  //   document.addEventListener(`keydown`, this._onEscKeyDown);
  //   this._changeMode();
  //   this._mode = Mode.EDITING;
  // }

  // _replaceFormToRoutePoint() {
  //   replace(this._siteListElement, this._routePoint, this._editForm);
  //   document.removeEventListener(`keydown`, this._onEscKeyDown);
  //   this._mode = Mode.DEFAULT;
  // }

  _onEscKeyDown(evt) {
    // if (isEscKeyPressed(evt)) {
    //   evt.preventDefault();
    //   this._editForm.reset(this._point);
    //   this._replaceFormToRoutePoint();
    //   document.removeEventListener(`keydown`, this._onEscKeyDown);
    // }
    if (isEscKeyPressed(evt)) {
      evt.preventDefault();
      this.destroy();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
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
    console.log(point);
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        Object.assign({id: generateId()}, point)
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }
}
