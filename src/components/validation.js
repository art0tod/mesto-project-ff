function checkInputValidity(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.error)
  } else {
    inputElement.setCustomValidity('')
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideInputError(formElement, inputElement)
  }

  toggleButtonState(formElement)
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  )
  inputElement.classList.add('form__input_type_error')
  errorElement.textContent = errorMessage
  errorElement.classList.add('form__input-error_active')
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  )
  inputElement.classList.remove('form__input_type_error')
  errorElement.classList.remove('form__input-error_active')
  errorElement.textContent = ''
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'))

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement)
    })
  })

  toggleButtonState(formElement)
}

function toggleButtonState(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'))
  const buttonElement = formElement.querySelector('.popup__button')

  const hasInvalidInput = inputList.some(
    inputElement => !inputElement.validity.valid
  )

  toggleButtonDisabled(buttonElement, hasInvalidInput)
}

function toggleButtonDisabled(buttonElement, isDisabled) {
  if (isDisabled) {
    buttonElement.classList.add('popup__button__disabled')
    buttonElement.disabled = true
  } else {
    buttonElement.classList.remove('popup__button__disabled')
    buttonElement.disabled = false
  }
}

export function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'))

  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault()
    })
    setEventListeners(formElement)
  })
}

export function clearValidation(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'))

  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement)
  })

  toggleButtonState(formElement)
}
