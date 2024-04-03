'use client';

import React, { Suspense, useContext, useEffect, useState } from "react";
import WrapHeaderBox from "./WrapHeaderBox";
import Dropdown from "../DropDown/DropDown";
import ListApp from "../ListApp";
import SearchBar from "../SearchBar";
import { WindowContext } from "@/app/Context/WindowContext";
import { useRouter } from 'next/navigation'
import { AccountContext } from "@/app/Context/AccountContext";
import { AppsConext } from "@/app/Context/AppsContext";
import Link from "next/link";
import { env_LANG } from "@/app/env_lang";


const LeftBox = ({setDisplayModalCreate}) => {

  const router = useRouter();

  const { connect, account } = useContext(AccountContext);
  const { closeLeft, language } = useContext(WindowContext);
  const { setOrderListApp, orderListApp, orderPrivacy, setOrderPrivacy } = useContext(AppsConext);

  return (
    <>
    <div className="layout-left-box">

      <WrapHeaderBox>

        <div className="MiwaBox-logo-container">
          <div className="btn-showLeftBox non-select" onClick={closeLeft}>
            <svg viewBox="0 0 24 24"><path d="M5 6H12H19M5 12H19M5 18H19" stroke="#000000" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
          <Link href={"/"}>
            <img className="MiwaBox-logo" src="/miwabox_.png"></img>
          </Link>
        </div>

        <div className="btn-showRightBox btn-add-app non-select" onClick={() => {setDisplayModalCreate(true)}}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" strokeWidth="1.5"/><path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </div>

      </WrapHeaderBox>

      <div className="body-left-box">

          <div className="chose-type-network non-select">
            <span>
              <svg viewBox="0 0 16 16"><path d="M1.5 8a6.5 6.5 0 016.744-6.496.75.75 0 10.055-1.499 8 8 0 107.036 11.193.75.75 0 00-1.375-.6 6.722 6.722 0 01-.22.453A6.5 6.5 0 011.5 8zM11.74.926a.75.75 0 10-.703 1.326c.144.076.284.157.421.243a.75.75 0 00.8-1.27 7.995 7.995 0 00-.519-.299zM14.774 3.743a.75.75 0 00-1.27.799c.087.137.168.277.244.42a.75.75 0 001.326-.701 8.04 8.04 0 00-.3-.518zM15.995 7.7a.75.75 0 00-1.5.056 6.583 6.583 0 01.002.45.75.75 0 101.5.047 8.158 8.158 0 00-.002-.552z"/><path d="M11.78 5.22a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-2-2a.75.75 0 011.06-1.06l1.47 1.47 3.97-3.97a.75.75 0 011.06 0z"/></svg>
              Testnet
            </span>
            <span className="non-select" onClick={() => {alert("...STILL WORKING...")}}>
              <svg fill="none" viewBox="0 0 24 24"><path d="M20.95 14.55L14.56 20.94C13.16 22.34 10.86 22.34 9.45002 20.94L3.06001 14.55C1.66001 13.15 1.66001 10.85 3.06001 9.44001L9.45002 3.05C10.85 1.65 13.15 1.65 14.56 3.05L20.95 9.44001C22.35 10.85 22.35 13.15 20.95 14.55Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M6.25 6.25L17.75 17.75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M17.75 6.25L6.25 17.75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Mainnet
            </span>
          </div>
          
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

        // const { conFirmFun } = useContext(LayoutContext);
        // const loadBox = () =>{
        //   conFirmFun("xxxx", "xxxx");
        // }
        // <button style={{marginTop: '100px'}} onClick={loadBox}>Open</button> 