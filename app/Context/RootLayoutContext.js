"use client";

import React, { createContext, useEffect, useState } from 'react'

import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { service_url } from '../env_setting';
import Cookies from 'js-cookie';

export const RootLayoutContext = createContext();

const RootLayoutProvider = ({ children }) => {

    const [myUser, setMyUser] = useState(Cookies.get('myuser') ? JSON.parse(Cookies.get('myuser')) : null);
    const [logged, setLogged] = useState(false);

    const [displayMiniProfile, setDisplayMiniProfile] = useState(false);
    const [displayEditUsername, setDisplayEditUsername] = useState(false);
    const [displayImageViewer, setDisplayImageViewer] = useState(false);
    const [urlImageViewer, setUrlImageViewer] = useState("");

    const [language, setLanguage] = useState('en');

    const [showLoading, setShowLoading] = useState(false);

    const loginFunction = async () => {
      setShowLoading(true);
      const firebaseConfig = {
        apiKey: "AIzaSyB3lo_xu7P2Hd5VrKCfcEMhpjW5tF6JmQI",
        authDomain: "miwabox-login.firebaseapp.com",
        projectId: "miwabox-login",
        storageBucket: "miwabox-login.appspot.com",
        messagingSenderId: "773556708155",
        appId: "1:773556708155:web:c3aaa891333b2d5a4a0d1e",
        measurementId: "G-WZ6KLZN22Y"
      };
      
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
    
      try {
        const result = await signInWithPopup(auth, provider);
        const data_user = result.user;
        const url = service_url + '?access_token=' + data_user.accessToken;
    
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        Cookies.set('myuser', JSON.stringify(data), { expires: 7, path: '/' });
        
        setMyUser(data);
        return data;
        
      }catch (error) {
        alert("Error when creating token!");
        return null;
      }finally{
        setShowLoading(false);
      }
    };

    const logout = () => {
      setMyUser(null);
      Cookies.remove('myuser');
    };

    const login = async () => {
      await loginFunction();
    };

    
    useEffect(() => {
      if(myUser?.access_token){
        setLogged(true);
      }else{
        setLogged(false);
      }
    }, [myUser]);
    

    useEffect(() => {
      const cookieLang = Cookies.get('mylang');
      if (cookieLang) {
        setLanguage(cookieLang);
      } else {
        const lang = navigator.language || navigator.userLanguage;
        const isVietnamese = lang.toLowerCase().startsWith('vi');
        setLanguage(isVietnamese ? 'vi' : 'en');
      }
    }, []);

    const showImageViewer = (url) => {
      setUrlImageViewer(url);
      setDisplayImageViewer(true);
    }
    
  return (
    <RootLayoutContext.Provider  value={{ loginFunction, myUser, setMyUser, logged, logout, login,
                                          displayMiniProfile, setDisplayMiniProfile,
                                          displayEditUsername, setDisplayEditUsername, 
                                          displayImageViewer, setDisplayImageViewer, 
                                          urlImageViewer, showImageViewer,
                                          language, setLanguage
    }}>
      {children}
      {showLoading && <div className='spinning-loading-user-info'><div id="spinning-loading-user-info"></div></div>}
    </RootLayoutContext.Provider>
  )
}

export default RootLayoutProvider