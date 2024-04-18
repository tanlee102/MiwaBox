import React, { useContext, useEffect } from 'react'
import InputThread from './InputThread'
import { ThreadContext } from '@/app/Context/ThreadContext'
import { AppsConext } from '@/app/Context/AppsContext';
import { AccountContext } from '@/app/Context/AccountContext';
import { WindowContext } from '@/app/Context/WindowContext';
import { sanitizeAndUrlify } from '@/app/helper/sanitizeAndUrlify';

const ThreadPost = () => {

  const { showImageViewer } = useContext(WindowContext);
  const { infoApp } = useContext(AppsConext);
  const { account } = useContext(AccountContext);
  const { getTexts, listMessage, loader } = useContext(ThreadContext);

  useEffect(() => {
      if(infoApp){
          getTexts(true);
      }
  }, [infoApp]);

  return (
    <div className="contain-thread">
      <div className="content-thread post-thread">

          {listMessage?.map((item, index) => (
            <>
            {item.type === 0 ? 
              <p  key={index} 
                  className={`${item.bold ? 'ps-bold' : ''} ${item.center ? 'ps-center' : ''} ${item.head ? 'ps-head' : ''}`} 
                  dangerouslySetInnerHTML={{ __html: sanitizeAndUrlify(item.value) }} 
                  ></p>
            : 
              <p key={index} className={`${item.bold ? 'ps-bold' : ''} ${item.center ? 'ps-center' : ''} ${item.head ? 'ps-head' : ''}`}>
                {item.type === 1 && <img onClick={() => {showImageViewer(item.value)}} loading="lazy" src={item.value} />}
                {item.type === 2 && <video src={item.value} controls />}
              </p>
            }
            </>
       
          ))}

          {/* <div style={{display: loader ? "flex" : "none"}} className='contain-loader-hozon'>
            <div className="loader-hozon"></div>
          </div> */}
        
      </div>

      {String(account)?.toLowerCase() === infoApp?.creatorAddress.toLowerCase() ? <InputThread></InputThread> : ""}  
    </div>
  )
}

export default ThreadPost