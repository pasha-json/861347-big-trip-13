const createFilterControlTemplate = (filterType, points, isChecked) => {
  const disabled = points.length === 0 ? `disabled` : ``;
  return `
  <div class="trip-filters__filter">
    <input id="filter-${filterType}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterType}" ${isChecked ? `checked` : ``} ${disabled}>
    <label class="trip-filters__filter-label" for="filter-${filterType}">${filterType}</label>
  </div>
  `;
};

export const createFiltersTemplate = (filters, currentFilterType) => {
  const filterItems = Object.keys(filters)
    .map((filterType) => createFilterControlTemplate(filterType, filters[filterType], filterType === currentFilterType))
    .join(``);

  return `
    <form class="trip-filters" action="#" method="get">
      ${filterItems}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
};
