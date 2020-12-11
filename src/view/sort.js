export const createSortTemplate = (sort) => {

  const data = Object.entries(sort);
  const sortItems = data.map((value) => {
    return `<div class="trip-sort__item  trip-sort__item--${value[0]}">
    <input id="sort-${value[0]}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${value[0]}" ${value[0] === `event` || value[0] === `offer` ? `disabled` : ``}>
    <label class="trip-sort__btn" for="sort-${value[0]}">${value[1]}</label>
  </div>`;
  }).join(``);

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${sortItems}
</form>`;
};
