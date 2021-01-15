import {getRandomInteger} from "../utils/common";

export const generateOptions = (criteria) => {
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

  // const optionsQuantity = getRandomInteger(0, optionMocks.length);

  // if (optionsQuantity === null) {
  //   return null;
  // }

  // const options = new Set();

  // for (let i = 0; i < optionsQuantity; i++) {
  //   options.add(optionMocks[getRandomInteger(0, optionMocks.length - 1)]);
  // }

  // return [...options];

  // const options = optionMocks.filter(type = `${criteria}`);

  let get = null;

  optionMocks.forEach((elem) => {
    if (elem.type === `${criteria}`) {
      get = elem;
    }
  });

  // console.log(optionMocks[0].type);
  // console.log(criteria);
  // console.log(options);
  // return options;
  return get;
};
