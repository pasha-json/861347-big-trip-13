import {MenuItem} from "../../consts/consts";

export const createMenuTemplate = () => {
  return `
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${MenuItem.TABLE}</a>
      <a class="trip-tabs__btn" href="#">${MenuItem.STATS}</a>
    </nav>
    `;
};
