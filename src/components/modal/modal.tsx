import React, {useEffect} from "react";
import styleModal from './modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "../modal-overlay/modal-overlay";


type TModalProps = JSX.IntrinsicElements["div"] & {
  readonly textHeader?: string;
  readonly onClose: () => void;
};

function Modal({children, textHeader, onClose}: TModalProps) {
  useEffect(() => {
    function onEscape(e: any) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.body.addEventListener("keyup", onEscape);
    return () => {
      document.body.removeEventListener("keyup", onEscape);
    };
  }, [onClose])

  return (
    <ModalOverlay onClick={onClose}>
      <section className={styleModal.modal} onClick={e => e.stopPropagation()}>
        <h1 className={styleModal.header + ' ml-10 mt-10 mr-10 '}>
          <p className={'text_type_main-large'}>{textHeader}</p>
          <button className={styleModal.closeButton} onClick={onClose}>
            <CloseIcon type="primary"/>
          </button>
        </h1>
        {children}
      </section>
    </ModalOverlay>
  );
}

export default Modal;