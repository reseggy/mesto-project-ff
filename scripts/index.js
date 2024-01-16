const places = document.querySelector('.places');
const placesList = places.querySelector('.places__list');

function createCards (initialCards, deleteCallback){
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);
  card.querySelector('.card__title').textContent = initialCards.name;
  card.querySelector('.card__image').src = initialCards.link;
  placesList.append(card);

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function (){
    deleteCallback(card);
  });

  let like = card.querySelector('.card__like-button');
  like.addEventListener('click', function (evt){
    evt.target.classList.toggle('card__like-button_is-active');
  });

  return card;
};

function deleteCard (card) {
  card.remove();
};

initialCards.forEach(cardData => {
  const cardElements = createCards(cardData, deleteCard);
  placesList.append(cardElements);
});