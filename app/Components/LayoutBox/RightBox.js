import React, { useContext, useState } from 'react'
import WrapHeaderBox from './WrapHeaderBox'
import { WindowContext } from '@/app/Context/WindowContext';
import { AppsConext } from '@/app/Context/AppsContext';
import { shortenAddress } from '@/app/helper/shortenAddress';
import { env_SMARTCHAIN } from '@/app/env';
import { env_LANG } from '@/app/env_lang';
import Link from 'next/link';

const RightBox = ({}) => {

  const { closeRight, language, setNotice_pop_state } = useContext(WindowContext);
  const { infoApp, displayApp, changeDisplayApp } = useContext(AppsConext);

  return (
    <div className='layout-right-box'>

        <WrapHeaderBox>
          
          <div className='title-layout-right-box'>{env_LANG[language].right_bar[0]}</div>
          <div className="btn-closeRightBox non-select" onClick={closeRight}>
            <svg viewBox="0 0 24 24"><path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#0F0F0F"/></svg>
          </div>

        </WrapHeaderBox>

        <div className='body-right-box body-left-box'>

            <div className={String("head-infoApp image-type-app-"+(infoApp?.appType))} >
                <svg fill="#000000" viewBox="0 0 24 24" id="edit-circle">
                    <circle id="primary" cx="12" cy="12" r="10"></circle>
                    <path id="secondary" d="M20.91,4.5,19.5,3.09a2,2,0,0,0-2.83,0L10.24,9.51a1,1,0,0,0-.29.73L10,13a1,1,0,0,0,1,1l2.78.05h0a1,1,0,0,0,.71-.29l6.42-6.43A2,2,0,0,0,20.91,4.5Z">
                    </path>
                </svg>
                <div>
                    <p>{infoApp?.title}</p>
                    <span>
                        {infoApp?.appType == 0 ? (<span>Chat</span>) : ""}
                        {infoApp?.appType == 1 ? (<span>Post</span>) : ""}
                        {infoApp?.appType == 2 ? (<span>System</span>) : ""}
                        <span>@{infoApp?.id}</span>
                    </span>
                </div>
            </div>

            <div onClick={ () => { 
                setNotice_pop_state(true); 
                try {
                  navigator?.clipboard.writeText(window?.location?.href);  
                } catch (error) {
                  console.log(error);
                }
              } } className='btn-shareApp'>
              <span>
                  <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2.4987C10 1.11897 11.1202 0 12.5 0C13.8798 0 15 1.11897 15 2.4987C15 3.87843 13.8798 4.99739 12.5 4.99739C12.119 4.99739 11.7578 4.91209 11.4345 4.75954L9.13117 7.51937L11.1694 10.3767C11.5549 10.1339 12.0111 9.99347 12.5 9.99347C13.8798 9.99347 15 11.1124 15 12.4922C15 13.8719 13.8798 14.9909 12.5 14.9909C11.1202 14.9909 10 13.8719 10 12.4922C10 11.9665 10.1626 11.4788 10.4401 11.0763L8.24567 8H4.94895C4.71527 9.13796 3.70698 9.99413 2.5 9.99413C1.12017 9.99413 0 8.87516 0 7.49543C0 6.1157 1.12017 4.99673 2.5 4.99673C3.71021 4.99673 4.72066 5.85749 4.95081 7L8.26212 7L10.6327 4.15968C10.2392 3.71816 10 3.13627 10 2.4987Z"/>
                  </svg>
                  <p>{env_LANG[language].right_bar[2]}</p>
              </span>
            </div>

            <div className='contain-switch'>
              <label className="switch">
                <input type="checkbox"
                        checked={displayApp}
                        onChange={(e) => changeDisplayApp(!displayApp)}/>
                <span className="slider round"></span>
              </label>
            </div>

            {infoApp ?
            <ul className="contract-details">
              <li>
                <span className="label">{env_LANG[language].right_bar[3]}:</span>
                <Link rel="noopener noreferrer" target="_blank" href={ env_SMARTCHAIN.NETWORKS[infoApp?.idNetwork].blockExplorerUrls[0]+'/address/'+infoApp?.appAddress }><span className="value">{shortenAddress(String(infoApp ? infoApp?.appAddress : "..."))}</span></Link>
              </li>
              <li>
                <span className="label">{env_LANG[language].right_bar[4]}:</span>
                <Link rel="noopener noreferrer" target="_blank" href={ env_SMARTCHAIN.NETWORKS[infoApp?.idNetwork].blockExplorerUrls[0] }><span className="value">{infoApp ? env_SMARTCHAIN.NETWORKS[infoApp?.idNetwork]?.chainName : "..."}</span></Link>
              </li>
              <li>
                <span className="label">{env_LANG[language].right_bar[5]}:</span>
                <Link rel="noopener noreferrer" target="_blank" href={ env_SMARTCHAIN.NETWORKS[infoApp?.idNetwork].blockExplorerUrls[0]+'/address/'+infoApp?.creatorAddress }><span className="value">{shortenAddress(String(infoApp ? infoApp?.creatorAddress : "..."))}</span></Link>
              </li>
              {infoApp?.timestamp ? 
              <li>
                <span className="label">{env_LANG[language].right_bar[6]}:</span>
                <span className="value">{language === 'vi' ? new Date(Number(infoApp?.timestamp) * 1000).toLocaleString('vi-VN') : new Date(Number(infoApp?.timestamp) * 1000).toLocaleString()}</span>
              </li>
              : ""}
            </ul>
            : ""}
        </div>
    </div>
  )
}

export default RightBox


            
            {/* <div className='intro-infoApp'>
              <p>Nhật ký là bản ghi chép với các mục riêng biệt được sắp xếp theo ngày dùng để thuật lại những gì đã diễn ra trong suốt một ngày hoặc giai đoạn khác nhau.
              </p>
            </div> */}