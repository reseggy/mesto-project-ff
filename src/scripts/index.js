import '../pages/index.css';
import {initialCards} from './cards.js';
import './modal.js';
import './formEditProfile.js';
import './card.js'
import { openPopup } from './modal.js';
import { closePopup } from './modal.js';
import { createCard } from './card.js';
import { addLike } from './card.js';
import { deleteCard } from './card.js';
import { newPopup } from './modal.js';

const createCardForm = document.forms.newPlace;
const placesList = document.querySelector('.places__list');
const popup = document.querySelector('.popup.popup_type_image');
const image = document.querySelector('.popup__image');
const imageDescription = document.querySelector('.popup__caption');
const closeButton = popup.querySelector('.popup__close');
popup.classList.add('popup_is-animated');

export function openCard(link, name){
  image.src = link;
  image.alt = name;

  imageDescription.textContent = name;

  openPopup(popup);

  closeButton.addEventListener('click', function() {
    closePopup(popup);
  });

  popup.addEventListener('click', function(evt) {
    if (evt.target === popup) {
      closePopup(popup);
    };
  });
};

initialCards.forEach(cardData => {
  const cardElements = createCard(cardData, deleteCard, addLike, openCard);
  placesList.append(cardElements);
});

newPopup('.profile__edit-button', '.popup.popup_type_edit');

newPopup('.profile__add-button', '.popup.popup_type_new-card');

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