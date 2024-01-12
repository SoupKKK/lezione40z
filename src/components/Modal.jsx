import React from 'react';
import { Button, Modal as BootstrapModal } from 'react-bootstrap';

const Modal = ({ show, handleClose, title, bodyContent }) => {
  return (
    <div className='modal-container'>
        <BootstrapModal show={show} onHide={handleClose} className="custom-modal">
          <BootstrapModal.Header closeButton>
            <BootstrapModal.Title>{title}</BootstrapModal.Title>
          </BootstrapModal.Header>
          <BootstrapModal.Body>{bodyContent}</BootstrapModal.Body>
          <BootstrapModal.Footer>
            <Button variant="secondary" onClick={handleClose} className="close-button">
              Close
            </Button>
          </BootstrapModal.Footer>
        </BootstrapModal>
    </div>
  );
};

export default Modal;
