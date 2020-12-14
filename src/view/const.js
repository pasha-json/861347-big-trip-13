import {getRandomInteger} from "../utils.js";

export const generateFilters = () => {
  const everything = `Everything`;
  const future = `Future`;
  const past = `Past`;
  return {
    everything,
    future,
    past
  };
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
