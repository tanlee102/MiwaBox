"use client";

import React, { createContext, useEffect, useLayoutEffect, useState } from 'react'
import Cookies from 'js-cookie';

export const WindowContext = createContext();

const WindowProvider = ({ children }) => {

  const [displayImageViewer, setDisplayImageViewer] = useState(false);
  const [urlImageViewer, setUrlImageViewer] = useState("")

  const showImageViewer = (url) =>{
      setUrlImageViewer(url);
      setDisplayImageViewer(true);
  }

  return (
    <WindowContext.Provider value={{displayImageViewer, setDisplayImageViewer, 
                                    urlImageViewer, showImageViewer,
                                    }}>
        {children}
    </WindowContext.Provider>
  )
}

export default WindowProvider
