import * as API from '../components/api'
import { createCard } from '../components/card'
import {
  closeModal,
  closeModalViaOverlay,
  openModal,
} from '../components/modal'
import { clearValidation, enableValidation } from '../components/validation'
import '../pages/index.css'

const profileAddButton = document.querySelector('.profile__add-button')
const profileEditButton = document.querySelector('.profile__edit-button')
const popupTypeNewCard = document.querySelector('.popup_type_new-card')
const popupTypeEdit = document.querySelector('.popup_type_edit')
const popupTypeImage = document.querySelector('.popup_type_image')
const popupImage = popupTypeImage.querySelector('.popup__image')
const popupCaption = popupTypeImage.querySelector('.popup__caption')
const popupCloseButtons = document.querySelectorAll('.popup__close')
const placesList = document.querySelector('.places__list')
const editProfileForm = document.forms['edit-profile']
const editProfileName = editProfileForm.name
const editProfileJob = editProfileForm.description
const profileName = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__description')
const profileImage = document.querySelector('.profile__image')
const addCardForm = document.forms['new-place']
const addCardName = addCardForm['place-name']
const addCardURL = addCardForm['link']
const popupAvatarUpdate = document.querySelector('.popup_type_edit-avatar')
const editAvatarForm = document.forms['edit-avatar']
const editAvatarUrl = editAvatarForm.link
let currentUserId = null

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  disabledButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
}

const setLoadingStatus = isLoading => {
  const popup = document.querySelector('.popup_is-opened')

  if (popup) {
    const button = popup.querySelector('.popup__button')

    if (isLoading) {
      button.disabled = true
      button.textContent = 'Сохранение...'
    } else {
      button.disabled = false
      button.textContent = 'Сохранить'
    }
  }
}

profileImage.addEventListener('click', () => {
  openModal(popupAvatarUpdate)
  editAvatarUrl.focus()
})

profileAddButton.addEventListener('click', () => {
  openModal(popupTypeNewCard)
  addCardName.focus()
  clearValidation(addCardForm, validationConfig)
})

profileEditButton.addEventListener('click', () => {
  openModal(popupTypeEdit)
  editProfileName.focus()
  editProfileName.value = profileName.textContent
  editProfileJob.value = profileJob.textContent
  clearValidation(editProfileForm, validationConfig)
})

popupCloseButtons.forEach(button => {
  const popup = button.closest('.popup')
  button.addEventListener('click', () => closeModal(popup))
  closeModalViaOverlay(popup)
})

const handleCardClick = evt => {
  const cardImage = evt.target

  popupImage.src = cardImage.src
  popupImage.alt = cardImage.alt
  popupCaption.textContent = cardImage.alt

  openModal(popupTypeImage)
}

const handleCardLike = (cardId, evt, updateLikes) => {
  API.likeCard(cardId)
    .then(card => {
      updateLikes(card.likes)
    })
    .catch(err => console.error(err))
}

const handleCardUnLike = (cardId, evt, updateLikes) => {
  API.unlikeCard(cardId)
    .then(card => {
      updateLikes(card.likes)
    })
    .catch(err => console.error(err))
}

const handleCardDelete = (cardId, evt) => {
  API.deleteCard(cardId)
    .then(() => {
      const cardElement = evt.target.closest('.card')
      if (cardElement) cardElement.remove()
    })
    .catch(err => console.error(err))
}

const handleCardLikeToggle = (cardId, evt, updateLikes, isLiked) => {
  if (isLiked) {
    API.unlikeCard(cardId)
      .then(card => {
        updateLikes(card.likes)
      })
      .catch(err => console.error(err))
  } else {
    API.likeCard(cardId)
      .then(card => {
        updateLikes(card.likes)
      })
      .catch(err => console.error(err))
  }
}

const initialAPIRequests = () => {
  API.getProfile()
    .then(data => {
      profileName.textContent = data.name
      profileJob.textContent = data.about
      profileImage.style = `background-image: url('${data.avatar}')`

      currentUserId = data._id
    })
    .then(() =>
      API.getCards()
        .then(cards => {
          cards.forEach(card => {
            const cardElement = createCard(
              card,
              handleCardClick,
              handleCardLikeToggle,
              handleCardDelete,
              currentUserId
            )
            placesList.append(cardElement)
          })
        })
        .catch(err => console.error(err))
    )
    .catch(err => console.error(err))
}

const handleEditProfileFormSubmit = evt => {
  evt.preventDefault()

  setLoadingStatus(true)

  const name = editProfileName.value
  const job = editProfileJob.value

  API.editProfile(name, job)
    .then(data => {
      profileName.textContent = data.name
      profileJob.textContent = data.about
    })
    .catch(err => console.error(err))
    .finally(() => {
      setLoadingStatus(false)
      closeModal(popupTypeEdit)
    })
}

const handleAddCardFormSubmit = evt => {
  evt.preventDefault()

  setLoadingStatus(true)

  const name = addCardName.value
  const link = addCardURL.value

  if (currentUserId) {
    API.addCard(name, link)
      .then(data => {
        const cardElement = createCard(
          data,
          handleCardClick,
          handleCardLikeToggle,
          handleCardDelete,
          currentUserId
        )
        placesList.prepend(cardElement)
        addCardForm.reset()
      })
      .catch(err => console.error(err))
      .finally(() => {
        setLoadingStatus(false)
        closeModal(popupTypeNewCard)
      })
  }
}

const handleEditAvatarSubmit = evt => {
  evt.preventDefault()

  setLoadingStatus(true)

  const link = editAvatarUrl.value

  if (currentUserId) {
    API.editAvatar(link)
      .then(data => {
        profileImage.style = `background-image: url('${data.avatar}')`
      })
      .catch(err => console.error(err))
      .finally(() => {
        setLoadingStatus(false)
        closeModal(popupAvatarUpdate)
      })
  }
}

editProfileForm.addEventListener('submit', handleEditProfileFormSubmit)
addCardForm.addEventListener('submit', handleAddCardFormSubmit)
editAvatarForm.addEventListener('submit', handleEditAvatarSubmit)

enableValidation(validationConfig)

initialAPIRequests()
