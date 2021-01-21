import {getRandomInteger} from "../utils/common";

export const POINT_COUNT = 4;

export const Filters = {
  EVERYTHING: `Everything`,
  FUTURE: `Future`,
  PAST: `Past`
};

export const generateMenu = () => {
  const flag = Boolean(getRandomInteger(0, 1));
  const items = [
    {
      title: `Table`,
      isActive: flag
    },
    {
      title: `Stats`,
      isActive: !flag
    }
  ];
  return {
    items
  };
};

export const SortType = {
  DAY: `day`,
  TIME: `time`,
  PRICE: `price`
};

export const UserAction = {
  UPDATE_POINT: `UPDATE_POINT`,
  ADD_POINT: `ADD_POINT`,
  DELETE_POINT: `DELETE_POINT`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

