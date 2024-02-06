import '../pages/index.css';
import {initialCards} from './cards.js';
import './popup.js';
import './formEdit.js';
import './formCard.js';
import { openPopup } from './popup.js';
import { closePopup } from './popup.js';
import { createCard } from './createCard.js';
import { addLike } from './createCard.js';
import { deleteCard } from './createCard.js';

const places = document.querySelector('.places');
const placesList = places.querySelector('.places__list');

export function openCard(link, name){
  const popup = document.querySelector('.popup.popup_type_image');
  const image = document.querySelector('.popup__image');
  const imageDescription = document.querySelector('.popup__caption')
  image.src = link;
  image.alt = name;
  imageDescription.textContent = name;
  openPopup(popup);

  const closeButton = popup.querySelector('.popup__close');
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

