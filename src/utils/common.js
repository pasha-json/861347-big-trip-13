import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRouteDuration = (start, end) => {
  const diff = dayjs(end).diff(dayjs(start));
  const dd = dayjs.duration(diff).days().toString();
  const hh = dayjs.duration(diff).hours().toString();
  const mm = dayjs.duration(diff).minutes().toString();

  return `${dd > 0 ? dd + `D` : ``} ${hh > 0 ? hh.padStart(2, `0`) + `H` : ``} ${mm.padStart(2, `0`)}M`;
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const isEscKeyPressed = (evt) => {
  return evt.key === `Escape` || evt.key === `Esc`;
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

const getTime = (startDate, endDate) => dayjs(endDate).diff(startDate);

export const sortByDate = (a, b) => {
  if (dayjs(a.date.start).isBefore(b.date.start)) {
    return -1;
  }

  if (dayjs(a.date.start).isAfter(b.date.start)) {
    return 1;
  }

  return 0;
};

export const sortByPrice = (a, b) => {
  if (a.price < b.price) {
    return 1;
  }

  if (a.price > b.price) {
    return -1;
  }

  return 0;
};

export const sortByTime = (a, b) => {
  const timeFirst = getTime(a.date.start, a.date.end);

  const timeLast = getTime(b.date.start, b.date.end);

  if (timeFirst < timeLast) {
    return 1;
  }

  if (timeFirst > timeLast) {
    return -1;
  }

  return 0;
};

export const generateTotalCost = (points) => {
  let totalCost = 0;
  for (let i = 0; i < points.length; i++) {
    totalCost += points[i].price;
  }
  return totalCost;
};

export const generateRouteInfo = (points) => {
  const firstPointIndex = 0;
  const middlePointIndex = getRandomInteger(0, points.length - 2);
  const lastPointIndex = points.length - 1;

  const firstPoint = points[firstPointIndex].destination;
  const secondPoint = points[middlePointIndex].destination;
  const lastPoint = points[lastPointIndex].destination;

  let dates = [];
  points.map(({date}) => {
    dates.push(date.start);
    dates.push(date.end);
  });

  const maxDate = new Date(Math.max.apply(null, dates));
  const minDate = new Date(Math.min.apply(null, dates));

  const firstDay = dayjs(minDate).format(`DD`);
  const lastDay = dayjs(maxDate).format(`DD`);

  const firstMonth = dayjs(minDate).format(`MMM`);
  const lastMonth = dayjs(maxDate).format(`MMM`);

  return {
    firstPoint,
    secondPoint,
    lastPoint,
    firstDay,
    lastDay,
    firstMonth,
    lastMonth
  };
};
