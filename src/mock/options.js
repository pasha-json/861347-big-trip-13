import {getRandomInteger} from "../utils/common";

export const generateOptions = () => {
  const optionMocks = [
    {
      type: `taxi`,
      options: [
        {
          name: `Upgrade to a business class`,
          price: `50`,
          isIncluded: Boolean(getRandomInteger(0, 1))
        },
        {
          name: `Choose the radio station`,
          price: `80`,
          isIncluded: Boolean(getRandomInteger(0, 1))
        }
      ]
    },
    {
      type: `bus`,
      options: [
        {
          name: `Upgrade to a business class`,
          price: `5`,
          isIncluded: Boolean(getRandomInteger(0, 1))
        }
      ]
    },
    {
      type: `train`,
      options: [
        {
          name: `Upgrade to a business class`,
          price: `20`,
          isIncluded: Boolean(getRandomInteger(0, 1))
        },
        {
          name: `Meal on board`,
          price: `15`,
          isIncluded: Boolean(getRandomInteger(0, 1))
        }
      ]
    },
    {
      type: `ship`,
      options: [
        {
          name: `Sea view`,
          price: `50`,
          isIncluded: Boolean(getRandomInteger(0, 1))
        },
        {
          name: `Buffet`,
          price: `80`,
          isIncluded: Boolean(getRandomInteger(0, 1))
        }
      ]
    },
    {
      type: `transport`,
      options: [
        {
          name: `Upgrade to a business class`,
          price: `60`,
          isIncluded: Boolean(getRandomInteger(0, 1))
        }
      ]
    },
    {
      type: `drive`,
      options: [
        {
          name: `Toll road`,
          price: `50`,
          isIncluded: Boolean(getRandomInteger(0, 1))
        }
      ]
    },
    {
      type: `flight`,
      options: [
        {
          name: `Upgrade to a business class`,
          price: `150`,
          isIncluded: Boolean(getRandomInteger(0, 1))
        },
        {
          name: `Priority boarding`,
          price: `80`,
          isIncluded: Boolean(getRandomInteger(0, 1))
        }
      ]
    },
    {
      type: `check-in`,
      options: [
        {
          name: `Early check-in`,
          price: `50`,
          isIncluded: Boolean(getRandomInteger(0, 1))
        }
      ]
    },
    {
      type: `sightseeing`,
      options: [
        {
          name: `English-speaking guide`,
          price: `50`,
          isIncluded: Boolean(getRandomInteger(0, 1))
        },
        {
          name: `Extended route`,
          price: `80`,
          isIncluded: Boolean(getRandomInteger(0, 1))
        }
      ]
    },
    {
      type: `restaurant`,
      options: [
        {
          name: `Choose seat`,
          price: `50`,
          isIncluded: Boolean(getRandomInteger(0, 1))
        },
        {
          name: `Smoking room`,
          price: `80`,
          isIncluded: Boolean(getRandomInteger(0, 1))
        }
      ]
    }
  ];
  return optionMocks;
};
