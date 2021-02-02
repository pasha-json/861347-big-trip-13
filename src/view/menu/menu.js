import {createMenuTemplate} from "./menu.tpl";
import Abstract from "../abstract/abstract";

export default class Menu extends Abstract {
  constructor(tripInfoElement) {
    super();

    this._addPointButton = tripInfoElement.querySelector(`.trip-main__event-add-btn`);
    this._addPointButton.disabled = true;
    this._menuClickHandler = this._menuClickHandler.bind(this);
    this.enableAddPointButton = this.enableAddPointButton.bind(this);
  }

  getTemplate() {
    return createMenuTemplate();
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
    this._addPointButton.addEventListener(`click`, this._menuClickHandler);
  }

  enableAddPointButton() {
    this._addPointButton.disabled = false;
  }

  _setMenuItemTable() {
    const menuItemTable = this.getElement().querySelector(`a`);
    menuItemTable.classList.add(`trip-tabs__btn--active`);
    menuItemTable.nextElementSibling.classList.remove(`trip-tabs__btn--active`);
  }

  _setMenuItem(element) {
    if (element.previousElementSibling) {
      element.previousElementSibling.classList.remove(`trip-tabs__btn--active`);
    } else {
      element.nextElementSibling.classList.remove(`trip-tabs__btn--active`);
    }
    element.classList.add(`trip-tabs__btn--active`);
  }

  _menuClickHandler(evt) {
    let target = evt.target.closest(`button`);
    if (target) {
      evt.preventDefault();
      this._addPointButton.disabled = true;
      this._setMenuItemTable();
      this._callback.menuClick(target.textContent);
      return;
    }

    target = evt.target.closest(`a`);
    if (!target) {
      return;
    }

    evt.preventDefault();
    this._setMenuItem(target);
    this._callback.menuClick(target.textContent);
  }
}

