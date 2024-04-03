import { WindowContext } from '@/app/Context/WindowContext'
import React, { useContext } from 'react'

const ImageViewer = () => {

  const {displayImageViewer, setDisplayImageViewer, urlImageViewer} = useContext(WindowContext)

  if(displayImageViewer){
    return (
      <div className='image-viewer'>
          <span className='close-image-viewer' onClick={() => {setDisplayImageViewer(false)}}>
            <svg viewBox="0 0 24 24">
                <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <div className='img-image-viewer'>
            <img src={urlImageViewer} />
          </div>
          <div className='overlay-image-viewer'></div>
      </div>
    )
  }else{
    return (
      <></>
    )
  }
}

export default ImageViewer
