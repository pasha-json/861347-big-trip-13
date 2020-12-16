export const createMenuTemplate = ({items}) => {

  const menuItems = items.map(({title, isActive}) => {
    return `<a class="trip-tabs__btn  ${isActive ? `trip-tabs__btn--active` : ``}" href="#">${title}</a>`;
  }).join(``);

  return `<nav class="trip-controls__trip-tabs  trip-tabs">
  ${menuItems}
  </nav>`;
};
