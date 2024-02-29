import '../pages/index.css';

import { closePopup, setPopupListener, openPopup } from './modal.js';
import { createCard, addLike, deleteCard } from './card.js';
import { enableValidation, clearValidation } from './validation.js';
import { editProfile, cardAdd, updateAvatarRequest, getUserName, getCards } from './api.js';

const createCardForm = document.forms.newPlace;
const placesList = document.querySelector('.places__list');
const popupImage = document.querySelector('.popup_type_image');
const image = document.querySelector('.popup__image');
const popupCard = document.querySelector('.popup_type_new-card');
const imageDescription = document.querySelector('.popup__caption');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const popupEdit = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const spinner = document.querySelector('.spinner');
const pageContent = document.querySelector('.page__content');
const editAvatarButton = document.querySelector('.profile__image_button');
const popupEditAvatar = document.querySelector('.popup.popup_type_edit-avatar');
export let userId;

const options = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-inactive',
  inputErrorClass: 'popup__input_error'
};
export function renderLoading(isLoading){ //от себя добавил спиннер, который появляется при загрузке(обновлении) страницы
  if(isLoading){
    spinner.classList.add('spinner_visible');
    pageContent.classList.add('page__content_hidden');
  } else {
    spinner.classList.remove('spinner_visible');
    pageContent.classList.remove('page__content_hidden');
  }
};

addCardButton.addEventListener('click', () => {
  clearValidation(popupCard, options);
  createCardForm.reset();
  openPopup(popupCard);
});

editButton.addEventListener('click', () => openPopupEdit(popupEdit));

function openPopupEdit(popup) {
  clearValidation(popup, options);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popup);
};

setPopupListener('.popup.popup_type_edit');
setPopupListener('.popup.popup_type_new-card');
setPopupListener('.popup.popup_type_image');
setPopupListener('.popup.popup_type_confirm');
setPopupListener('.popup.popup_type_edit-avatar');

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
  const currentId = userId;
  const likesCount = 0;
  // Изменение текста кнопки на "Сохранение..."
  const submitButton = createCardForm.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';
  cardAdd(cardName, cardLink)
    .then(() => {
      const newCard = {
        name: cardName,
        link: cardLink,
        owner: {
          _id: currentId
        } 
      };
      const cardElements = createCard(newCard, deleteCard, addLike, openCard, likesCount);
      placesList.prepend(cardElements);
      clearValidation(createCardForm, options);
      createCardForm.reset();
      submitButton.textContent = 'Сохранить';
      setTimeout(() => {
        getCards()
          .then(res => res.json())
          .then ((result) => {
            result.forEach(cardData => {
              const likesCount = cardData.likes.length;
              const cardElements = createCard(cardData, deleteCard, addLike, openCard, likesCount);
              const cardDataLikes = cardData.likes;
              cardDataLikes.forEach(like => {
                if (like._id === userId){
                  const likeButton = cardElements.querySelector('.card__like-button');
                  likeButton.classList.add('card__like-button_is-active');
                }
              });
              placesList.append(cardElements);
            });
          });
      }, 500); //задержка для точного добавления карточки (иначе если после добавления карточки сразу попытаться удалить ее и обновить страницу, то она останется)
      closePopup(popupCard);
    })
    .catch((error) => {
      console.error('Ошибка при добавлении карточки:', error);
      // Возвращение текста кнопки к исходному состоянию в случае ошибки
      submitButton.textContent = 'Сохранить';
    });
};

createCardForm.addEventListener('submit', addCard);

const formEditProfile = document.forms.editProfile;
const nameInput = formEditProfile.name;
const jobInput = formEditProfile.description;

function submitFormEdit(evt) {
    evt.preventDefault();
    const nameNew = nameInput.value;
    const descriptionNew = jobInput.value;
    const submitButton = formEditProfile.querySelector('.popup__button');
    submitButton.textContent = 'Сохранение...';
    editProfile(nameNew, descriptionNew)
      .then(() => {
        profileTitle.textContent = nameNew;
        profileDescription.textContent = descriptionNew;
        submitButton.textContent = 'Сохранить';
        closePopup(popupEdit);
      })
      .catch((error) => {
        console.error('Ошибка при обновлении аватара:', error);
        // Возвращение текста кнопки к исходному состоянию в случае ошибки
        submitButton.textContent = 'Сохранить';
      });
};

formEditProfile.addEventListener('submit', submitFormEdit); 

enableValidation(options);

export function clearPlacesList() {
  placesList.textContent = '';
};

Promise.all([
  getUserName()
    .then((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
      profileAvatar.style.backgroundImage = `url(${result.avatar})`;
      userId = result._id;
    }), 
  getCards()
    .then ((result) => {
      result.forEach(cardData => {
        const likesCount = cardData.likes.length;
        const cardElements = createCard(cardData, deleteCard, addLike, openCard, likesCount);
        const cardDataLikes = cardData.likes;
        cardDataLikes.forEach(like => {
          if (like._id === userId) {
            const likeButton = cardElements.querySelector('.card__like-button');
            likeButton.classList.add('card__like-button_is-active');
          }
        });
        placesList.append(cardElements);
      });
    })
])
.then(() => {
  setTimeout(() => {
    renderLoading(false);
  }, 500); //добавил только потому что хочу наблюдать, что оно работает и я его делал не зря :)
})
.catch(err => {
  console.error("Произошла ошибка при загрузке данных:", err);
});

editAvatarButton.addEventListener('click', function(){
  clearValidation(formEditAvatar, options);
  formEditAvatar.reset();
  openPopup(popupEditAvatar);
});

const formEditAvatar = document.forms.editAvatar;
const newAvatarLink = formEditAvatar.linkAvatar

formEditAvatar.addEventListener('submit', submitFormEditAvatar)

function submitFormEditAvatar(evt) {
  evt.preventDefault();
  const newAvatar = newAvatarLink.value;
  const submitButton = formEditAvatar.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';
  updateAvatarRequest(newAvatar)
    .then(() => {
      profileAvatar.style.backgroundImage = `url(${newAvatar})`;
      closePopup(popupEditAvatar);
      submitButton.textContent = 'Сохранить';
    })
    .catch((error) => {
      console.error('Ошибка при обновлении аватара:', error);
      // Возвращение текста кнопки к исходному состоянию в случае ошибки
      submitButton.textContent = 'Сохранить';
    });
};