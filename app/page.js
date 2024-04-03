'use client';

import './css/LayoutBox.css'
import './css/LayoutBox/CenterBox.css'
import './css/LayoutBox/LeftBox.css'
import './css/LayoutBox/LeftBoxRes.css'
import './css/LayoutBox/RightBox.css'
import './css/LayoutBox/RightBoxRes.css'

import './css/ListApp.css'
import './css/Create.css'

import './css/Apps/Account.css'
import './css/Apps/Thread.css'
import './css/Apps/ThreadRes.css'
import './css/Apps/ThreadChat.css'
import './css/Apps/ThreadChatRes.css'
import './css/Apps/ThreadPost.css'
import './css/Apps/InputThread.css'
import './css/Apps/Welcome.css'
import './css/Apps/Manage.css'


import React, { useState } from "react";
import { MetaMaskProvider } from "@metamask/sdk-react";

import CenterBox from "./Components/LayoutBox/CenterBox";
import LeftBox from "./Components/LayoutBox/LeftBox";
import RightBox from "./Components/LayoutBox/RightBox";

import Modal from "./Components/Dialog/Modal";
import Create from "./Components/Create";
import ButtonCreate from "./Components/ButtonCreate";
import TitleCreate from "./Components/TitleCreate";

import LayoutProvider  from './Context/LayoutContext';
import AccountProvider from "./Context/AccountContext";
import AppsProvider from "./Context/AppsContext";
import InputProvider from "./Context/InputContext";
import ThreadProvider from "./Context/ThreadContext";
import WindowProvider from "./Context/WindowContext";

import ImageViewer from "./Components/Dialog/ImageViewer";
import NoticePopout from "./Components/NoticePopout";

export default function HomePage() {

  const host = typeof window !== "undefined" ? window.location.host : "miwabox.live";
  
  const [displayModalCreate, setDisplayModalCreate] = useState(false);

  return (
    <WindowProvider>
      <MetaMaskProvider
        debug={false}
        sdkOptions={{
            dappMetadata: {
                name: "MiwaBox",
                url: host
            },
        }}
      >
        <AccountProvider>
          <LayoutProvider>
            <AppsProvider>
              <InputProvider>
                <ThreadProvider>
                <div className="box-container">
                    <LeftBox setDisplayModalCreate={setDisplayModalCreate}></LeftBox>
                    <CenterBox></CenterBox>
                    <RightBox></RightBox>
                </div>
                <Modal setDisplayModal={setDisplayModalCreate} displayModal={displayModalCreate} title={<TitleCreate/>} body={<Create/>} footer={<ButtonCreate/>} displayfooter={true}></Modal>
                <ImageViewer></ImageViewer>
                <NoticePopout/>
                </ThreadProvider>
              </InputProvider>
            </AppsProvider>
          </LayoutProvider>
        </AccountProvider>
      </MetaMaskProvider>
    </WindowProvider>
  );
}
