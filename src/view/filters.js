export const createFiltersTemplate = (filters) => {

  const filterItems = filters.map((value) => {
    const valueLowerCase = value.toLowerCase();
    return `<div class="trip-filters__filter">
        <input id="filter-${valueLowerCase}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${valueLowerCase}" checked>
        <label class="trip-filters__filter-label" for="filter-${valueLowerCase}">${value}</label>
      </div>`;
  }).join(``);

  return `<form class="trip-filters" action="#" method="get">
    ${filterItems}
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
};