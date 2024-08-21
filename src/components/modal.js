export const openModal = modal => {
  modal.classList.add('popup_is-opened')
  document.addEventListener('keydown', handleEscape)
}

export const closeModal = modal => {
  modal.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', handleEscape)
}

const handleEscape = evt => {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.popup_is-opened')
    if (openedModal) closeModal(openedModal)
  }
}

export const closeModalViaOverlay = modal => {
  modal.addEventListener('click', evt => {
    if (evt.target === modal) closeModal(modal)
  })
}
