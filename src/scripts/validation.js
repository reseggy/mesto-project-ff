function showInputError(formElement, inputElement, errorMessage, options) {
  const popupFormError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(options.inputErrorClass);
  popupFormError.textContent = errorMessage;
}

export function hideInputError(formElement, inputElement, options) {
  const popupFormError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(options.inputErrorClass);
  popupFormError.textContent = "";
}

function checkInputValidation(formElement, inputElement, options) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.error);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      options
    );
  } else {
    hideInputError(formElement, inputElement, options);
  }
}

function setEventListenrs(formElement, options) {
  const inputList = Array.from(
    formElement.querySelectorAll(options.inputSelector)
  );
  const buttonElement = formElement.querySelector(options.submitButtonSelector);
  toggleButton(inputList, buttonElement, options);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidation(formElement, inputElement, options);
      toggleButton(inputList, buttonElement, options);
    });
  });
}

export function enableValidation(options) {
  const formList = Array.from(document.querySelectorAll(options.formSelector));

  formList.forEach((formElement) => {
    setEventListenrs(formElement, options);
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

export function toggleButton(inputList, buttonElement, options) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(options.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(options.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}

export function clearValidation(formElement, options) {
  const inputList = Array.from(
    formElement.querySelectorAll(options.inputSelector)
  );
  const buttonElement = formElement.querySelector(options.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, options);
  });

  toggleButton(inputList, buttonElement, options);
}
