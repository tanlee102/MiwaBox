"use client";

import React, { createContext, useEffect, useState } from 'react'
import { useSDK } from "@metamask/sdk-react";
import { env_SMARTCHAIN } from '../env';
import { ethers } from 'ethers';

import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { service_url } from '../env_setting';

import Cookies from 'js-cookie';

export const AccountContext = createContext();

const AccountProvider = ({ children, myUser, setMyUser, setDisplayMiniProfile }) => {
    
    const {sdk} = useSDK();

    const [user, setUser] = useState(null);

    const [account, setAccount] = useState(false);


    const rpcProvider = async () => {
      try {
        const rPcProvider = new ethers.JsonRpcProvider(env_SMARTCHAIN.NETWORK.rpcUrls[0]);

        const abi = env_SMARTCHAIN.CONTRACT.abi;
        const contractAddress = env_SMARTCHAIN.CONTRACT.address;
    
        const contract = new ethers.Contract(contractAddress, abi, rPcProvider);
        return contract;
      } catch (error) {
        return null;
      }
    };

    const connect = async () => {
      try {
          const accounts = await sdk?.connect();
          setAccount(accounts?.[0]);
      } catch (err) {
          console.warn("failed to connect..", err);
      }
    };
    
    const switchNetwork = async (_params) => {
        try {
          const response = await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [_params],
          });
          return response;
        } catch (error) {
          console.log(error);
          return false;
        }
    };


    const createUser = async (_account) => {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            const webProvider = new ethers.BrowserProvider(window.ethereum);
            const signer = await webProvider.getSigner();  
            const contractWithSigner = new ethers.Contract(env_SMARTCHAIN.CONTRACT.address, env_SMARTCHAIN.CONTRACT.abi, signer);
            
            const idIcon = Math.floor(Math.random() * Number(env_SMARTCHAIN.TOTAL_CURRENT_ICON)) + 1;
            const name = ethers.encodeBytes32String(String(_account).substring(0, 9));
    
            const tx = await contractWithSigner.createUser(idIcon, name);
            await tx.wait(); 
            
            return true;
        } catch (error) {
            return false;
        }
    };


    const updateUser = async (_idIcon, _name) => {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            const webProvider = new ethers.BrowserProvider(window.ethereum);
            const signer = await webProvider.getSigner();  
            const contractWithSigner = new ethers.Contract(env_SMARTCHAIN.CONTRACT.address, env_SMARTCHAIN.CONTRACT.abi, signer);
            
            const idIcon = _idIcon;
            const name = ethers.encodeBytes32String(_name);
    
            const tx = await contractWithSigner.updateUser(idIcon, name);
            await tx.wait(); 
            
            return true;
        } catch (error) {
            return false;
        }
    }


    const getUser = async (_account) => {
        try {
            const contract = await rpcProvider();
            let user = await contract.getUser(_account);

            if(ethers.decodeBytes32String(user.name) === "" && ethers.toNumber(user.idIcon) == 0){
                return null;
            }else{
                return {
                    name: ethers.decodeBytes32String(user.name),
                    idIcon: ethers.toNumber(user.idIcon),
                    admin: user.admin
                };
            }
        } catch (error) {
            return null;
        }
    }


    useEffect(() => {
      const fetchAccounts = async () => {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          if(accounts){
            setAccount(accounts[0]);
          } 
        } catch (error) {
          console.log(error)
        }
      };
      if (typeof window.ethereum !== "undefined") fetchAccounts();
    }, []);

    
    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            window.ethereum.on("accountsChanged", (accounts) => {
              console.log("Account changed:", accounts);
              setAccount(accounts[0])
            });
          } else {
            console.log("Ethereum provider not found.");
          }
    }, []);


    const login = () => {

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
    
      signInWithPopup(auth, provider)
        .then((result) => {
          const data_user = result.user
          const url = service_url+'?access_token='+data_user.accessToken;
          fetch(url)
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
              const myuser = {
                email: data_user?.email,
                displayName: data_user?.displayName,
                photoURL: data_user?.photoURL,
              }
              myuser['access_token'] = data.access_token
              setMyUser(myuser);
  
              Cookies.set('myuser', JSON.stringify(myuser), { expires: 90, path: '/' });
            })
            .catch(error => {
              alert("Error when creating token!")
              console.error(`Fetch Error: ${error}`)
            });
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    const logout = () => {
      setMyUser(null);
      Cookies.remove('myuser');
    };

  return (
    <AccountContext.Provider  value={{
        rpcProvider,
        connect, account, setAccount,
        switchNetwork, createUser, getUser, updateUser, 
        user, setUser,
        myUser, setMyUser, setDisplayMiniProfile, login, logout
    }}>
        {children}
    </AccountContext.Provider>
  )
}

export default AccountProvider