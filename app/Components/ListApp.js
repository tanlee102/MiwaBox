import { ethers } from 'ethers';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import LoadMore from './LoadMore';
import { AppsConext } from '../Context/AppsContext';
import { AccountContext } from '../Context/AccountContext';
import { env_SMARTCHAIN } from '../env';
import ItemApp from './ItemApp';
import { WindowContext } from '../Context/WindowContext';

import { nanoid } from 'nanoid';

const ListApp = () => {

    const { currentIndex } = useContext(WindowContext);
    const { infoApp, 
            items, orderPrivacy, loadState, setLoadState, displayLoader, LoadMoreBtn } = useContext(AppsConext)
  
    const iconItems = {
      999: "/icon/item/management.png",
      // 99: "/icon/item/app-drawer.png",
      777: "/icon/item/home.png",
      888: "/icon/item/videopage.png"
    };

  return (

    <>
    {iconItems[currentIndex] && (
      <ItemApp
        title={infoApp?.title}
        index={infoApp?.id}
        isBorder={true}
        isPin={true}
        isSelected={true}
        svgTag={<img src={iconItems[currentIndex]} />}
      />
    )}

    {!iconItems[currentIndex] && infoApp && (
      <ItemApp
        address={infoApp?.appAddress}
        title={infoApp?.title}
        index={infoApp?.id}
        appType={infoApp?.appType}
        isSelected={true}
        isPin={true}
        isBorder={true}
        svgTag={
          <svg fill="#000000" viewBox="0 0 24 24">
            <circle id="primary" cx="12" cy="12" r="10"></circle>
            <path id="secondary" d="M20.91,4.5,19.5,3.09a2,2,0,0,0-2.83,0L10.24,9.51a1,1,0,0,0-.29.73L10,13a1,1,0,0,0,1,1l2.78.05h0a1,1,0,0,0,.71-.29l6.42-6.43A2,2,0,0,0,20.91,4.5Z"></path>
          </svg>
        }
      />
    )}

    <div className='split-list-item-app'>EXPLORE</div>

    {items.filter(item => ethers.toNumber(item?.id) > 0).map((item, index) => {
      const id = ethers.toNumber(item.id);
      const title = ethers.decodeBytes32String(item.title);
      const appType = ethers.toNumber(item.appType);
      const isSelected = id === currentIndex;
      const isBorder = index === items.length - 1 || ethers.toNumber(items[index + 1]?.id) === 0;

      return (
        <Link key={String(id) + String(orderPrivacy)} href={`/?id=${id}`}>
          <ItemApp
            address={item.appAddress}
            title={title}
            index={id}
            appType={appType}
            isSelected={isSelected}
            isBorder={isBorder}
            svgTag={
              <svg fill="#000000" viewBox="0 0 24 24">
                <circle id="primary" cx="12" cy="12" r="10"></circle>
                <path id="secondary" d="M20.91,4.5,19.5,3.09a2,2,0,0,0-2.83,0L10.24,9.51a1,1,0,0,0-.29.73L10,13a1,1,0,0,0,1,1l2.78.05h0a1,1,0,0,0,.71-.29l6.42-6.43A2,2,0,0,0,20.91,4.5Z"></path>
              </svg>
            }
          />
        </Link>
      );
    })}


    {displayLoader ? 
      <LoadMore loadState={loadState} setLoadState={setLoadState} btnAct={LoadMoreBtn}/>    
    : ""}
    </>

  )
}

export default ListApp
