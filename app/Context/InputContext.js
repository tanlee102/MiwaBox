"use client";

import React, { createContext, useContext, useEffect, useState } from 'react'
import InputDialog from '../Components/Dialog/InputDialog';
import { ethers } from 'ethers';
import { AppsConext } from './AppsContext';
import { env_SMARTCHAIN } from '../env';
import { AccountContext } from './AccountContext';
import { env_LANG } from '../env_lang';
import { WindowContext } from './WindowContext';

export const InputContext = createContext();

const InputProvider = ({ children }) => {

    const { language } = useContext(WindowContext)
    const { switchNetwork } = useContext(AccountContext);
    const { infoApp } = useContext(AppsConext);

    const [displayInputBox, setDisplayInputBox] = useState();
    const [listUrlImage, setListUrlImage] = useState([]);

    const [boldMode, setBoldMode] = useState(false);
    const [headMode, setHeadMode] = useState(false);
    const [centerMode, setCenterMode] = useState(false);

    const [loadSending, setLoadSending] = useState(false);


    const addUrl = (type, url, callback) => {
        if(String(url).trim().length > 0){
            setListUrlImage([...listUrlImage, { type: type, url: url }]);
            callback();
        }else{
            alert(env_LANG[language].alert_msg[2]);
        }
    }

    const addMessages = async (callback) => {

        if(loadSending) return;
        const textInput = String(document.getElementsByClassName('input-thr').item(0).innerHTML).replace(/&nbsp;/g, '').replace(/<[^>]+>/g, '').trim();
        
        if(listUrlImage.length > 0 || textInput.length > 0){
            setLoadSending(true);

            var solidityArray = listUrlImage.map(obj => {
                return {
                    typ: obj.type+1,
                    value: obj.url,
                };
            });
            if(textInput.length > 0)
                solidityArray.push({
                    typ: 0,
                    value: textInput,
                });

            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                await switchNetwork(env_SMARTCHAIN.NETWORKS[infoApp.idNetwork]);
    
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contractWithSigner = new ethers.Contract(infoApp.appAddress, env_SMARTCHAIN.APP_CONTRACTS.chat.abi, signer);
                
                const tx = await contractWithSigner.sendMessage(solidityArray);
                await tx.wait();
    
                document.getElementsByClassName('input-thr').item(0).innerHTML = "";
                setListUrlImage([]);

                try {
                    callback();   
                } catch (error) {
                    console.log(error);
                }
                setLoadSending(false);
            } catch (error) {
                alert(env_LANG[language].alert_msg[3]);
                setLoadSending(false);
            }
        }else{
            alert(env_LANG[language].alert_msg[4]);
        }
    }

    const addText = async ()=> {

        if(loadSending) return;
        const textInput = String(document.getElementsByClassName('input-thr').item(0).innerHTML).replace(/&nbsp;/g, '').replace(/<[^>]+>/g, '').trim();

        if(listUrlImage.length > 0 || textInput.length > 0){

            setLoadSending(true);

            var solidityArray = listUrlImage.map(obj => {
                return {
                    typ: obj.type+1,
                    value: obj.url,

                    bold: boldMode,
                    center: centerMode,
                    head: headMode
                };
            });
            if(textInput.length > 0)
                solidityArray.push({
                    typ: 0,
                    value: textInput,

                    bold: boldMode,
                    center: centerMode,
                    head: headMode
                });

            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                
                await switchNetwork(env_SMARTCHAIN.NETWORKS[infoApp.idNetwork]);

                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contractWithSigner = new ethers.Contract(infoApp.appAddress, env_SMARTCHAIN.APP_CONTRACTS.post.abi, signer);

                const tx = await contractWithSigner.sendText(solidityArray);
                await tx.wait(); 

                document.getElementsByClassName('input-thr').item(0).innerHTML = "";
                setListUrlImage([]);
                
                setLoadSending(false);
            } catch (error) {
                alert(env_LANG[language].alert_msg[5]);
                setLoadSending(false);
            }
        }else{
            alert(env_LANG[language].alert_msg[4]);
        }
    }

  return (
    <InputContext.Provider value={{ setDisplayInputBox, listUrlImage, setListUrlImage,
                                    boldMode, setBoldMode, headMode, setHeadMode, centerMode, setCenterMode,
                                    loadSending, setLoadSending,
                                    addMessages, addText,
                                  }}>
        {children}
        <InputDialog setDisplayBox={setDisplayInputBox} displayBox={displayInputBox} addUrl={addUrl}></InputDialog>
    </InputContext.Provider>
  )
}

export default InputProvider