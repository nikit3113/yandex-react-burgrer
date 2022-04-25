import React from 'react';
import ReactDOM from "react-dom";
import styleModalOver from './modal-overlay.module.css';
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");

function ModalOverlay(props) {
  return ReactDOM.createPortal(
    <div className={styleModalOver.modal}>
      {props.children}
    </div>
    ,
    modalRoot
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ModalOverlay;

