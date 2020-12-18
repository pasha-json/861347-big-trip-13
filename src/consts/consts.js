import {getRandomInteger} from "../utils/common";

export const POINT_COUNT = 20;

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
