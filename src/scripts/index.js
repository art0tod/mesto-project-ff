import { createCard } from '../components/card'
import {
  closeModal,
  closeModalViaOverlay,
  openModal,
} from '../components/modal'
import '../pages/index.css'
import { initialCards } from './cards'

const profileAddButton = document.querySelector('.profile__add-button')
const profileEditButton = document.querySelector('.profile__edit-button')
const popupTypeNewCard = document.querySelector('.popup_type_new-card')
const popupTypeEdit = document.querySelector('.popup_type_edit')
const popupTypeImage = document.querySelector('.popup_type_image')
const popupCloseButtons = document.querySelectorAll('.popup__close')
const placesList = document.querySelector('.places__list')

profileAddButton.addEventListener('click', () => openModal(popupTypeNewCard))
profileEditButton.addEventListener('click', () => openModal(popupTypeEdit))

popupCloseButtons.forEach(button => {
  const popup = button.closest('.popup')
  button.addEventListener('click', () => closeModal(popup))
  closeModalViaOverlay(popup)
})

const handleCardClick = evt => {
  const cardImage = evt.target
  const popupImage = popupTypeImage.querySelector('.popup__image')
  const popupCaption = popupTypeImage.querySelector('.popup__caption')

  popupImage.src = cardImage.src
  popupImage.alt = cardImage.alt
  popupCaption.textContent = cardImage.alt

  openModal(popupTypeImage)
}

initialCards.forEach(card => {
  const cardElement = createCard(card, handleCardClick)
  placesList.append(cardElement)
})
