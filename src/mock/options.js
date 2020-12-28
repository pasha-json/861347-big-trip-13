import {getRandomInteger} from "../utils/common";

export const generateOptions = () => {
  const optionMocks = [
    {
      name: `Add luggage`,
      type: `luggage`,
      price: `50`,
      isIncluded: Boolean(getRandomInteger(0, 1))
    },
    {
      name: `Switch to comfort`,
      type: `comfort`,
      price: `80`,
      isIncluded: Boolean(getRandomInteger(0, 1))
    },
    {
      name: `Add meal`,
      type: `meal`,
      price: `15`,
      isIncluded: Boolean(getRandomInteger(0, 1))
    },
    {
      name: `Choose seats`,
      type: `seats`,
      price: `5`,
      isIncluded: Boolean(getRandomInteger(0, 1))
    },
    {
      name: `Travel by train`,
      type: `train`,
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
