import { deleteCard } from './createCard.js';
import {createCard} from './createCard.js';
import {closePopup} from './popup.js';
import { addLike } from './createCard.js';
import { openCard } from './index.js';

const places = document.querySelector('.places');
const placesList = places.querySelector('.places__list');
const createCardForm = document.forms.newPlace;
console.log(createCardForm);

function addCard(evt){
  evt.preventDefault();
  const popup = document.querySelector('.popup_is-opened')
  const cardName = createCardForm.placeName.value;
  const cardLink = createCardForm.link.value;
  const newCard = {
    name: cardName,
    link: cardLink,
  };
  const cardElements = createCard(newCard, deleteCard, addLike, openCard);
  placesList.prepend(cardElements);
  createCardForm.reset();
  closePopup(popup);
};

createCardForm.addEventListener('submit', addCard);

