const formEditProfile = document.forms.editProfile;
const nameInput = formEditProfile.name;
const jobInput = formEditProfile.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

export function createNewPopup(buttonSelector, popupSelector, openPopup, onOpenCallback) {
  const button = document.querySelector(buttonSelector);
  const popup = document.querySelector(popupSelector);
  popup.classList.add('popup_is-animated');

  button.addEventListener('click', function() {
    if (onOpenCallback) {
      onOpenCallback(); //добавил дополнительную логику для отдельных попапов
    }
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

export function openPopupEdit(popup) {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEsc);
}

export function openPopupNewCard(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEsc);
}

export function openPopupImage(popup){
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEsc);
}



export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEsc);
}

export function closeEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_is-opened');
    if (popupOpen) {
      closePopup(popupOpen);
    }
  }
}