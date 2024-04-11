"use client";

import React, { createContext, useEffect, useState } from 'react'
import { useSDK } from "@metamask/sdk-react";
import { env_SMARTCHAIN } from '../env';
import { ethers } from 'ethers';

export const AccountContext = createContext();

const AccountProvider = ({ children }) => {

    const iconAvatars = [
      'cute/detective.png',
      'cute/animal.png',   
      'cute/bear.png',
      'cute/bird.png',     
      'cute/cat.png',
      'cute/cloud.png',    
      'cute/cool.png',
      'cute/dinosaur.png', 
      'cute/dolphin.png',
      'cute/donut.png',    
      'cute/dragon.png',
      'cute/frog.png',     
      'cute/girlcurly.png',
      'cute/hedgehog.png', 
      'cute/insect.png',
      'cute/ocean.png',    
      'cute/savege.png',
      'cute/sheep.png',    
      'cute/skincare.png',
      'cute/smiling.png',  
      'cute/turtle.png',
      'cute/twitter.png'
    ];
    
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
      fetchAccounts();
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
    }, [])

  return (
    <AccountContext.Provider  value={{
        rpcProvider,
        connect, account, setAccount,
        switchNetwork, createUser, getUser, updateUser, 
        user, setUser,
        iconAvatars
    }}>
        {children}
    </AccountContext.Provider>
  )
}

export default AccountProvider