'use client';

import React, { useContext } from 'react'
import { useState, useEffect } from 'react';

import { hideMainScrollBar } from '@/app/helper/hideMainScrollBar'; 
import axios from 'axios';
import Cookies from 'js-cookie';
import { service_url } from '@/app/env_setting';
import { jwtDecode } from 'jwt-decode';
import { RootLayoutContext } from '@/app/Context/RootLayoutContext';


const EditUserName = () => {

    const {myUser, setMyUser, setDisplayMiniProfile, displayEditUsername, setDisplayEditUsername} = useContext(RootLayoutContext);

    const [textIn, setTextIn] = useState(myUser?.displayName);
    useEffect(() => {
      if(myUser?.displayName){
        setTextIn(myUser.displayName);
      }
    }, [myUser])

    const handleChange = event => {
        setTextIn(event.target.value);
    };

    useEffect(() => {
      hideMainScrollBar(displayEditUsername);
    }, [displayEditUsername]);

    const updateUserNameBtn = async () => {
        try {
          const response = await axios.post(service_url+'/update?name='+textIn, 
            {},
            {
              headers: {
                  'Authorization': `Bearer ${myUser?.access_token}`,
                  'Content-Type': 'application/json'
              }
            }
          );
          if (response.status === 200) {

            const userData = { ...myUser, displayName: textIn };
            setMyUser(userData);
      
            const decodedToken = jwtDecode(myUser.access_token);
            const expiresAt = decodedToken.exp;

            const expiresInDays = (expiresAt * 1000 - Date.now()) / (1000 * 60 * 60 * 24);
            Cookies.set('myuser', JSON.stringify(userData), { expires: Math.floor(expiresInDays) });

            setDisplayEditUsername(false);
            setDisplayMiniProfile(true);
          }
        } catch (error) {
          console.error('Error updating username:', error);
          alert('Failed to update username');
        }
    }

  return (
    <div  className={displayEditUsername ? "dialog-confirm active-confirm" : "dialog-confirm"}>
  
        <div>

            <div>
                <header> 
                    <h3>Edit Account Name</h3> 
                    <i className="fa fa-close" aria-hidden="true" onClick={() => setDisplayEditUsername(false)}></i>
                </header>

                <div className="dialog-msg dialog-user-name"> 
                    <input 
                        value={textIn} 
                        onChange={handleChange} 
                        placeholder='Enter account name' 
                        id='input-dialog-user-name' 
                        type="text" 
                        maxLength={30}
                    />
                </div>
                
                <footer>
                    <div className="controls"> 
                        <button className="button button-danger doAction" onClick={() => {updateUserNameBtn()}}>Yes</button>  
                        <button className="button button-default cancelAction" onClick={() => setDisplayEditUsername(false)}>Cancel</button> 
                    </div>
                </footer>
            </div>

        </div>

    </div>
  )
}

export default EditUserName