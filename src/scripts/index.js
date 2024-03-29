import "../pages/index.css";

import { closePopup, setPopupListeners, openPopup } from "./modal.js";
import { createCard, toggleLikeHandler, deleteCard, popupConfirm } from "./card.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  editProfile,
  cardAdd,
  updateAvatarRequest,
  getUserName,
  getCards,
} from "./api.js";

const formEditProfile = document.forms.editProfile;
const createCardForm = document.forms.newPlace;
const formEditAvatar = document.forms.editAvatar;
const placesList = document.querySelector(".places__list");
const popupImage = document.querySelector(".popup_type_image");
const popupCard = document.querySelector(".popup_type_new-card");
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
const popupEdit = document.querySelector(".popup_type_edit");
const image = document.querySelector(".popup__image");
const imageDescription = document.querySelector(".popup__caption");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const editButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const spinner = document.querySelector(".spinner");
const pageContent = document.querySelector(".page__content");
const editAvatarButton = document.querySelector(".profile__image_button");

export let userId;

const options = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button-inactive",
  inputErrorClass: "popup__input_error",
};
export function renderLoading(isLoading) {
  //от себя добавил спиннер, который появляется при загрузке(обновлении) страницы
  if (isLoading) {
    spinner.classList.add("spinner_visible");
    pageContent.classList.add("page__content_hidden");
  } else {
    spinner.classList.remove("spinner_visible");
    pageContent.classList.remove("page__content_hidden");
  }
}

addCardButton.addEventListener("click", () => {
  clearValidation(createCardForm, options);
  createCardForm.reset();
  openPopup(popupCard);
});

editButton.addEventListener("click", () => openPopupEdit(popupEdit));

function openPopupEdit(popup) {
  clearValidation(formEditProfile, options);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popup);
}

setPopupListeners(popupEdit);
setPopupListeners(popupCard);
setPopupListeners(popupImage);
setPopupListeners(popupConfirm);
setPopupListeners(popupEditAvatar);

function openCard(link, name) {
  image.src = link;
  image.alt = name;
  imageDescription.textContent = name;
  openPopup(popupImage);
}

function addCard(evt) {
  evt.preventDefault();
  const cardName = createCardForm.placeName.value;
  const cardLink = createCardForm.link.value;
  const likesCount = 0;
  // Изменение текста кнопки на "Сохранение..."
  const submitButton = createCardForm.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";
  cardAdd(cardName, cardLink)
    .then((res) => {
      const cardElements = createCard(
        res,
        deleteCard,
        toggleLikeHandler,
        openCard,
        likesCount,
        userId
      );
      placesList.prepend(cardElements);
      clearValidation(createCardForm, options);
      createCardForm.reset();
      closePopup(popupCard);
    })
    .catch((error) => {
      console.error("Ошибка при добавлении карточки:", error);
    })
    .finally(() => {
      submitButton.textContent = "Сохранить";
    })
}

createCardForm.addEventListener("submit", addCard);


const nameInput = formEditProfile.name;
const jobInput = formEditProfile.description;

function submitFormEdit(evt) {
  evt.preventDefault();
  const nameNew = nameInput.value;
  const descriptionNew = jobInput.value;
  const submitButton = formEditProfile.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";
  editProfile(nameNew, descriptionNew)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;

      closePopup(popupEdit);
    })
    .catch((error) => {
      console.error("Ошибка при обновлении аватара:", error);
    })
    .finally(() => {
      submitButton.textContent = "Сохранить";
    })
}

formEditProfile.addEventListener("submit", submitFormEdit);

enableValidation(options);

export function clearPlacesList() {
  placesList.textContent = "";
}

Promise.all([getUserName(), getCards()])
  .then(([user, cards]) => {
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileAvatar.style.backgroundImage = `url(${user.avatar})`;
    userId = user._id;
    cards.forEach((cardData) => {
      const likesCount = cardData.likes.length;
      const cardElement = createCard(
        cardData,
        deleteCard,
        toggleLikeHandler,
        openCard,
        likesCount,
        userId
      );
      placesList.append(cardElement);

    });
  })
  .then(() => {
    renderLoading(false);
  })
  .catch((err) => {
    console.error("Произошла ошибка при загрузке данных:", err);
  });

editAvatarButton.addEventListener("click", function () {
  clearValidation(formEditAvatar, options);
  formEditAvatar.reset();
  openPopup(popupEditAvatar);
});

const newAvatarLink = formEditAvatar.linkAvatar;

formEditAvatar.addEventListener("submit", submitFormEditAvatar);

function submitFormEditAvatar(evt) {
  evt.preventDefault();
  const newAvatar = newAvatarLink.value;
  const submitButton = formEditAvatar.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";
  updateAvatarRequest(newAvatar)
    .then(() => {
      profileAvatar.style.backgroundImage = `url(${newAvatar})`;
      closePopup(popupEditAvatar);
    })
    .catch((error) => {
      console.error("Ошибка при обновлении аватара:", error);
    })
    .finally(() => {
      submitButton.textContent = "Сохранить";
    })
}
