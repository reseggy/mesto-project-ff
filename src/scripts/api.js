import { clearPlacesList, renderLoading } from "./index.js";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-7',
  headers: {
    authorization: '00e3731b-16ed-4f31-85c1-182b124802f6',
    'Content-Type': 'application/json'
  }
}

export function editProfile(newName, newDescription){
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newDescription
    })
  })
};

export function cardAdd(cardName, cardLink){
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
};

export function removeCard(cardId){
  fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
};

export function addLikeRequest(data, card){
  fetch(`${config.baseUrl}/cards/likes/${data._id}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => res.json())
  .then((result) => {
    const likesCount = card.querySelector('.card__like-count');
    likesCount.textContent = result.likes.length;
  })
};

export function removeLikeRequest(data, card){
  fetch(`${config.baseUrl}/cards/likes/${data._id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => res.json())
  .then((result) => {
    const likesCount = card.querySelector('.card__like-count');
    likesCount.textContent = result.likes.length;
  })
  .catch((err) => console.log(err))
};

export function updateAvatarRequest(newAvatar){
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newAvatar
    })
  })
};

export function getUserName(){
  renderLoading(true);
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })

};

export function getCards(){
  clearPlacesList(); //Без очистки при добавлении карточки все карточки продублируются
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
};
