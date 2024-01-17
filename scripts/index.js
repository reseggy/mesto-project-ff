const places = document.querySelector('.places');
const placesList = places.querySelector('.places__list');

function createCard (data, deleteCallback){
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  card.querySelector('.card__title').textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name; 

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function (){
    deleteCallback(card);
  });

  const like = card.querySelector('.card__like-button');
  like.addEventListener('click', function (evt){
    evt.target.classList.toggle('card__like-button_is-active');
  });

  return card;
};

function deleteCard (card) {
  card.remove();
};

initialCards.forEach(cardData => {
  const cardElements = createCard(cardData, deleteCard);
  placesList.append(cardElements);
});