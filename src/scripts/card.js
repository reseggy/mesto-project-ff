const popupConfirm = document.querySelector(".popup.popup_type_confirm");

import { userId } from "./index.js";
import { openPopup, closePopup } from "./modal.js";
import { addLikeRequest, removeLikeRequest, removeCard } from "./api.js";

export function createCard(
  data,
  deleteCallback,
  likeCallback,
  openCallback,
  likesCount
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardId = data._id;

  card.querySelector(".card__title").textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  const deleteButton = card.querySelector(".card__delete-button");

  if (!(userId === data.owner._id)) {
    deleteButton.classList.add("card__invisible");
  } else {
    deleteButton.classList.remove("card__invisible");
  }

  deleteButton.addEventListener("click", function () {
    deleteCallback(card, cardId);
  });

  const likeCount = card.querySelector(".card__like-count");
  likeCount.textContent = likesCount;

  likeCallback(data, card);

  const openPopup = card.querySelector(".card__image");
  openPopup.addEventListener("click", function () {
    openCallback(data.link, data.name);
  });

  return card;
}

export function addLike(data, card) {
  const likeButton = card.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    if (likeButton.classList.contains("card__like-button_is-active")) {
      removeLikeRequest(data)
        .then((result) => {
          const likesCount = card.querySelector(".card__like-count");
          likesCount.textContent = result.likes.length;
        })
        .catch((err) => console.log(err));
      likeButton.classList.remove("card__like-button_is-active");
    } else {
      addLikeRequest(data).then((result) => {
        const likesCount = card.querySelector(".card__like-count");
        likesCount.textContent = result.likes.length;
      });
      likeButton.classList.add("card__like-button_is-active");
    }
  });
}

export function deleteCard(card, cardId) {
  openPopup(popupConfirm);
  const confirmButton = popupConfirm.querySelector(".popup__button");
  confirmButton.addEventListener("click", function handleDeleteCard() {
    removeCard(cardId);
    card.remove();
    closePopup(popupConfirm);
    confirmButton.removeEventListener("click", handleDeleteCard); // Удаление обработчика после выполнения удаления карточки, чтобы при удалении нескольких карточек подряд не посылались запросы предыдущих(уже удаленных карточек)
  });
}
