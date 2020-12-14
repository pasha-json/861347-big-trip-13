import {getRandomInteger} from "../utils.js";
import {generateOptions} from "./options.js";
import dayjs from 'dayjs';

const generateType = () => {
  const types = [
    `Taxi`,
    `Bus`,
    `Train`,
    `Ship`,
    `Transport`,
    `Drive`,
    `Flight`,
    `Check-in`,
    `Sightseeing`,
    `Restaurant`
  ];
  const randomIndex = getRandomInteger(0, types.length - 1);
  return types[randomIndex];
};

const generateDestination = () => {
  const cities = [
    `Moscow`,
    `Vladimir`,
    `Smolensk`,
    `Saratov`,
    `Samara`,
    `Vladivostok`,
    `Khabarovsk`,
    `Maykop`,
    `Krasnodar`,
    `Yessentuki`,
    `Orel`
  ];
  const randomIndex = getRandomInteger(0, cities.length - 1);
  return cities[randomIndex];
};

const generateDescription = () => {
  const DESCRIPTION_LENGTH = getRandomInteger(1, 5);

  const sentences = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];

  const description = new Set();

  for (let i = 0; i < DESCRIPTION_LENGTH; i++) {
    description.add(sentences[getRandomInteger(0, sentences.length - 1)]);
  }

  return `${[...description]}`;
};

const generateImages = () => {
  const IMAGES_QUANTITY = getRandomInteger(1, 3);

  const imgLinks = [];
  for (let i = 0; i < IMAGES_QUANTITY; i++) {
    imgLinks.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }

  return imgLinks;
};

const generateDates = () => {
  const DAYS_TO_START = getRandomInteger(1, 6);
  const MAX_TRIP_DURATION_IN_MINUTES = 4320;
  const pointDuration = getRandomInteger(15, MAX_TRIP_DURATION_IN_MINUTES);

  const start = dayjs().add(DAYS_TO_START, `day`).toDate();
  const end = dayjs(start).add(pointDuration, `minute`).toDate();

  return {
    start,
    end
  };
};

const generatePrice = () => {
  const price = getRandomInteger(10, 500);
  return price;
};

export const generatePoint = () => {
  const type = generateType();
  const destination = generateDestination();
  const options = generateOptions();
  const description = generateDescription();
  const images = generateImages();
  const date = generateDates();
  const price = generatePrice();
  const isFavourite = Boolean(getRandomInteger(0, 1));

  return {
    type,
    destination,
    options,
    description,
    images,
    date,
    price,
    isFavourite
  };
};
