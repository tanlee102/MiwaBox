import { ethers } from 'ethers';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import LoadMore from './LoadMore';
import { AppsConext } from '../Context/AppsContext';
import { AccountContext } from '../Context/AccountContext';
import { env_SMARTCHAIN } from '../env';
import ItemApp from './ItemApp';
import { WindowContext } from '../Context/WindowContext';

import data_suggestion_true from '../data/data_suggestion_true.json'
import data_suggestion_false from '../data/data_suggestion_false.json'

const ListApp = () => {

    const { currentIndex } = useContext(WindowContext);
    const { rpcProvider } = useContext(AccountContext);
    const { orderListApp, orderPrivacy, infoApp } = useContext(AppsConext)

    const [items, setItems] = useState([]);
    const [loadIndex, setLoadIndex] = useState(-1);
    const [loadState, setLoadState] = useState(items.length > 0 ? false : true);
    const [displayLoader, setDisplayLoader] = useState(true);
  
    async function getListApp(index, reset){
      try {
        const contract = await rpcProvider();

        let apps = [];
        try {
          apps = await contract.getApps(orderListApp == 0 ? true : false, Boolean(orderPrivacy), index, env_SMARTCHAIN.DEFAULT_LENGTH_LIST_APP); 
          if(reset) setItems(apps);
          else setItems([...items, ...apps]);
  
          if(ethers.toNumber(apps[apps.length - 1].id) == 0){
            setDisplayLoader(false);
          }else{
            let ins = 1;
            while(ethers.toNumber(apps[apps.length - ins].id) == 0){
              ins = ins + 1;
            }
            setLoadIndex(ethers.toNumber(apps[apps.length - ins].id))
          }
        } catch (error) {
          setDisplayLoader(false);
        }

        setLoadState(false);
      } catch (error) {
        console.log(error);
        setItems([]);
      }
    }

    
    async function FirstLoad(){
      if(orderListApp <= 1){
        setItems([]);
        setDisplayLoader(true);
        setLoadState(true);
        
        try {
          
          const contract = await rpcProvider();
          let currentId = Number(ethers.toNumber(await contract.currentId())) - 1;
          let initialId = Number(ethers.toNumber(await contract.initialId()));
          
          getListApp(orderListApp == 0 ? initialId : currentId, true);

        } catch (error) {
          console.log(error);
        }

      }else if(orderListApp == 2){
        if(orderPrivacy){
          setItems(data_suggestion_true);
        }else{
          setItems(data_suggestion_false);
        }
        setDisplayLoader(false);
      }else{
        setDisplayLoader(false);
        setItems([]);
      }
    }

    useEffect(() => {
      FirstLoad();
    }, []);

    useEffect(() => {
      FirstLoad();
    },[orderListApp, orderPrivacy]);

    const LoadMoreBtn = () => {
      getListApp(orderListApp ? loadIndex-1 : loadIndex+1, false);
    };

  return (

    <>
    {currentIndex == 999 ?
      <>
      <ItemApp title={infoApp?.title} index={infoApp?.id} isBorder={true} isPin={true} isSelected={true} svgTag={
        <img src = "/icon/item/management.png"/>}>
      </ItemApp>
      <div className='split-list-item-app'>EXPLORE</div>
      </>
    : ""}

    {currentIndex == 99 ?
      <>
      <ItemApp title={infoApp?.title} index={infoApp?.id} isBorder={true} isPin={true} isSelected={true} svgTag={
        <img src = "/icon/item/app-drawer.png"/>}>
      </ItemApp>
      <div className='split-list-item-app'>EXPLORE</div>
      </>
    : ""}

    {currentIndex == 777 ?
      <>
      <ItemApp title={infoApp?.title} index={infoApp?.id} isBorder={true} isPin={true} isSelected={true} svgTag={
        <img src = "/icon/item/home.png"/>}>
      </ItemApp>
      <div className='split-list-item-app'>EXPLORE</div>
      </>
    : ""}

    {![99, 777, 999].includes(currentIndex) && infoApp ?
      <>
      <ItemApp address={infoApp?.appAddress} title={infoApp?.title} index={infoApp?.id} appType={infoApp?.appType} isSelected={true} isPin={true} isBorder={true} svgTag={
        <svg fill="#000000" viewBox="0 0 24 24"><circle id="primary" cx="12" cy="12" r="10"></circle><path id="secondary" d="M20.91,4.5,19.5,3.09a2,2,0,0,0-2.83,0L10.24,9.51a1,1,0,0,0-.29.73L10,13a1,1,0,0,0,1,1l2.78.05h0a1,1,0,0,0,.71-.29l6.42-6.43A2,2,0,0,0,20.91,4.5Z"></path></svg>}>
      </ItemApp>
      <div className='split-list-item-app'>EXPLORE</div>
      </>
    : ""}

    {items.map((item, index) => (
      ethers.toNumber(item?.id) > 0 ? 
        <Link key={index} href={"/?id="+ethers.toNumber(item.id)}>
          <ItemApp address={item.appAddress} title={ethers.decodeBytes32String(item.title)} index={ethers.toNumber(item.id)} appType={ethers.toNumber(item.appType)} isSelected={ethers.toNumber(item.id) === currentIndex} isBorder={index == Number(items.length - 1) || ethers.toNumber(items[index + 1]?.id) == 0} svgTag={
            <svg fill="#000000" viewBox="0 0 24 24"><circle id="primary" cx="12" cy="12" r="10"></circle><path id="secondary" d="M20.91,4.5,19.5,3.09a2,2,0,0,0-2.83,0L10.24,9.51a1,1,0,0,0-.29.73L10,13a1,1,0,0,0,1,1l2.78.05h0a1,1,0,0,0,.71-.29l6.42-6.43A2,2,0,0,0,20.91,4.5Z"></path></svg>}>
          </ItemApp>
        </Link>
      : "" 
    ))}
    {displayLoader ? 
      <LoadMore loadState={loadState} setLoadState={setLoadState} btnAct={LoadMoreBtn}/>    
    : ""}
    </>

  )
}

export default ListApp
