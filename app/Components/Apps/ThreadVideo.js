'use client';

import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'

import '../../css/Apps/VideoThread.css'
import '../../css/Apps/VideoThreadRes.css'

import { VideoThreadContext } from '@/app/Context/VideoThreadContext'
import { AppsConext } from '@/app/Context/AppsContext'
import { AccountContext } from '@/app/Context/AccountContext'
import { WindowContext } from '@/app/Context/WindowContext'

import VideoPlayer from '../VideoPlayer';

import { useRouter } from 'next/navigation'
import { url_image_domain } from '@/app/env_video'


const ThreadVideo = () => {

    const router = useRouter();

    const {setDisplayCreateVideo, 
           data, gridData, onLoadData,
           scrolDex, setScrolDex, 
           isDisplayGrid, setIsDisplayGrid, 
           setIsScrollToBottomGrid, isScrollToBottomGrid } = useContext(VideoThreadContext);

    const {infoApp} = useContext(AppsConext);
    const {account} = useContext(AccountContext);
    const {currentIndex, showLeft} = useContext(WindowContext);

    const preDex = useRef(0);
    const containerRef = useRef(null);
    const itemsRef = useRef(null);
    const preOffsetHeight = useRef(null);

    const [username, setUsernam] = useState('');
    const [link1, setLink1] = useState('');
    const [link2, setLink2] = useState('');


    useLayoutEffect(() => {
        if(data.length > 0){
            containerRef.current = document.querySelector(".video-thread");
            itemsRef.current = containerRef.current.children;
            
            const onScroll = function(e) {
                e.preventDefault();

                const itemHeight = document.querySelector(".video-thread div").offsetHeight;
                const currentOffsetHeight = Number(document.querySelector(".video-thread div").offsetHeight);
                
                const currentIndexVideo = Math.round(Number(containerRef.current.scrollTop) / itemHeight);
                setScrolDex(currentIndexVideo);
    
                if(preDex.current != currentIndexVideo && preOffsetHeight.current == currentOffsetHeight){
    
                    const previousVideo = itemsRef?.current[preDex.current]?.querySelector("video");
                    if (previousVideo && !previousVideo?.paused) {
                        previousVideo.pause();
                    }
    
                    const currentVideo = itemsRef?.current[currentIndexVideo]?.querySelector("video");
                    if (currentVideo && currentVideo?.paused) {
                        const playPromise = currentVideo.play();
                        if (playPromise !== undefined) {
                            playPromise
                                .catch(error => {
                                    currentVideo.muted = true;
                                    currentVideo.play()
                                        .catch(error => {
                                            console.log('Replay failed: ', error.message);
                                        });
                                });
                        }
                    }
    
                    preDex.current = currentIndexVideo    
                }
                preOffsetHeight.current = currentOffsetHeight;
            };
    
            containerRef.current.addEventListener("scroll", onScroll);
            return () => {
                containerRef.current.removeEventListener("scroll", onScroll);
            }
        }
    }, [data]);
    



    const moveToIndex = (index) => {
        if(index >= 0 && index < data.length){
            let itemHeight = document.querySelector(".video-thread div").offsetHeight;

            let previousVideo = itemsRef.current[preDex.current]?.querySelector("video");
            if (previousVideo) {
                previousVideo.pause();
            }
                
            containerRef.current.scrollTop = itemHeight*index;
            setScrolDex(index);
            preDex.current = index

            setIsDisplayGrid(false);
    
            setTimeout(() => {
                let currentVideo = itemsRef.current[index]?.querySelector("video");
                if (currentVideo) {
                    currentVideo.play();
                }
            }, 888);
        }
    }



    useEffect(() => {
        if(isDisplayGrid){
            let video = itemsRef.current[preDex.current]?.querySelector("video");
            if (video && !video?.paused) {
                video.pause();
            }
        }
    },[isDisplayGrid]);



    const refGridContainer = useRef();
    const isScrollToBottomGridRef = useRef(isScrollToBottomGrid);

    useEffect(() => {
        isScrollToBottomGridRef.current = isScrollToBottomGrid;
    }, [isScrollToBottomGrid]);
    
    useEffect(() => {
        if(infoApp && infoApp.appType == 2){
            const handleScroll = () => {
                const { scrollHeight, scrollTop, clientHeight } = refGridContainer.current;
                const bottom = scrollHeight - scrollTop;
                if (bottom <= clientHeight + 50) {
                    setIsScrollToBottomGrid(!isScrollToBottomGridRef.current);
                }
            };
            refGridContainer?.current?.addEventListener('scroll', handleScroll);
            return () => refGridContainer?.current?.removeEventListener('scroll', handleScroll);
        }
    }, [infoApp]);
    
    


    const [isMobile, setIsMobile] = useState(true);
    useLayoutEffect(() => {
        const checkDeviceType = () => {
            const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|.*Tablet.*|.*Touch/i.test(navigator.userAgent);
            setIsMobile(isMobileDevice);
        };
        checkDeviceType();
    }, []);



    useEffect(() => {
        if(infoApp && infoApp?.appType == 2 && data.length > 0)
            if(scrolDex || scrolDex == 0){
                if(data[scrolDex]){
                    setUsernam(data[scrolDex]?.username);
                    let dataLink = data[scrolDex]?.link;
                    if(dataLink){
                        setLink1(dataLink[0]);
                        setLink2(dataLink[dataLink.length - 1]); 
                    }
                }
            }
    }, [scrolDex, data])



    const openNewWindow = (url) => {
        window.open(url, '_blank')
    }



  return (
    <div className='video-thread-container'>


        <div className='head-video-thread'>

            <span className="btn-showLeftBox-ofVideoThread non-select" onClick={showLeft}>
                <svg viewBox="0 0 24 24">
                <path d="M5 6H12H19M5 12H19M5 18H19" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </span>

            <span id='username-video-thread' onClick={() => {openNewWindow(link1)}}>@{username}</span>

            <span onClick={() => {openNewWindow(link2)}} id='download-btn-video-thread'>
                <svg viewBox="0 0 24 24" fill="none"><path d="M12.5 4V17M12.5 17L7 12.2105M12.5 17L18 12.2105" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 21H19" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>

            {String(infoApp?.creatorAddress).toLowerCase() === String(account).toLowerCase() ?
            <span onClick={() => {setDisplayCreateVideo(true)}} id='btn-add-video-thread'>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" strokeWidth="1.5"></circle><path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" strokeWidth="1.5" strokeLinecap="round"></path></svg>
            </span>
            :""}

            <span onClick={() => {setIsDisplayGrid(!isDisplayGrid)}}>
                {isDisplayGrid==false ? 
                    <svg viewBox="0 -0.5 21 21">
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Dribbble-Light-Preview" transform="translate(-139.000000, -200.000000)" fill="#000000">
                                <g id="icons" transform="translate(56.000000, 160.000000)">
                                    <path d="M101.9,57.009 C101.9,57.56 101.38235,58 100.80275,58 L97.65275,58 C97.0742,58 96.65,57.56 96.65,57.009 L96.65,54.009 C96.65,53.458 97.0742,53 97.65275,53 L100.80275,53 C101.38235,53 101.9,53.458 101.9,54.009 L101.9,57.009 Z M100.80275,51 L97.65275,51 C95.9129,51 94.55,52.352 94.55,54.009 L94.55,57.009 C94.55,58.666 95.9129,60 97.65275,60 L100.80275,60 C102.5426,60 104,58.666 104,57.009 L104,54.009 C104,52.352 102.5426,51 100.80275,51 L100.80275,51 Z M90.35,57.009 C90.35,57.56 89.83235,58 89.25275,58 L86.10275,58 C85.5242,58 85.1,57.56 85.1,57.009 L85.1,54.009 C85.1,53.458 85.5242,53 86.10275,53 L89.25275,53 C89.83235,53 90.35,53.458 90.35,54.009 L90.35,57.009 Z M89.25275,51 L86.10275,51 C84.3629,51 83,52.352 83,54.009 L83,57.009 C83,58.666 84.3629,60 86.10275,60 L89.25275,60 C90.9926,60 92.45,58.666 92.45,57.009 L92.45,54.009 C92.45,52.352 90.9926,51 89.25275,51 L89.25275,51 Z M101.9,46.009 C101.9,46.56 101.38235,47 100.80275,47 L97.65275,47 C97.0742,47 96.65,46.56 96.65,46.009 L96.65,43.009 C96.65,42.458 97.0742,42 97.65275,42 L100.80275,42 C101.38235,42 101.9,42.458 101.9,43.009 L101.9,46.009 Z M100.80275,40 L97.65275,40 C95.9129,40 94.55,41.352 94.55,43.009 L94.55,46.009 C94.55,47.666 95.9129,49 97.65275,49 L100.80275,49 C102.5426,49 104,47.666 104,46.009 L104,43.009 C104,41.352 102.5426,40 100.80275,40 L100.80275,40 Z M90.35,46.009 C90.35,46.56 89.83235,47 89.25275,47 L86.10275,47 C85.5242,47 85.1,46.56 85.1,46.009 L85.1,43.009 C85.1,42.458 85.5242,42 86.10275,42 L89.25275,42 C89.83235,42 90.35,42.458 90.35,43.009 L90.35,46.009 Z M89.25275,40 L86.10275,40 C84.3629,40 83,41.352 83,43.009 L83,46.009 C83,47.666 84.3629,49 86.10275,49 L89.25275,49 C90.9926,49 92.45,47.666 92.45,46.009 L92.45,43.009 C92.45,41.352 90.9926,40 89.25275,40 L89.25275,40 Z" id="menu_navigation_grid-[#1528]"></path>
                                </g>
                            </g>
                        </g>
                    </svg>
                :
                    <svg viewBox="0 0 24 24"><path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#0F0F0F"></path></svg> 
                }
            </span>

        </div>


        <div className="contain-grid-video-thread" style={{ transform: isDisplayGrid === false ? "translateX(100%)" : "translateX(0)" }}>
            <div ref={refGridContainer} className={`content-grid-video-thread ${isMobile ? 'mobile-content-grid-video-thread' : 'desktop-content-grid-video-thread'}`}>
                <div className='grid-video-thread'>
                    {gridData?.map((item, index) => (
                        <span className={scrolDex === index ? 'chose-played-video' : ''} key={index} onClick={() => {router.push('/?id='+currentIndex+'&vi='+item.id); moveToIndex(index) }}>
                            <img src={ url_image_domain + item?.thumbUrl + '.jpeg'} />
                        </span>
                    ))}
                </div>

                <div style={{display: onLoadData ? "flex" : "none"}} className='contain-loader-hozon'>
                    <div className="loader-hozon"></div>
                </div>

            </div>
        </div>


        <div className='step-video-thread-button non-select'>
            <div onClick={() => {moveToIndex(scrolDex - 1)}}>
                <svg viewBox="0 0 24 24" fill="none">
                    <path d="M17 15L12 10L7 15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <div onClick={() => {moveToIndex(scrolDex + 1)}}>
            <svg viewBox="0 0 24 24" fill="none">
                    <path d="M17 15L12 10L7 15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
        
        
        <div className='video-thread' onClick={() => {setIsDisplayGrid(false)}}>
            {data?.map((item, index) => (
                <div key={index}>
                    {index == scrolDex || index == scrolDex - 1 || index == scrolDex + 1  ?
                        <div className='contain-plyr'>
                            <VideoPlayer isMobile={isMobile} isPlay={index == 0 && index == scrolDex}  src={String(item?.videoUrl)} />
                        </div>
                        : 
                        null
                    }
                </div>
            ))}
        </div>


    </div>
  )
}

export default ThreadVideo