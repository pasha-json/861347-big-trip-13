export const createRouteTemplate = (data) => {

  if (Object.keys(data).length !== 0) {
    const {firstPoint, secondPoint, lastPoint, firstDay, lastDay, firstMonth, lastMonth} = data;
    const secondMonth = lastMonth === firstMonth ? `` : `${lastMonth}`;

    return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${firstPoint} &mdash; ${secondPoint} &mdash; ${lastPoint}</h1>

    <p class="trip-info__dates">${firstMonth} ${firstDay}&nbsp;&mdash;&nbsp;${secondMonth}&nbsp;${lastDay}</p>
  </div>
</section>`;
  }
  return ``;
};
