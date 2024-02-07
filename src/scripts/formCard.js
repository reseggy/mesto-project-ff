import { deleteCard } from './card.js';
import {createCard} from './card.js';
import {closePopup} from './modal.js';
import { addLike } from './card.js';
import { openCard } from './index.js';

const places = document.querySelector('.places');
const placesList = places.querySelector('.places__list');
const createCardForm = document.forms.newPlace;

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

