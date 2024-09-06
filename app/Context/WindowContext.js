"use client";

import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { env_SMARTCHAIN } from '../env';
import Cookies from 'js-cookie';
import { RootLayoutContext } from './RootLayoutContext';

export const WindowContext = createContext();

const WindowProvider = ({ children }) => {

  const [currentIndex, setCurrentIndex] = useState(env_SMARTCHAIN.DEFAULT_IDNDEX);

  const [completeCloseRight, setCompleteCloseRight] = useState(null);
  const [completeOpenLeft, setCompleteOpenLeft] = useState(null);

  const {language, setLanguage} = useContext(RootLayoutContext);
  const [notice_pop_state, setNotice_pop_state] = useState(false);

  const [windowWidth, setWindowWidth] = useState(null);
  useEffect(() => {
    const handleResize = () => {
      const newWindowWidth = window.innerWidth;
      if (newWindowWidth !== windowWidth) {
        setWindowWidth(newWindowWidth);
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [windowWidth]);
  useLayoutEffect(() => {
    if(window?.innerWidth) setWindowWidth(window?.innerWidth);
  }, []); 


  useEffect(() => {
    if(windowWidth !== null){

      if(windowWidth < 770 ){
        closeLeft()
      }else{
        showLeft()
      }

      if(windowWidth < 1100 ){
        document.getElementsByClassName('layout-right-box').item(0).style.display = "none";
      }else{
        if(completeCloseRight == false || completeCloseRight == null){
          document.getElementsByClassName('layout-right-box').item(0).style.display = "block";
        }else{
          document.getElementsByClassName('layout-right-box').item(0).style.display = "none";
        }
      }
      
    }
  }, [windowWidth]);



  const closeLeft = () => {
    setCompleteOpenLeft(false)
    document.getElementsByClassName('layout-left-box').item(0).style.transform = "translateX(-100%)";
    document.getElementsByClassName('layout-left-box').item(0).style.position = "absolute";
    document.getElementsByClassName('layout-left-box-overlay').item(0).style.display = "none";
  }

  const showLeft = () => {
    setCompleteOpenLeft(true)
    document.getElementsByClassName('layout-left-box').item(0).style.transform = "translateX(0)";
    if(windowWidth < 770 ){
      document.getElementsByClassName('layout-left-box-overlay').item(0).style.display = "block";
      document.getElementsByClassName('layout-left-box').item(0).style.position = "absolute";
    }else{
      document.getElementsByClassName('layout-left-box-overlay').item(0).style.display = "none";
      document.getElementsByClassName('layout-left-box').item(0).style.position = "relative";
    }
  }


  const closeRight = () => {
    setCompleteCloseRight(true);
    document.getElementsByClassName('layout-right-box').item(0).style.display = "none";
  }

  const showRight = () => {
    setCompleteCloseRight(false)
    document.getElementsByClassName('layout-right-box').item(0).style.display = "block";
  }
  
  return (
    <WindowContext.Provider value={{currentIndex, setCurrentIndex,
                                    closeLeft, closeRight,
                                    showLeft, showRight,
                                    completeOpenLeft,
                                    language, setLanguage, 
                                    notice_pop_state, setNotice_pop_state}}>
        {children}
    </WindowContext.Provider>
  )
}

export default WindowProvider
