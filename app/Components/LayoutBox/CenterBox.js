"use client";

import React, { useEffect, useState, useContext, useLayoutEffect } from "react";

import WrapHeaderBox from "./WrapHeaderBox";
import Account from "../Apps/Account";
import ThreadPost from "../Apps/ThreadPost";
import ThreadChat from "../Apps/ThreadChat";
import Manage from "../Apps/Manage";
import Welcome from "../Apps/Welcome";
import ThreadVideo from "../Apps/ThreadVideo";


import { WindowContext } from "@/app/Context/WindowContext";
import { AppsConext } from "@/app/Context/AppsContext";
import { ThreadContext } from "@/app/Context/ThreadContext";
import { hashPreScrollHeight } from "@/app/global";

const CenterBox = ({}) => {

  const { showRight, showLeft } = useContext(WindowContext);
  const { infoApp } = useContext(AppsConext);
  const { getMessages, getTexts, listMessage, containAppRef } = useContext(ThreadContext);


  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const checkDeviceType = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|.*Tablet.*|.*Touch/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };
    checkDeviceType();
  }, []);



  let prevScrollTop = 0;

  const handleScroll = async (event) => {
    event.preventDefault();

    if (!containAppRef.current) return;
    const currentScrollTop = containAppRef.current.scrollTop;

    if(infoApp.appType == 0){
        if (currentScrollTop < 400 && currentScrollTop < prevScrollTop) {
          await getMessages();
        }
    }
    if(infoApp.appType == 1){
      const { scrollTop, scrollHeight, clientHeight } = containAppRef.current;
      const scrollBottom = scrollHeight - (scrollTop + clientHeight);
      if (scrollBottom < 400 && currentScrollTop > prevScrollTop) {
        await getTexts();
      }
    }
    prevScrollTop = currentScrollTop;
  };



  
  
  const keepScrolling = async () => {
    if(infoApp?.appType == 0 && containAppRef?.current){
      const prevScrollHeight = hashPreScrollHeight['scrollHeight'];
      const currentScrollHeight = Number(containAppRef.current.scrollHeight);
      
      if (prevScrollHeight - currentScrollHeight > 9 || currentScrollHeight - prevScrollHeight > 9) {
        const addedItemsHeight = currentScrollHeight - prevScrollHeight;
        if(addedItemsHeight > 0) containAppRef.current.scrollTop = hashPreScrollHeight['scrollTop'] + addedItemsHeight;
        
        hashPreScrollHeight['scrollHeight'] = currentScrollHeight;
        hashPreScrollHeight['scrollTop'] = containAppRef.current.scrollTop;
      }
    }
  }

  useLayoutEffect(() => {
    keepScrolling();
  }, [listMessage]);
  

  return (
    <div className="layout-center-box">

        {infoApp?.appType == 2 ? 
        null
        :(
        <WrapHeaderBox>

          <div className="btn-showLeftBox non-select" onClick={showLeft}>
            <svg viewBox="0 0 24 24">
              <path d="M5 6H12H19M5 12H19M5 18H19" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>

          <div className={String("titleApp image-type-app-"+(infoApp?.appType))}>
            <svg fill="#000000" viewBox="0 0 24 24"><circle id="primary" cx="12" cy="12" r="10"></circle><path id="secondary" d="M20.91,4.5,19.5,3.09a2,2,0,0,0-2.83,0L10.24,9.51a1,1,0,0,0-.29.73L10,13a1,1,0,0,0,1,1l2.78.05h0a1,1,0,0,0,.71-.29l6.42-6.43A2,2,0,0,0,20.91,4.5Z"></path></svg>
            <div className="title-titleApp">
                <p>{String(infoApp ? infoApp?.title : "...")}</p>
                <span>{String(infoApp ? infoApp?.appAddress : "...")}</span>
            </div>
          </div>

          <div className="btn-showRightBox non-select" onClick={showRight}>
            <svg viewBox="0 0 24 24"><path d="M18.9771 5.02291L19.5074 4.49258V4.49258L18.9771 5.02291ZM18.9771 14.7904L19.5074 15.3207L18.9771 14.7904ZM7.14558 12.6684L6.61525 12.138L6.61525 12.138L7.14558 12.6684ZM3.43349 16.3804L3.96382 16.9108L3.96382 16.9108L3.43349 16.3804ZM7.61956 20.5665L7.08923 20.0362L7.08923 20.0362L7.61956 20.5665ZM11.3319 16.8541L10.8016 16.3238L11.3319 16.8541ZM3.00906 17.5904L2.26365 17.6732L3.00906 17.5904ZM3.24113 19.679L2.49572 19.7618L2.49572 19.7618L3.24113 19.679ZM4.32101 20.7589L4.23819 21.5043H4.23819L4.32101 20.7589ZM6.4096 20.9909L6.49242 20.2455H6.49242L6.4096 20.9909ZM3.52408 20.2677L4.05441 19.7374L4.05441 19.7374L3.52408 20.2677ZM3.73229 20.4759L3.20196 21.0062L3.20196 21.0063L3.73229 20.4759ZM7.40432 11.6311L6.67789 11.8177H6.67789L7.40432 11.6311ZM12.3689 16.5957L12.1823 17.3221L12.3689 16.5957ZM7.63832 17.063C7.34382 16.7717 6.86895 16.7743 6.57767 17.0688C6.2864 17.3633 6.28901 17.8382 6.58351 18.1294L7.63832 17.063ZM20.0119 8.20635C20.1258 8.60458 20.5411 8.83502 20.9393 8.72105C21.3375 8.60709 21.5679 8.19187 21.454 7.79365L20.0119 8.20635ZM21.3916 12.2267C21.5167 11.8318 21.2981 11.4103 20.9033 11.2851C20.5085 11.1599 20.0869 11.3785 19.9617 11.7733L21.3916 12.2267ZM13.1161 10.8839C12.628 10.3957 12.628 9.60427 13.1161 9.11612L12.0555 8.05546C10.9815 9.1294 10.9815 10.8706 12.0555 11.9445L13.1161 10.8839ZM14.8839 10.8839C14.3957 11.372 13.6043 11.372 13.1161 10.8839L12.0555 11.9445C13.1294 13.0185 14.8706 13.0185 15.9445 11.9445L14.8839 10.8839ZM14.8839 9.11612C15.372 9.60427 15.372 10.3957 14.8839 10.8839L15.9445 11.9445C17.0185 10.8706 17.0185 9.1294 15.9445 8.05546L14.8839 9.11612ZM15.9445 8.05546C14.8706 6.98151 13.1294 6.98151 12.0555 8.05546L13.1161 9.11612C13.6043 8.62796 14.3957 8.62796 14.8839 9.11612L15.9445 8.05546ZM19.5074 4.49258C16.5173 1.50247 11.6694 1.50247 8.67928 4.49258L9.73994 5.55324C12.1443 3.14892 16.0424 3.14892 18.4468 5.55324L19.5074 4.49258ZM6.61525 12.138L2.90316 15.8501L3.96382 16.9108L7.67591 13.1987L6.61525 12.138ZM8.14989 21.0968L9.39029 19.8564L8.32963 18.7958L7.08923 20.0362L8.14989 21.0968ZM9.39029 19.8564L11.8623 17.3845L10.8016 16.3238L8.32963 18.7958L9.39029 19.8564ZM2.26365 17.6732L2.49572 19.7618L3.98654 19.5962L3.75447 17.5076L2.26365 17.6732ZM4.23819 21.5043L6.32678 21.7364L6.49242 20.2455L4.40384 20.0135L4.23819 21.5043ZM2.99375 20.798L3.20196 21.0062L4.26263 19.9456L4.05441 19.7374L2.99375 20.798ZM4.40384 20.0135C4.35042 20.0075 4.30062 19.9836 4.26262 19.9456L3.20196 21.0063C3.48081 21.2851 3.84626 21.4607 4.23819 21.5043L4.40384 20.0135ZM2.49572 19.7618C2.53926 20.1537 2.7149 20.5192 2.99375 20.798L4.05441 19.7374C4.01641 19.6994 3.99248 19.6496 3.98654 19.5962L2.49572 19.7618ZM7.08923 20.0362C6.93242 20.193 6.71283 20.27 6.49242 20.2455L6.32678 21.7364C7.00007 21.8112 7.67087 21.5759 8.14989 21.0968L7.08923 20.0362ZM2.90316 15.8501C2.42414 16.3291 2.18884 16.9999 2.26365 17.6732L3.75447 17.5076C3.72999 17.2872 3.80701 17.0676 3.96382 16.9108L2.90316 15.8501ZM8.13075 11.4446C7.60655 9.4033 8.14412 7.14906 9.73994 5.55324L8.67928 4.49258C6.69321 6.47865 6.02725 9.28401 6.67789 11.8177L8.13075 11.4446ZM18.4468 14.2601C16.8509 15.8559 14.5967 16.3934 12.5554 15.8693L12.1823 17.3221C14.716 17.9728 17.5214 17.3068 19.5074 15.3207L18.4468 14.2601ZM11.8623 17.3845C11.9181 17.3287 12.0324 17.2836 12.1823 17.3221L12.5554 15.8693C11.9675 15.7183 11.2845 15.8409 10.8016 16.3238L11.8623 17.3845ZM7.67591 13.1987C8.15857 12.716 8.28182 12.0329 8.13075 11.4446L6.67789 11.8177C6.7163 11.9672 6.67127 12.082 6.61525 12.138L7.67591 13.1987ZM9.38736 18.7929L7.63832 17.063L6.58351 18.1294L8.33255 19.8593L9.38736 18.7929ZM18.4468 5.55324C19.213 6.3195 19.734 7.23555 20.0119 8.20635L21.454 7.79365C21.1079 6.58425 20.4583 5.4435 19.5074 4.49258L18.4468 5.55324ZM19.9617 11.7733C19.6735 12.6821 19.1692 13.5376 18.4468 14.2601L19.5074 15.3207C20.4038 14.4244 21.0325 13.3592 21.3916 12.2267L19.9617 11.7733Z" fill="#1C274C"/></svg>
          </div>

        </WrapHeaderBox>
        )}


        <div ref={containAppRef} onScroll={handleScroll} className={`contain-app ${isMobile ? 'mobile-contain-app' : 'desktop-contain-app'}  ${infoApp?.appType == 2 ? 'full-contain-app' : ''}`}>

            {infoApp?.appType == 0 ? <ThreadChat /> : "" }

            {infoApp?.appType == 1 ? <ThreadPost /> : "" }

            {infoApp?.appType == 2 ? <ThreadVideo /> : "" }

            {infoApp?.id == 99 ? <Manage /> : "" }
            
            {infoApp?.id == 999 ? <Account /> : "" }

            {infoApp?.id == 777 ? <Welcome /> : "" }

        </div>

    </div>
  )
}

export default CenterBox