'use client';

import React, { useContext } from 'react'

import { AccountContext } from '@/app/Context/AccountContext';
import { WindowContext } from '@/app/Context/WindowContext';
import { env_LANG } from '@/app/env_lang';

const MiniProfile = ({isDisplay,setIsDisplay,user}) => {

    const {logout} = useContext(AccountContext);
    const {language} = useContext(WindowContext)

  return (
    <>
    {user ?
    <div className={isDisplay ? "dialog-confirm active-confirm" : "dialog-confirm"}>
        <div>
            <div>
                <header>
                    <h3>Google</h3>
                    <i className="fa fa-close" aria-hidden="true" onClick={() => setIsDisplay(false)}></i>
                </header>
                <div className="dialog-msg mini-profile-dialog"> 
                    <div><img src={user?.photoURL}/></div>
                    <div>{user?.displayName}</div>
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