'use client';

import React, { createContext } from 'react'
import dynamic from 'next/dynamic';

const ImageViewer = dynamic(() => import('../../app/Components/Dialog/ImageViewer.js'), { ssr: false });
const MiniProfile = dynamic(() => import('../../app/Components/Dialog/MiniProfile.js'), { ssr: false });
const EditUserName = dynamic(() => import('../../app/Components/Dialog/EditUserName.js'), { ssr: false });


export const RootClientContext = createContext();

const RootClientProvider = ({ children }) => {

  return (
    <RootClientContext.Provider value={{}}>
        {children}
        <ImageViewer />
        <MiniProfile />
        <EditUserName />
    </RootClientContext.Provider>
  )
}

export default RootClientProvider