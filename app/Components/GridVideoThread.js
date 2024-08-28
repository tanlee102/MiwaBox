import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { VideoThreadContext } from '../Context/VideoThreadContext';
import { WindowContext } from '../Context/WindowContext';
import { AppsConext } from '../Context/AppsContext';
import { useRouter } from 'next/navigation';
import { url_image_domain } from '../env_video';

const GridVideoThread = ({moveToIndex}) => {

    const { gridData, scrolDex, setIsScrollToBottomGrid, isScrollToBottomGrid, isDisplayGrid, onLoadData } = useContext(VideoThreadContext);
    const { currentIndex } = useContext(WindowContext);
    const { infoApp } = useContext(AppsConext);

    const router = useRouter();

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


  return (
    <div className="contain-grid-video-thread" style={{ transform: isDisplayGrid === false ? "translateX(100%)" : "translateX(0)" }}>
        <div ref={refGridContainer} className={`content-grid-video-thread ${isMobile ? 'mobile-content-grid-video-thread' : 'desktop-content-grid-video-thread'}`}>
            <div className='grid-video-thread'>
                {gridData?.map((item, index) => (
                    <span key={index} className={scrolDex === index ? 'chose-played-video' : ''} onClick={() => {router.push('/?id='+currentIndex+'&vi='+item.id); moveToIndex(index) }}>
                        <div>
                            <img src={ url_image_domain + item?.thumbUrl + '.jpeg'} />
                        </div>
                    </span>
                ))}
            </div>

            <div style={{display: onLoadData ? "flex" : "none"}} className='contain-loader-hozon'>
                <div className="loader-hozon"></div>
            </div>

        </div>
    </div>
  )
}

export default GridVideoThread
