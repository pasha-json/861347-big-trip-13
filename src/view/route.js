import {createElement} from "../utils.js";

const createRouteTemplate = ({firstPoint, secondPoint, lastPoint, firstDay, lastDay, firstMonth, lastMonth}) => {

  const secondMonth = lastMonth === firstMonth ? `` : `${lastMonth}`;

  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${firstPoint} &mdash; ${secondPoint} &mdash; ${lastPoint}</h1>

    <p class="trip-info__dates">${firstMonth} ${firstDay}&nbsp;&mdash;${secondMonth}&nbsp;${lastDay}</p>
  </div>
</section>`;
};

export default class RouteView {
  constructor(data) {
    this._element = null;
    this._data = data;
  }
  getTemplate() {
    return createRouteTemplate(this._data);
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
