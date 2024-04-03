"use client";

import React, { createContext, useState } from 'react'

import ConfirmBox from '../Components/Dialog/ConfirmBox';

export const LayoutContext = createContext();

const LayoutProvider = ({ children }) => {

    const [layoutState, setLayoutState] = useState(true);

    const [displayConfirm, setDisplayConfirm] = useState(false);
    const [actionConfirm, setActionConfirm] = useState(null);    
    const conFirmFun = (title=null, content=null, fun=null) => {
      setActionConfirm({
        titleBox: title,
        contentBox: content,
        actionFu: fun,
      })
      if(title === null) setDisplayConfirm(false)
      else setDisplayConfirm(true)
    }

  return (
    <LayoutContext.Provider  value={{
                                    conFirmFun, setDisplayConfirm, layoutState, setLayoutState }}>
      <ConfirmBox isDisplay={displayConfirm} setIsDisplay={setDisplayConfirm} objAction={actionConfirm}/>
      {children}
    </LayoutContext.Provider>
  )
}

export default LayoutProvider