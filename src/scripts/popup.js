export function closeEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_is-opened');
    if (popupOpen) {
      closePopup(popupOpen);
    }
  }
}

export function openPopup(popup) {
  popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEsc);
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEsc);
}

export function newPopup(buttonSelector, popupSelector) {
  const button = document.querySelector(buttonSelector);
  const popup = document.querySelector(popupSelector);

  button.addEventListener('click', function() {
    openPopup(popup);
  });

  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', function() {
    closePopup(popup);
  });

  popup.addEventListener('click', function(evt) {
    if (evt.target === popup) {
      closePopup(popup);
    };
  });
};

newPopup('.profile__edit-button', '.popup.popup_type_edit');

newPopup('.profile__add-button', '.popup.popup_type_new-card');




