const config = {
  formSelector: ".intro__form",
  inputSelector: ".intro__input",
  submitButtonSelector: ".intro__submit",
  inactiveButtonClass: "intro__submit_disabled",
  inputError: "intro__input_type_error",
  errorClass: "intro__error_active",
};

const buttonElement = document.querySelector(config.submitButtonSelector);

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id} + .intro__error`);
  inputElement.classList.add(config.inputError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id} + .intro__error`);
  inputElement.classList.remove(config.inputError);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
      hideInputError(formElement, inputElement, config);
  }
};

const setEventListener = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
          isValid(formElement, inputElement, config);

          toggleButtonState(inputList, buttonElement, config);
      });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
      disableButton(buttonElement, config);
  } else {
      enableButton(buttonElement, config);
  }
};

function disableButton(button, config) {
  button.classList.add(config.inactiveButtonClass);
  button.disabled = true;
}

function enableButton(button, config) {
  button.classList.remove(config.inactiveButtonClass);
  button.disabled = false;
}

const enableValidation = (config) => {
  const formList = document.querySelector(config.formSelector);

  formList.addEventListener("submit", (evt) => {
      evt.preventDefault();
  });
  setEventListener(formList, config);
};

enableValidation(config);
