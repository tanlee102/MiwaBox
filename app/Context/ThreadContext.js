"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { ethers } from 'ethers';

import { AppsConext } from './AppsContext';
import { AccountContext } from './AccountContext';

import { env_SMARTCHAIN } from '../env';
import { hashCurrentMessageIndex, hashMessage, hashPreScrollHeight } from '../global';

const TimeOutToBottomContainApp = (time) => {
    setTimeout(() => {
        const containAppElement = document.querySelector('.contain-app');
        containAppElement.scrollTop = containAppElement.scrollHeight;
    },time);
}

const TimeOutToTopContainApp = (time) => {
    setTimeout(() => {
        const containAppElement = document.querySelector('.contain-app');
        containAppElement.scrollTop = 0;
    },time);
}

export const ThreadContext = createContext();

const ThreadProvider = ({ children }) => {

    const { rpcProvider } = useContext(AccountContext);
    const { infoApp, listMessage, setListMessage } = useContext(AppsConext);

    const [currentMsgsIndex, setCurrentMsgsIndex] = useState(0);

    const [loader, setLoader] = useState(true);
    const [finished, setFinished] = useState(false);
    const [loadLatest , setLoadLatest] = useState(false);

    const containAppRef = useRef(null);


    const getMessages = async (isReset = false) => {

        if(currentMsgsIndex < 0 && isReset == false) return;
        
        try {
            if(isReset && hashMessage.hasOwnProperty(infoApp.id)){

                setCurrentMsgsIndex(hashCurrentMessageIndex[infoApp.id]);
                setListMessage(hashMessage[infoApp.id]);
                TimeOutToBottomContainApp(333);

            }else if(isReset || currentMsgsIndex >= 0){

                setLoader(true)

                const provider = new ethers.JsonRpcProvider(env_SMARTCHAIN.NETWORKS[infoApp.idNetwork].rpcUrls[0]);
                const contract = new ethers.Contract(infoApp.appAddress, env_SMARTCHAIN.APP_CONTRACTS.chat.abi, provider);
                const msgs = await contract.getMessages(isReset, isReset ? 0 : currentMsgsIndex, env_SMARTCHAIN.DEFAULT_LENGTH_LIST_MESSAGE);
                
                if(msgs){
                    let remsgs = [];
                    let listUserAddress = [];
                    for(let i = 0; i < msgs.length; i++){
                        remsgs.push({
                            index: i + (ethers.toNumber(msgs[i].timestamp) & 0xFFFF),
                            sender: msgs[i].sender,
                            value: msgs[i].value,
                            type: ethers.toNumber(msgs[i].typ),
                            timestamp: ethers.toNumber(msgs[i].timestamp),
                            icon: msgs[i].icon
                        });
                        if(!listUserAddress.includes(msgs[i].sender)) listUserAddress.push(msgs[i].sender);
                    }
                    const contractBox = await rpcProvider();
                    let users = await contractBox.getUsersByAddresses(listUserAddress);
                    let listUser = [];
                    for(let i = 0; i < users.length; i++){
                        listUser.push({
                            address: listUserAddress[i],
                            name: ethers.decodeBytes32String(users[i].name),
                            idIcon: ethers.toNumber(users[i].idIcon),
                        });
                    }
                    const joinedList = remsgs.map(item1 => {
                        const matchedItem = listUser.find(item2 => (item2.address === item1.sender && item1.icon == true));
                        if (matchedItem) {
                            return { ...item1, ...matchedItem };
                        } else {
                            return item1;
                        }
                    });
            
                    let curIndex = null
                    if(isReset){
                        curIndex = ethers.toNumber(await contract.messageCount()) - 1 - remsgs.length;
                        setCurrentMsgsIndex(curIndex);
                        hashCurrentMessageIndex[infoApp.id] = curIndex;
                    }else{
                        curIndex = currentMsgsIndex - remsgs.length;
                        setCurrentMsgsIndex(curIndex)
                        hashCurrentMessageIndex[infoApp.id] = curIndex;
                    }

                    if(curIndex <= 0){
                        setTimeout(() => {
                            setLoader(false)
                        }, [1000])
                    }
                
                    hashPreScrollHeight['scrollHeight'] = Number(containAppRef?.current?.scrollHeight);
                    hashPreScrollHeight['scrollTop'] =  Number(containAppRef?.current?.scrollTop);
        
                    joinedList.reverse();
                    if(isReset){
                        setListMessage(joinedList);
                        hashMessage[infoApp.id] = joinedList;
                    }else{
                        setListMessage([...joinedList, ...listMessage]);
                        hashMessage[infoApp.id] = [...joinedList, ...listMessage];
                    }
            
                    if(isReset){
                        TimeOutToBottomContainApp(333);
                    }
                }
            }
            
        } catch (error) {
            console.log(error);
            if(isReset){
                setCurrentMsgsIndex(0);
                setListMessage([]);
                setLoader(false);
            }
        }
    }





    const getNextMessages = async () =>{

        setLoadLatest(true);
        TimeOutToBottomContainApp(333);

        let currentForwardIndex = (currentMsgsIndex >= 0 ? currentMsgsIndex + listMessage.length + 1 : listMessage.length);
        if(listMessage.length == 0){
            currentForwardIndex = 0;
            setCurrentMsgsIndex(-1);
        }

        try {

            const provider = new ethers.JsonRpcProvider(env_SMARTCHAIN.NETWORKS[infoApp.idNetwork].rpcUrls[0]);
            const contract = new ethers.Contract(infoApp.appAddress, env_SMARTCHAIN.APP_CONTRACTS.chat.abi, provider);
            const msgs = await contract.getLatestMessages(currentForwardIndex);
    
            if(msgs){
    
                let remsgs = [];
                let listUserAddress = [];
                for(let i = 0; i < msgs.length; i++){
                    remsgs.push({
                        index: i + (ethers.toNumber(msgs[i].timestamp) & 0xFFFF),
                        sender: msgs[i].sender,
                        value: msgs[i].value,
                        type: ethers.toNumber(msgs[i].typ),
                        timestamp: ethers.toNumber(msgs[i].timestamp),
                        icon: msgs[i].icon
                    });
                    if(!listUserAddress.includes(msgs[i].sender)) listUserAddress.push(msgs[i].sender);
                }
                const contractBox = await rpcProvider();
                let users = await contractBox.getUsersByAddresses(listUserAddress);
                let listUser = [];
                for(let i = 0; i < users.length; i++){
                    listUser.push({
                        address: listUserAddress[i],
                        name: ethers.decodeBytes32String(users[i].name),
                        idIcon: ethers.toNumber(users[i].idIcon),
                    });
                }
                const joinedList = remsgs.map(item1 => {
                    const matchedItem = listUser.find(item2 => (item2.address === item1.sender && item1.icon == true));
                    if (matchedItem) {
                        return { ...item1, ...matchedItem };
                    } else {
                        return item1;
                    }
                });
                
                setListMessage(prevListMessage => {
                    const updatedList = [...prevListMessage, ...joinedList];
                    hashMessage[infoApp.id] = updatedList;
                    return updatedList;
                  });
                  
                // setListMessage([...listMessage, ...joinedList]);
                // hashMessage[infoApp.id] = [...listMessage, ...joinedList];
    
                TimeOutToBottomContainApp(333);
            }
            setLoadLatest(false);    

        } catch (error) {
            console.log(error);
            setLoadLatest(false);   
        }

    }






    const getTexts = async (isReset = false) => {
        try {
            if(isReset){
                TimeOutToTopContainApp(0);
            }

            if(hashMessage.hasOwnProperty(infoApp.id) && isReset==true){

                setCurrentMsgsIndex(hashCurrentMessageIndex[infoApp.id]);
                setListMessage(hashMessage[infoApp.id]);

            }else if(finished==false || isReset==true){

                setLoader(true)

                const provider = new ethers.JsonRpcProvider(env_SMARTCHAIN.NETWORKS[infoApp.idNetwork].rpcUrls[0]);
                const contract = new ethers.Contract(infoApp.appAddress, env_SMARTCHAIN.APP_CONTRACTS.post.abi, provider);

                const textCount = ethers.toNumber(await contract.textCount());
                if(currentMsgsIndex >= textCount && isReset == false){ 
                    setFinished(true);
                    return;
                }else if(textCount == 0 && isReset == true){
                    hashCurrentMessageIndex[infoApp.id] = 0;
                    hashMessage[infoApp.id] = [];
                    setCurrentMsgsIndex(0);
                    setListMessage([]);
                    setFinished(true);
                    return;
                }
        
                const texts = await contract.getTexts(isReset ? 0 : currentMsgsIndex, env_SMARTCHAIN.DEFAULT_LENGTH_LIST_TEXT);

                if(texts){
                    let retexts = [];
                    for(let i = 0; i < texts.length; i++){
                        retexts.push({
                            type: ethers.toNumber(texts[i].typ),
                            value: texts[i].value,

                            timestamp: ethers.toNumber(texts[i].timestamp),

                            bold: texts[i].bold,
                            center: texts[i].center,
                            head: texts[i].head
                        });
                    }

                    if(isReset){
                        setCurrentMsgsIndex(retexts.length);
                        hashCurrentMessageIndex[infoApp.id] = retexts.length;
                    }else{
                        const curIndex = currentMsgsIndex + retexts.length;
                        setCurrentMsgsIndex(curIndex);
                        hashCurrentMessageIndex[infoApp.id] = curIndex;
                    }
        
                    if(isReset){
                        setListMessage(retexts);
                        hashMessage[infoApp.id] = retexts;
                    }else{
                        setListMessage([...listMessage, ...retexts]);
                        hashMessage[infoApp.id] = [...listMessage, ...retexts];
                    }
                }
                if(texts && texts?.length < env_SMARTCHAIN.DEFAULT_LENGTH_LIST_TEXT){
                    setFinished(true);
                }else{
                    setFinished(false);
                }
                setTimeout(() => {
                    setLoader(false)
                }, [1000])
            }
        } catch (error) {
            console.log(error);
            if(isReset){
                setCurrentMsgsIndex(0);
                setListMessage([]);
                setFinished(false);
            }
        }
    }



  return (
    <ThreadContext.Provider value={{ listMessage, getMessages, getNextMessages, getTexts, loadLatest, loader, containAppRef }}>
        {children}
    </ThreadContext.Provider>
  )
}

export default ThreadProvider