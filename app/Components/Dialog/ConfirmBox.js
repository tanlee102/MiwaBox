import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { hideMainScrollBar } from '../../helper/hideMainScrollBar';

const ConfirmBox = ({isDisplay,setIsDisplay,objAction}) => {

  useEffect(() => {
    hideMainScrollBar(isDisplay);
  }, [isDisplay]);

  return (
    <div  className={isDisplay ? "dialog-confirm active-confirm" : "dialog-confirm"}>
        {objAction ? 
        <div>
            <div>
            <header>
              <h3> {objAction.titleBox} </h3>
              <i className="fa fa-close" aria-hidden="true" onClick={() => setIsDisplay(false)}></i>
            </header>

            <div className="dialog-msg"> 
              {objAction.contentBox ? <p dangerouslySetInnerHTML={{ __html: String(objAction.contentBox)}}></p> : ""} 
              {objAction.contentBox ? "" : 
              <div className="snippet" data-title=".dot-flashing">
                <div className="stage">
                  <div className="dot-flashing"></div>
                </div>
              </div>
              }

            </div>
            
            {objAction.contentBox ? 
            <footer>
                <div className="controls"> 
                    <button className="button button-danger doAction" onClick={() => {objAction.actionFu ? objAction.actionFu() : setIsDisplay(false)}}>Vâng</button>  
                    {objAction.actionFu ? <button className="button button-default cancelAction" onClick={() => setIsDisplay(false)}>Hủy</button>  : ""}
                </div>
            </footer>
            : ""}
            </div>
        </div>
        : ""}
    </div>
  )
}

export default ConfirmBox
