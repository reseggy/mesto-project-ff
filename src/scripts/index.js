import '../pages/index.css';
import {initialCards} from './cards.js';
import { closePopup } from './modal.js';
import { setPopupListener } from './modal.js';
import { createCard } from './card.js';
import { addLike } from './card.js';
import { deleteCard } from './card.js';
import { openPopup } from './modal.js';


const createCardForm = document.forms.newPlace;
const placesList = document.querySelector('.places__list');
const popupImage = document.querySelector('.popup_type_image');
const image = document.querySelector('.popup__image');
const popupCard = document.querySelector('.popup_type_new-card')
const imageDescription = document.querySelector('.popup__caption');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupEdit = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

addCardButton.addEventListener('click', () => openPopup(popupCard));

editButton.addEventListener('click', () => openPopupEdit(popupEdit));

function openPopupEdit(popup) {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popup);
};

setPopupListener('.popup.popup_type_edit', openPopupEdit);

setPopupListener('.popup.popup_type_new-card');

setPopupListener('.popup.popup_type_image');

function openCard(link, name){
  image.src = link;
  image.alt = name;
  imageDescription.textContent = name;
  openPopup(popupImage);
};

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
};

formEditProfile.addEventListener('submit', submitFormEdit); 

initialCards.forEach(cardData => {
  const cardElements = createCard(cardData, deleteCard, addLike, openCard);
  placesList.append(cardElements);
});