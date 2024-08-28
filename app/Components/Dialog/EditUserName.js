import React, { useContext } from 'react'
import { useState, useEffect } from 'react';

import { hideMainScrollBar } from '@/app/helper/hideMainScrollBar'; 
import axios from 'axios';
import Cookies from 'js-cookie';
import { AccountContext } from '@/app/Context/AccountContext';
import { service_url } from '@/app/env_setting';
import { jwtDecode } from 'jwt-decode';


const EditUserName = ({isDisplay ,setIsDisplay, setDisplayMiniProfile}) => {

    const {myUser, setMyUser} = useContext(AccountContext)
    const [textIn, setTextIn] = useState(myUser?.displayName);

    useEffect(() => {
      if(myUser?.displayName){
        setTextIn(myUser.displayName);
      }
    }, [myUser])

    const handleChange = event => {
        setTextIn(event.target.value);
    };

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

            setIsDisplay(false);
            setDisplayMiniProfile(true);
          }
        } catch (error) {
          console.error('Error updating username:', error);
          alert('Failed to update username');
        }
    }

  


    useEffect(() => {
      hideMainScrollBar(isDisplay);
    }, [isDisplay]);

  return (
    <div  class={isDisplay ? "dialog-confirm active-confirm" : "dialog-confirm"}>
  
        <div>
            {/* <div>
                <header> 
                    <h3> Chỉnh sửa tên tài khoảng </h3> 
                    <i class="fa fa-close" aria-hidden="true" onClick={() => setIsDisplay(false)}></i>
                </header>

                <div class="dialog-msg dialog-user-name"> 

                    <input value={textIn} onChange={handleChange} placeholder='Nhập tên tài khoảng' id='input-dialog-user-name' type="text" maxLength={env_variable.MAX_NAME_USER_LENGTH}
                    onBlur={(e) => checkUserNameBtn()}/>
                    {checkSame ? <span>Tên này đã được sử dụng.</span> : "" }

                </div>
                
                <footer>
                    <div class="controls"> 
                        <button class="button button-danger doAction" onClick={() => {updateUserNameBtn()}}>Vâng</button>  
                         <button class="button button-default cancelAction" onClick={() => setIsDisplay(false)}>Hủy</button> 
                    </div>
                </footer>

            </div> */}

            <div>
                <header> 
                    <h3>Edit Account Name</h3> 
                    <i class="fa fa-close" aria-hidden="true" onClick={() => setIsDisplay(false)}></i>
                </header>

                <div class="dialog-msg dialog-user-name"> 
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
                    <div class="controls"> 
                        <button class="button button-danger doAction" onClick={() => {updateUserNameBtn()}}>Yes</button>  
                        <button class="button button-default cancelAction" onClick={() => setIsDisplay(false)}>Cancel</button> 
                    </div>
                </footer>
            </div>

        </div>

    </div>
  )
}

export default EditUserName
