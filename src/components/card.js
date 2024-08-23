export const createCard = (
  card,
  handleImageClick,
  handleCardLike,
  handleCardDelete
) => {
  const cardTemplate = document.querySelector('#card-template').content
  const cardNode = cardTemplate.querySelector('.card').cloneNode(true)
  const deleteCardButton = cardNode.querySelector('.card__delete-button')
  const cardImage = cardNode.querySelector('.card__image')
  const cardTitle = cardNode.querySelector('.card__title')
  const cardLikeButton = cardNode.querySelector('.card__like-button')

  cardImage.src = card.link
  cardImage.alt = card.name
  cardTitle.textContent = card.name

  deleteCardButton.addEventListener('click', handleCardDelete)
  cardImage.addEventListener('click', handleImageClick)
  cardLikeButton.addEventListener('click', handleCardLike)

  return cardNode
}

export const deleteCard = evt => {
  const cardElement = evt.target.closest('.card')
  if (cardElement) cardElement.remove()
}
