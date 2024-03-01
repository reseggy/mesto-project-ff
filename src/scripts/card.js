import { openPopup, closePopup } from "./modal.js";
import { addLikeRequest, removeLikeRequest, removeCard } from "./api.js";

export const popupConfirm = document.querySelector(".popup_type_confirm");
let cardIdCurrent;
let currentCard;

export function createCard(
  data,
  deleteCallback,
  likeCallback,
  openCallback,
  likesCount,
  userId

) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardId = data._id;

  card.querySelector(".card__title").textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  const deleteButton = card.querySelector(".card__delete-button");

  if (userId !== data.owner._id) {
    deleteButton.classList.add("card__invisible");
  } else {
    deleteButton.classList.remove("card__invisible");
    deleteButton.addEventListener("click", function () {
      deleteCallback(card, cardId);
    });  
  };

  const likeCount = card.querySelector(".card__like-count");
  likeCount.textContent = likesCount;

  likeCallback(data, card);

  const dataLikes = data.likes;
  dataLikes.forEach((like) => {
  if (like._id === userId) {
    const likeButton = card.querySelector(".card__like-button");
    likeButton.classList.add("card__like-button_is-active");
  }
  });

  const openPopup = card.querySelector(".card__image");
  openPopup.addEventListener("click", function () {
    openCallback(data.link, data.name);
  });

  return card;
};

export function toggleLikeHandler(data, card) {
  const likeButton = card.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    const likeMethod = likeButton.classList.contains("card__like-button_is-active") ? removeLikeRequest : addLikeRequest;
    likeMethod(data) 
      .then((result) => {
         likeButton.classList.toggle("card__like-button_is-active"); 
         const likesCount = card.querySelector(".card__like-count"); 
         likesCount.textContent = result.likes.length;
      })
      .catch(err => console.log(err));
  });
};

function handleDeleteCard() {
  const submitButton = popupConfirm.querySelector(".popup__button");
  submitButton.textContent = "Удаление..."; //добавил от себя
  removeCard(cardIdCurrent)
    .then(() => {
      currentCard.remove();
      closePopup(popupConfirm);
    })
    .catch(err => console.log(err))
    .finally(() => {
      submitButton.textContent = "Да";
    });
}

const confirmButton = popupConfirm.querySelector(".popup__button");
confirmButton.addEventListener("click", handleDeleteCard);

export function deleteCard(card, cardId) {
  cardIdCurrent = cardId;
  currentCard = card;
  openPopup(popupConfirm);
};
