import dayjs from "dayjs";
import {Filters} from "../consts/consts";

const isPointPast = (endDate) => {
  return dayjs().isAfter(endDate);
};

const isPointFuture = (startDate) => {
  const currentDate = dayjs();
  return currentDate.isSame(startDate)
    || currentDate.isBefore(startDate);
};

export const filter = {
  [Filters.EVERYTHING]: (points) => points,
  [Filters.FUTURE]: (points) => points.filter((point) => isPointFuture(point.date.start)),
  [Filters.PAST]: (points) => points.filter((point) => isPointPast(point.date.end)),
};
