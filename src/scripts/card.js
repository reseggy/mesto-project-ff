export function createCard (data, deleteCallback, likeCallback, openCallback){
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
  like.addEventListener('click', likeCallback);

  const openPopup = card.querySelector('.card__image');
  openPopup.addEventListener('click', function(){
    openCallback(data.link, data.name)
  });

  return card;
};

export function addLike(evt){
  evt.target.classList.toggle('card__like-button_is-active');
}

export function deleteCard(card) {
  card.remove();
};

