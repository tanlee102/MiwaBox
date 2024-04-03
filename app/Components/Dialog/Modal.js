import React from 'react'
import { useEffect } from 'react';
import { checkHasClass } from '../../helper/checkHasClass';
import { hideMainScrollBar } from '../../helper/hideMainScrollBar';

const Modal = ({displayModal, setDisplayModal, title, body, footer, displayfooter}) => {

    const closeModal = function(event) {
        var x = event.target;
        if(!checkHasClass(x, 'modal-content')){
            setDisplayModal(false);
        }
    };

    useEffect(() => {
      hideMainScrollBar(displayModal);
    }, [displayModal]);

  return (
    <div id="myModal" className="modal" style={{display: displayModal ? "block" : "none"}} onClick={(event) => {closeModal(event)}}>
        <div className="modal-content">
          <div className="modal-header">
            <div>{title}</div>
            <span className="close-modal" onClick={() => setDisplayModal(false)}>&times;</span>
          </div>
          <div className="modal-body">
            {body}
          </div>
          {displayfooter ? <div className="modal-footer">{footer}</div> : ""}
        </div>
    </div>
  )
}

export default Modal
