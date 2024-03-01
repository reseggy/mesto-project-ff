import { clearPlacesList, renderLoading } from "./index.js";

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-7",
  headers: {
    authorization: "00e3731b-16ed-4f31-85c1-182b124802f6",
    "Content-Type": "application/json",
  },
};

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function editProfile(newName, newDescription) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newDescription
    }),
  })
  .then(handleResponse);
}

export function cardAdd(cardName, cardLink) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    }),
  })
  .then(handleResponse);
}

export function removeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  })
  .then(handleResponse);
}

export function addLikeRequest(data) {
  return fetch(`${config.baseUrl}/cards/likes/${data._id}`, {
    method: "PUT",
    headers: config.headers
  })
  .then(handleResponse);
}

export function removeLikeRequest(data) {
  return fetch(`${config.baseUrl}/cards/likes/${data._id}`, {
    method: "DELETE",
    headers: config.headers
  })
  .then(handleResponse);
}

export function updateAvatarRequest(newAvatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: newAvatar
    }),
  })
  .then(handleResponse);
}

export function getUserName() {
  renderLoading(true);
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers
  })
  .then(handleResponse);
}

export function getCards() {
  clearPlacesList(); //Без очистки при добавлении карточки все карточки продублируются
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers
  })
  .then(handleResponse);
}
