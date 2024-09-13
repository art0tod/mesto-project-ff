function checkInputValidity(formElement, inputElement, config) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.error)
  } else {
    inputElement.setCustomValidity('')
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    )
  } else {
    hideInputError(formElement, inputElement, config)
  }

  toggleButtonState(formElement, config)
}

function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  )
  inputElement.classList.add(config.inputErrorClass)
  errorElement.textContent = errorMessage
  errorElement.classList.add(config.errorClass)
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  )
  inputElement.classList.remove(config.inputErrorClass)
  errorElement.classList.remove(config.errorClass)
  errorElement.textContent = ''
}

function setEventListeners(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  )

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config)
    })
  })

  toggleButtonState(formElement, config)
}

function toggleButtonState(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  )
  const buttonElement = formElement.querySelector(config.submitButtonSelector)

  const hasInvalidInput = inputList.some(
    inputElement => !inputElement.validity.valid
  )

  toggleButtonDisabled(buttonElement, hasInvalidInput, config)
}

function toggleButtonDisabled(buttonElement, isDisabled, config) {
  if (isDisabled) {
    buttonElement.classList.add(config.disabledButtonClass)
    buttonElement.disabled = true
  } else {
    buttonElement.classList.remove(config.disabledButtonClass)
    buttonElement.disabled = false
  }
}

export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector))

  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault()
    })
    setEventListeners(formElement, config)
  })
}

export function clearValidation(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  )

  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, config)
  })

  toggleButtonState(formElement, config)
}
