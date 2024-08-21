export const createCard = (card, handleImageClick) => {
  const cardTemplate = document.querySelector('#card-template').content
  const cardNode = cardTemplate.querySelector('.card').cloneNode(true)
  const deleteCardButton = cardNode.querySelector('.card__delete-button')
  const cardImage = cardNode.querySelector('.card__image')
  const cardTitle = cardNode.querySelector('.card__title')

  cardImage.src = card.link
  cardImage.alt = card.name
  cardTitle.textContent = card.name

  deleteCardButton.addEventListener('click', deleteCard)
  cardImage.addEventListener('click', handleImageClick)

  return cardNode
}

const deleteCard = evt => {
  const cardElement = evt.target.closest('.card')
  if (cardElement) cardElement.remove()
}
