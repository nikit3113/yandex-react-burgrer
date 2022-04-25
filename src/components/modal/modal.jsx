import React from "react";
import PropTypes from "prop-types";
import styleModal from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");

function Modal(props) {
  const { children, textHeader, onClose } = props;

  return (
    <ModalOverlay>
      <section className={styleModal.modal}>
        <header className={styleModal.header + ' ml-10 mt-10 mr-10 '}>
          <p className={'text_type_main-large'}>{textHeader}</p>
          <button className={styleModal.closeButton} onClick={onClose}>
            <CloseIcon type="primary"/>
          </button>
        </header>
        {children}
      </section>
    </ModalOverlay>
  );
}

Modal.propTypes = {
  textHeader: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Modal;
