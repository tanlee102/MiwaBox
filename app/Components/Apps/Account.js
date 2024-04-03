'use client';

import { AccountContext } from '@/app/Context/AccountContext';
import { WindowContext } from '@/app/Context/WindowContext';
import { env_SMARTCHAIN } from '@/app/env';
import { env_LANG } from '@/app/env_lang';
import React, { useContext, useEffect, useState } from 'react'

const Account = () => {

    const { switchNetwork, 
            connect, account, 
            createUser, getUser, updateUser, 
            user, setUser, 
            iconAvatars } = useContext(AccountContext);
    const { currentIndex, language } = useContext(WindowContext);

    async function updateAccout(){
        const re = await updateUser(Number(idIcon), String(name).trim());
        if(re){
            alert(env_LANG[language].alert_msg[7]);
        }else{
            alert(env_LANG[language].alert_msg[8]);
        }
    }

    async function checkUser(){
        let user = await getUser(account);
        if(user){
            setUser(user);
            setName(user.name);
            setIdIcon(user.idIcon);
        }else{
            setUser(null)
            await switchNetwork(env_SMARTCHAIN.NETWORK);  
        }
    }

    useEffect(() => {
        if(account && currentIndex == 999){
            const fetchData = async () => {
                await checkUser();
           };
           fetchData();
        }
    }, [account])

    async function createAccount(account){
        switchNetwork(env_SMARTCHAIN.NETWORK);
        try {
            await createUser(account);
            await checkUser();
        } catch (error) {
            console.error(error);
        }
    }

    const [name, setName] = useState('');
    const [idIcon, setIdIcon] = useState('');

    const handleNameChange = (event) => {
      setName(event.target.value);
    };

  return (
    <div className="account">

        {user ? 
            <>
                <div className="avatar">
                    <img src={`/icon/${iconAvatars[Number(idIcon)]}`} />
                </div>
                <p className="address-wallet-account">{account}</p>
                <input type="text" className="name-wallet-account" value={name} onChange={handleNameChange}/>
                <div className="list-select-avatar">
                    {iconAvatars.map((iconAvatar, index) => (
                        <span onClick={() => {setIdIcon(index)}} key={index}>
                            <img src={`/icon/${iconAvatar}`} alt={iconAvatar} />
                        </span>
                    ))}
                </div>
                <div className="save-account"><span style={{backgroundColor: user.name !== String(name).trim() || user.idIcon != idIcon ? 'coral' : 'rgb(188, 188, 188)'}} onClick={updateAccout}>Cập nhật</span></div>
            </>

            :
            
            <div className="create-account">
                <img src='/icon/item/robot.png' />
                {account ? 
                    <span onClick={() => {createAccount(account)}}>Tạo tài khoản</span> 
                    : 
                    <span onClick={connect}>Kết nối ví</span>
                }
            </div>
        }

    </div>
  )
}

export default Account