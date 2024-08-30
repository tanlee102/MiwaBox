'use client';

import React, { Suspense, useContext } from "react";
import Link from "next/link";
import WrapHeaderBox from "./WrapHeaderBox";
import Dropdown from "../DropDown/DropDown";
import ListApp from "../ListApp";
import SearchBar from "../SearchBar";
import { WindowContext } from "@/app/Context/WindowContext";
import { useRouter } from 'next/navigation'
import { AccountContext } from "@/app/Context/AccountContext";
import { AppsConext } from "@/app/Context/AppsContext";
import { env_LANG } from "@/app/env_lang";
import { RootLayoutContext } from "@/app/Context/RootLayoutContext";


const LeftBox = ({setDisplayModalCreate}) => {

  const router = useRouter();

  const { connect, account } = useContext(AccountContext);
  const { myUser, setDisplayMiniProfile, login } = useContext(RootLayoutContext);
  const { closeLeft, language } = useContext(WindowContext);
  const { setOrderListApp, orderListApp, orderPrivacy, setOrderPrivacy } = useContext(AppsConext);

  return (
    <>
    <div className="layout-left-box">

      <WrapHeaderBox>

        <div className="MiwaBox-logo-container non-select">
          <Link href={"/"}>
            <img className="MiwaBox-logo" src="/miwabox_.png"></img>
          </Link>
        </div>

        <div className="btn-showRightBox btn-add-app non-select" onClick={() => {setDisplayModalCreate(true)}}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" strokeWidth="1.5"/><path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </div>

        <div className="btn-closeLeftBox btn-showRightBox non-select" onClick={closeLeft}>
            <svg fill="#000000" viewBox="0 0 52 52"><path d="M21.5,40.6,7.9,27.1a1.57,1.57,0,0,1,0-2.2L21.5,11.4a1.57,1.57,0,0,1,2.2,0l2.2,2.2a1.57,1.57,0,0,1,0,2.2l-9.4,9.1a1.57,1.57,0,0,0,0,2.2l9.3,9.1a1.57,1.57,0,0,1,0,2.2l-2.2,2.2A1.66,1.66,0,0,1,21.5,40.6Z"/><path d="M39.6,40.6,25.8,27.1a1.57,1.57,0,0,1,0-2.2L39.6,11.4a1.57,1.57,0,0,1,2.2,0L44,13.6a1.57,1.57,0,0,1,0,2.2l-9.4,9.1a1.57,1.57,0,0,0,0,2.2l9.3,9.1a1.57,1.57,0,0,1,0,2.2l-2.2,2.2A1.66,1.66,0,0,1,39.6,40.6Z"/></svg>          
        </div>

      </WrapHeaderBox>

      <div className="body-left-box">
          
          <Suspense fallback={<>Searching...</>}>
              <SearchBar closeLeft={closeLeft}></SearchBar>
          </Suspense>

          <div className="dropdowns-left-box">
            <Dropdown options={env_LANG[language].dropdown_type} indexOption={orderPrivacy} setIndexOption={setOrderPrivacy} />
            <Dropdown options={env_LANG[language].dropdown_sorting} indexOption={orderListApp} setIndexOption={setOrderListApp} />
          </div>

          <div className="list-app">
              <ListApp/>
          </div>

          <div className="connect-wallet non-select">
            <p>TE</p>
            <div onClick={() => {(myUser) ? setDisplayMiniProfile(true) : login();}} id="connect-google">
              <img src={myUser ? myUser.photoURL : "/icon/item/google.png"} />
            </div>
            
            <div>
              <span>
                <svg aria-label="Ethereum" role="img" viewBox="0 0 512 512"><rect rx="15%" fill="#ffffff"/><path fill="#3C3C3B" d="m256 362v107l131-185z"/><path fill="#343434" d="m256 41l131 218-131 78-132-78"/><path fill="#8C8C8C" d="m256 41v158l-132 60m0 25l132 78v107"/><path fill="#141414" d="m256 199v138l131-78"/><path fill="#393939" d="m124 259l132-60v138"/></svg>
              </span>
              {account ? (<span onClick={() => router.push('/?id=999')}>{account}</span>) : (<span onClick={connect}>Kết nối ví ETH</span>)}
            </div>
          </div>

      </div>

    </div>
    <div onClick={closeLeft} className="layout-left-box-overlay"></div>
    </>
  )
}

export default LeftBox