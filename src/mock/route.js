import {getRandomInteger} from "../utils/common";
import dayjs from 'dayjs';

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
