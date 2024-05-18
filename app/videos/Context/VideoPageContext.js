"use client";

import React, { createContext, useState } from 'react'

export const VideoPageContext = createContext();

const VideoPageProvider = ({ children }) => {

  const [folder, setFolder] = useState(null);
  const [vid, setVid] = useState(null);

  return (
    <VideoPageContext.Provider value={{folder, vid, setFolder, setVid}}>
        {children}
    </VideoPageContext.Provider>
  )
}

export default VideoPageProvider
