import {getRandomInteger} from "./utils.js";

export const generateOptions = () => {
  const optionMocks = [
    {
      name: `Add luggage`,
      price: `50`,
      isIncluded: Boolean(getRandomInteger(0, 1))
    },
    {
      name: `Switch to comfort`,
      price: `80`,
      isIncluded: Boolean(getRandomInteger(0, 1))
    },
    {
      name: `Add meal`,
      price: `15`,
      isIncluded: Boolean(getRandomInteger(0, 1))
    },
    {
      name: `Choose seats`,
      price: `5`,
      isIncluded: Boolean(getRandomInteger(0, 1))
    },
    {
      name: `Travel by train`,
      price: `40`,
      isIncluded: Boolean(getRandomInteger(0, 1))
    }
  ];

  const optionsQuantity = getRandomInteger(0, optionMocks.length);

  if (optionsQuantity === null) {
    return null;
  }

  const options = new Set();

  for (let i = 0; i < optionsQuantity; i++) {
    options.add(optionMocks[getRandomInteger(0, optionMocks.length - 1)]);
  }

  return [...options];

};
