import dayjs from "dayjs";
// import {generateOptions} from "../../mock/options";

// const options = generateOptions();

// const createTypeList = (points) => {
//   return Array.from(points).map(({type}) => {
//     return `<div class="event__type-item">
//     <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}">
//     <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-taxi-1">${type}</label>
//   </div>`;
//   }).join(``);
// };

// const createDestinationList = (points) => {
//   return Array.from(points).map(({destination}) => {
//     return `<option value="${destination}"></option>`;
//   }).join(``);
// };

// const createOptionsList = (features) => {
//   return Array.from(features).map(({type, name, price, isIncluded}) => {
//     return `<div class="event__offer-selector">
//     <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1" type="checkbox" name="event-offer-${type}" ${isIncluded ? `checked` : ``}>
//     <label class="event__offer-label" for="event-offer-${type}-1">
//       <span class="event__offer-title">${name}</span>
//       &plus;&euro;&nbsp;
//       <span class="event__offer-price">${price}</span>
//     </label>
//   </div>`;
//   }).join(``);
// };

// export const createAddFormTemplate = (points = {}) => {

//   const {type, destination, date, price, description, images} = points;
//   const typeName = type.toLowerCase();
//   const {start, end} = date;

//   const createImgList = (arr) => {
//     return arr.map((elem) => {
//       return `<img class="event__photo" src="${elem}" alt="Event photo">`;
//     }).join(``);
//   };

//   const typeList = createTypeList(points);
//   const destinationList = createDestinationList(points);
//   const optionsList = createOptionsList(options);
//   const imgList = createImgList(images);

//   return `<li class="trip-events__item">
//     <form class="event event--edit" action="#" method="post">
//       <header class="event__header">
//         <div class="event__type-wrapper">
//           <label class="event__type  event__type-btn" for="event-type-toggle-1">
//             <span class="visually-hidden">Choose event type</span>
//             <img class="event__type-icon" width="17" height="17" src="img/icons/${typeName}.png" alt="Event type icon">
//           </label>
//           <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

//           <div class="event__type-list">
//             <fieldset class="event__type-group">
//               <legend class="visually-hidden">Event type</legend>
//                 ${typeList}
//             </fieldset>
//           </div>
//         </div>

//         <div class="event__field-group  event__field-group--destination">
//           <label class="event__label  event__type-output" for="event-destination-1">
//           ${type}
//           </label>
//           <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
//           <datalist id="destination-list-1">
//             ${destinationList}
//           </datalist>
//         </div>

//         <div class="event__field-group  event__field-group--time">
//           <label class="visually-hidden" for="event-start-time-1">From</label>
//           <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(start).format(`DD/MM/YY HH:MM`)}">
//           &mdash;
//           <label class="visually-hidden" for="event-end-time-1">To</label>
//           <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(end).format(`DD/MM/YY HH:MM`)}">
//         </div>

//         <div class="event__field-group  event__field-group--price">
//           <label class="event__label" for="event-price-1">
//             <span class="visually-hidden">Price</span>
//             &euro;
//           </label>
//           <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
//         </div>

//         <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
//         <button class="event__reset-btn" type="reset">Cancel</button>
//       </header>
//       <section class="event__details">
//         <section class="event__section  event__section--offers">
//           <h3 class="event__section-title  event__section-title--offers">Offers</h3>

//           <div class="event__available-offers">
//           ${optionsList}
//           </div>
//         </section>

//         <section class="event__section  event__section--destination">
//           <h3 class="event__section-title  event__section-title--destination">Destination</h3>
//           <p class="event__destination-description">${description}</p>

//           <div class="event__photos-container">
//             <div class="event__photos-tape">
//             ${imgList}
//             </div>
//           </div>
//         </section>
//       </section>
//     </form>
//   </li>`;
// };

const createTypeList = (types) => {

  return Array.from(types).map((type) => {
    const typeName = type.toLowerCase();
    return `<div class="event__type-item">
    <input id="event-type-${typeName}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeName}">
    <label class="event__type-label  event__type-label--${typeName}" for="event-type-${typeName}-1">${type}</label>
  </div>`;
  }).join(``);
};

const createDestinationList = (cities) => {
  return Array.from(cities).map((city) => {
    return `<option value="${city}"></option>`;
  }).join(``);
};

const createOptionsList = ({type, options}) => {
  return Array.from(options).map(({name, price, isIncluded}) => {
    return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1" type="checkbox" name="event-offer-${type}" ${isIncluded ? `checked` : ``}>
    <label class="event__offer-label" for="event-offer-${type}-1">
      <span class="event__offer-title">${name}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`;
  }).join(``);
};
const createImagesBlock = (images) => {
  if (images) {
    return `<div class="event__photos-container">
  <div class="event__photos-tape">
    ${
  images.map((url) => {
    return `<img class="event__photo" src="${url}" alt="Event photo"></img>`;
  }).join(``)}
  </div>
</div>`;
  }
  return null;
};

export const createAddFormTemplate = (data = {}, types, destinations, options) => {

  const {type, destination, date, price, description, images} = data;
  let typeName = null;
  if (type) {
    typeName = type.toLowerCase();
  } else {
    typeName = type;
  }
  const {start, end} = date;

  const typeList = createTypeList(types);
  const destinationList = createDestinationList(destinations);

  let offers = null;

  options.forEach((elem) => {
    if (elem.type === `${type.toLowerCase()}`) {
      offers = elem;
    }
  });

  const optionsList = createOptionsList(offers);
  const imagesBlock = createImagesBlock(images);

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${typeName}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${typeList}

          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${destinationList}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(start).format(`DD/MM/YY HH:MM`)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(end).format(`DD/MM/YY HH:MM`)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${optionsList}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
        ${imagesBlock}
      </section>
    </section>
  </form>
</li>`;
};
