import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { StyledModal } from './style'

// Creates a portal outside the DOM hierarchy
function Portal({ children }) {
  const modalRoot = document.getElementById('modal-root') // A div with id=modal-root in the index.html
  const [element] = useState(document.createElement('div')) // Create a div element which will be mounted within modal-root

  useEffect(() => {
    modalRoot.appendChild(element)

    // cleanup method to remove the appended child
    return function cleanup() {
      modalRoot.removeChild(element)
    }
  }, [modalRoot, element])

  return createPortal(children, element)
}



// A modal component which will be used by other components / pages
const Modal = ({ children, toggle, open, button, action }) => {
  return (
    <Portal>
      {open && (
        <StyledModal.ModalWrapper onClick={toggle}>
          <StyledModal.ModalBody onClick={event => event.stopPropagation()}>
            <StyledModal.CloseButton onClick={toggle}>
              &times;
            </StyledModal.CloseButton>
            {children}
            <StyledModal.Button onClick={action}>
              {button}
          </StyledModal.Button>
          </StyledModal.ModalBody>

        </StyledModal.ModalWrapper>
      )}
    </Portal>
  )
}

export default Modal