import React from 'react';
import ReactDOM from "react-dom";
import styleModalOver from './modal-overlay.module.css';


const modalRoot = document.getElementById("react-modals");

type TModalOverlayProps = JSX.IntrinsicElements["div"] & {
  onClick: () => void;
};

function ModalOverlay({children, onClick}: TModalOverlayProps) {
  return modalRoot ? ReactDOM.createPortal(
    <div className={styleModalOver.modal} onClick={onClick}>
      {children}
    </div>
    ,
    modalRoot
  ) : null;
}

export default ModalOverlay;