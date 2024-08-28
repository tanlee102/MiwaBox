'use client';

import React, { useContext } from 'react'

import { AccountContext } from '@/app/Context/AccountContext';
import { WindowContext } from '@/app/Context/WindowContext';
import { env_LANG } from '@/app/env_lang';

const MiniProfile = ({isDisplay,setIsDisplay, setDisplayEditUsername, user}) => {

    const {logout} = useContext(AccountContext);
    const {language} = useContext(WindowContext)

  return (
    <>
    {user ?
    <div className={isDisplay ? "dialog-mini-profile dialog-confirm active-confirm" : "dialog-confirm"}>
        <div>
            <div>
                <header>
                    <h3>Google</h3>
                    <i className="fa fa-close" aria-hidden="true" onClick={() => setIsDisplay(false)}></i>
                </header>
                <div className="dialog-msg mini-profile-dialog"> 
                    <div><img src={user?.photoURL}/></div>
                    <div id='button-display-edit-username'>
                        {user?.displayName}
                        <svg onClick={() => {setDisplayEditUsername(true); setIsDisplay(false);}} viewBox="0 0 24 24">
                            <rect id="view-box" width="24" height="24" fill="none"/>
                            <path id="Shape" d="M.75,17.5A.751.751,0,0,1,0,16.75V12.569a.755.755,0,0,1,.22-.53L11.461.8a2.72,2.72,0,0,1,3.848,0L16.7,2.191a2.72,2.72,0,0,1,0,3.848L5.462,17.28a.747.747,0,0,1-.531.22ZM1.5,12.879V16h3.12l7.91-7.91L9.41,4.97ZM13.591,7.03l2.051-2.051a1.223,1.223,0,0,0,0-1.727L14.249,1.858a1.222,1.222,0,0,0-1.727,0L10.47,3.91Z" transform="translate(3.25 3.25)" fill="#141124"/>
                        </svg>
                    </div>
                    <div>{user?.email}</div>
                    <span onClick={() => {logout(); setIsDisplay(false)}}>{env_LANG[language].logout_google}</span>
                </div>      
            </div>
        </div>
    </div>
    : ""}
    </>
  )
}

export default MiniProfile