import '../pages/index.css';
import {initialCards} from './cards.js';
import './modal.js';
import './card.js'
import { openPopupImage } from './modal.js';
import { closePopup } from './modal.js';
import { createCard } from './card.js';
import { addLike } from './card.js';
import { deleteCard } from './card.js';
import { createNewPopup } from './modal.js';
import { openPopupEdit } from './modal.js';
import { openPopupNewCard } from './modal.js';

const createCardForm = document.forms.newPlace;
const placesList = document.querySelector('.places__list');
const popupImage = document.querySelector('.popup.popup_type_image');
const image = document.querySelector('.popup__image');
const popupCard = document.querySelector('.popup_type_new-card')
const imageDescription = document.querySelector('.popup__caption');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupEdit = document.querySelector('.popup_type_edit');
popupImage.classList.add('popup_is-animated');

function openCard(link, name){
  image.src = link;
  image.alt = name;

  imageDescription.textContent = name;

  openPopupImage(popupImage);
};

initialCards.forEach(cardData => {
  const cardElements = createCard(cardData, deleteCard, addLike, openCard);
  placesList.append(cardElements);
});

createNewPopup('.profile__edit-button', '.popup.popup_type_edit', openPopupEdit);

createNewPopup('.profile__add-button', '.popup.popup_type_new-card', openPopupNewCard);

function addCard(evt){
  evt.preventDefault();
  const cardName = createCardForm.placeName.value;
  const cardLink = createCardForm.link.value;
  const newCard = {
    name: cardName,
    link: cardLink
  };
  const cardElements = createCard(newCard, deleteCard, addLike, openCard);
  placesList.prepend(cardElements);
  createCardForm.reset();
  closePopup(popupCard);
};

createCardForm.addEventListener('submit', addCard);


const formEditProfile = document.forms.editProfile;
const nameInput = formEditProfile.name;
const jobInput = formEditProfile.description;



function submitFormEdit(evt) {
    evt.preventDefault();

    const nameNew = nameInput.value;
    const descriptionNew = jobInput.value;

    profileTitle.textContent = nameNew;
    profileDescription.textContent = descriptionNew;

    closePopup(popupEdit);
}

formEditProfile.addEventListener('submit', submitFormEdit); 
