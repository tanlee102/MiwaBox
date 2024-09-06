"use client";

import React, { createContext, useState } from 'react'

export const WindowContext = createContext();

const WindowProvider = ({ children }) => {

  const [displayModalAddPost, setDisplayModalAddPost] = useState(false);

  return (
    <WindowContext.Provider value={{displayModalAddPost, setDisplayModalAddPost}}>
        {children}
    </WindowContext.Provider>
  )
}

export default WindowProvider
