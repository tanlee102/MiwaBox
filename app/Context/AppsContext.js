"use client";

import React, { createContext, useContext, useEffect, useState } from 'react'
import { env_SMARTCHAIN } from '../env';
import { ethers } from 'ethers';
import { AccountContext } from './AccountContext';
import { WindowContext } from './WindowContext';
import { env_LANG } from '../env_lang';

export const AppsConext = createContext();

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const AppsProvider = ({ children }) => {
  
    const { currentIndex, language } = useContext(WindowContext);
    const { switchNetwork, account, rpcProvider } = useContext(AccountContext);

    const [infoSM, setInfoSM] = useState(null);
    const [idNetwork, setIdNetwork] = useState(0);
    const [choseCategory, setChoseCategory] = useState(0);
    const [chosePrivacy, setChosePrivacy] = useState(true);
    const [title, setTitle] = useState("");

    const [loadCreateState, setLoadCreateState] = useState(0);

    const [infoApp, setInfoApp] = useState(null); //This very important!!!
    const [displayApp, setDisplayApp] = useState(false);

    const [orderListApp, setOrderListApp] = useState(1);
    const [orderPrivacy, setOrderPrivacy] = useState(1);

    const [listMessage, setListMessage] = useState([]);


    async function deployContract() {

      if (!window.ethereum) {
        alert(env_LANG[language].alert_msg[0]);
        return;
      }
    
      let abi, bytecode;

      if(choseCategory == 0){
        abi = env_SMARTCHAIN.APP_CONTRACTS.chat.abi;
        bytecode = env_SMARTCHAIN.APP_CONTRACTS.chat.bin[env_SMARTCHAIN.NETWORKS_CHOSE_BIN[idNetwork]];
      }else{
        abi = env_SMARTCHAIN.APP_CONTRACTS.post.abi;
        bytecode = env_SMARTCHAIN.APP_CONTRACTS.post.bin[env_SMARTCHAIN.NETWORKS_CHOSE_BIN[idNetwork]];
      }
      
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractFactory = new ethers.ContractFactory(abi, bytecode, signer);
      
      setLoadCreateState(2);
      
      try {
        const contract = await contractFactory.deploy({ gasLimit: 3000000 });
        await contract.deploymentTransaction().wait(1);

        setLoadCreateState(3);

        const appAddress = (await contract.getAddress()).toString();

        try {
          setLoadCreateState(4);

          await switchNetwork(env_SMARTCHAIN.NETWORK);

          setLoadCreateState(5);
  
          const provider_ = new ethers.BrowserProvider(window.ethereum);
          const signer_ = await provider_.getSigner();
          const contractWithSigner = new ethers.Contract(env_SMARTCHAIN.CONTRACT.address, env_SMARTCHAIN.CONTRACT.abi, signer_);
          const tx = await contractWithSigner.createApp(ethers.encodeBytes32String(String(title.trim())), appAddress, idNetwork, choseCategory, chosePrivacy);
          await tx.wait(); 
    
          setLoadCreateState(6);

          await delay(2000);

          setLoadCreateState(7);
        
          let appInfo = await contractWithSigner.getLatestAppByUserAddress(account);

          setInfoSM({
            id: ethers.toNumber(appInfo.id),
            title: ethers.decodeBytes32String(appInfo.title),
            appAddress: appInfo.appAddress,
            creatorAddress: appInfo.creatorAddress,
            idNetwork: ethers.toNumber(appInfo.idNetwork),
            privacy: appInfo.privacy,
            appType: ethers.toNumber(appInfo.appType)
          });

          await delay(1000); 
          setLoadCreateState(8);

        } catch (error) {
          setLoadCreateState(9);
          console.log(error)
        }
      } catch (error) {
        setLoadCreateState(9);
        console.log(error)
      }
    }

    const btnCreateApp = async () => {
      if(title.trim().length > 0){
        setLoadCreateState(1);
        await switchNetwork(env_SMARTCHAIN.NETWORKS[idNetwork]);
        try {
          deployContract(); 
        } catch (error) {
          setLoadCreateState(9)
        }
      }else{
        alert(env_LANG[language].alert_msg[1]);
      }      
    }



    async function getAppInfo(){

      if(currentIndex < env_SMARTCHAIN.INITIAL_INDEX){
        let objtmp = {
          id: currentIndex,
          appAddress: env_SMARTCHAIN.CONTRACT.address,
          creatorAddress: env_SMARTCHAIN.CONTRACT.address,
          idNetwork: 0,
          appType: 2,
        }
        if(currentIndex == 99){
          objtmp.title = env_LANG[language].infoApps[2]
        }
        if(currentIndex == 999){
          objtmp.title = env_LANG[language].infoApps[0]
        }
        if(currentIndex == 777){
          objtmp.title = env_LANG[language].infoApps[1]
        }
        setInfoApp(objtmp);

      }else{

        const contract = await rpcProvider();
        let app = await contract.getApp(currentIndex);
  
        if(ethers.decodeBytes32String(app.title) !== "" && ethers.toNumber(app.id) != 0){
          setInfoApp({
            id: ethers.toNumber(app.id),
            title: ethers.decodeBytes32String(app.title),
            appAddress: app.appAddress,
            creatorAddress: app.creatorAddress,
            idNetwork: ethers.toNumber(app.idNetwork),
            appType: ethers.toNumber(app.appType),
            point: ethers.toNumber(app.point),
            privacy: app.privacy,
            display: app.display,
            timestamp: app.timestamp
          });

          setDisplayApp(app.display);
        }
      }

    }




    async function changeDisplayApp(typeDisplay){
      if (!window.ethereum) {
        alert(env_LANG[language].alert_msg[0]);
        return;
      }

      await switchNetwork(env_SMARTCHAIN.NETWORK);

      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const webProvider = new ethers.BrowserProvider(window.ethereum);
        const signer = await webProvider.getSigner();
        const contractWithSigner = new ethers.Contract(env_SMARTCHAIN.CONTRACT.address, env_SMARTCHAIN.CONTRACT.abi, signer);

        const tx = await contractWithSigner.updateDisplayApp(Number(infoApp?.id), Boolean(typeDisplay));
        await tx.wait();

        setDisplayApp(typeDisplay);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }



    
    useEffect(() => { //This is very important
      setListMessage([]);
      getAppInfo();
    },[currentIndex]);


  return (
    <AppsConext.Provider  value={{
        btnCreateApp, setIdNetwork, idNetwork,
        choseCategory, setChoseCategory, chosePrivacy, setChosePrivacy, title, setTitle,
        setLoadCreateState, loadCreateState, infoSM,
        setOrderListApp, orderListApp, orderPrivacy, setOrderPrivacy,
        infoApp, listMessage, setListMessage,
        displayApp, setDisplayApp, changeDisplayApp
    }}>
        {children}
    </AppsConext.Provider>
  )
}

export default AppsProvider