"use client";

import React, { createContext, useEffect, useLayoutEffect, useState } from 'react'

export const WindowContext = createContext();

const WindowProvider = ({ children }) => {

  const [displayImageViewer, setDisplayImageViewer] = useState(false);
  const [urlImageViewer, setUrlImageViewer] = useState("");
  const [displayModalAddPost, setDisplayModalAddPost] = useState(false);

  const showImageViewer = (url) =>{
      setUrlImageViewer(url);
      setDisplayImageViewer(true);
  }

  return (
    <WindowContext.Provider value={{displayImageViewer, setDisplayImageViewer, 
                                    urlImageViewer, showImageViewer,
                                    displayModalAddPost, setDisplayModalAddPost
                                    }}>
        {children}
    </WindowContext.Provider>
  )
}

export default WindowProvider
