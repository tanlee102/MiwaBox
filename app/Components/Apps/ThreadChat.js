import React, { useContext, useEffect } from 'react'
import InputThread from './InputThread'
import { ThreadContext } from '@/app/Context/ThreadContext'
import { AccountContext } from '@/app/Context/AccountContext'
import { AppsConext } from '@/app/Context/AppsContext'
import { WindowContext } from '@/app/Context/WindowContext'
import { sanitizeAndUrlify } from '@/app/helper/sanitizeAndUrlify'
import HLSVideoPlayer from '../HLSVideoPlayer'
import { iconAvatars } from '@/app/env_setting'

const ThreadChat = () => {

    const { showImageViewer, language } = useContext(WindowContext);
    const { infoApp } = useContext(AppsConext);
    const { getMessages, listMessage, loadLatest, loader } = useContext(ThreadContext);

    useEffect(() => {
        if(infoApp){
            getMessages(true);
        }
    }, [infoApp]);

  return (
    <div className="contain-thread">

        <div className="content-thread">

            <div style={{display: loader ? "flex" : "none"}} className='contain-loader-hozon'>
                <div className="loader-hozon"></div>
            </div>

            {listMessage?.map((item, index) => (
                <div key={item.index} style={{marginTop: item.icon ? '20px' : '0px'}}  className="item-chat-thread">
                    <span className='avatar-chat-thread' style={{backgroundColor:  item.icon ? "rgb(235, 235, 235)" : "transparent", marginTop: item.icon ? '18px' : '0px'}}>{item.icon ? <img src={`/icon/${iconAvatars[item.idIcon]}`}/> : "" }</span>
                    <span className='text-chat-thread'>
                        {item.icon ? <span>{item.name ? item.name : "Incognito"}</span> : ""}
                        {item.type == 0 ? 
                            <p dangerouslySetInnerHTML={{ __html: sanitizeAndUrlify(item.value) }}></p>
                        : item.type == 1 ?
                            <img loading='eager' onClick={() => {showImageViewer(item.value)}} src={item.value} />
                            : 
                            String(item.value).includes(".m3u8") ?
                                <HLSVideoPlayer src={item.value} />
                                :
                                <video src={item.value} controls />
                            }
                        {listMessage[index+1]?.icon || (index+1 == listMessage.length) ? <span>{language === 'vi' ? new Date(Number(item.timestamp) * 1000).toLocaleString('vi-VN') : new Date(Number(item.timestamp) * 1000).toLocaleString()}</span> : ""}
                    </span>
                </div>
            ))}

            <div style={{display: loadLatest ? "flex" : "none"}} className='contain-loader-hozon'>
                <div className="loader-hozon"></div>
            </div>

        </div>

        <InputThread></InputThread>    

    </div>
  )
}

export default ThreadChat
