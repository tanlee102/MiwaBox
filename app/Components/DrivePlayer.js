import React, { useContext, useRef, useEffect, useState } from 'react'
import { VideoThreadContext } from '../Context/VideoThreadContext';
import { url_host_domain_video_page, url_video_domain } from '../env_video';

import MyPlayer from './Video/MyPlayer';

const DrivePlayer = ({index, isPlay=false, isRound=false, isFrist=false}) => {
   
    const videoRef = useRef(null);
    const { videoDriveUrls, setVideoDriveUrls } = useContext(VideoThreadContext);
    const [videoSrc, setVideoSrc] = useState(null);


    const fetchVideoData = async (type) => {
      fetch(type == 0 ? (url_host_domain_video_page+'api/item?index='+index) : (url_video_domain+'file/get/'+index+'/drive'))
          .then(response => {
            if (response.status === 200) { // Check if status code is 200
              return response.json();
            }
          })
          .then(data => {
            const driveUrl = ((type == 0) ? data : data?.driveUrl );
            if (driveUrl && Array.isArray(driveUrl)) {
              const url = (driveUrl[driveUrl.length - 1])
              if(url){
                setVideoDriveUrls(prevArray => [...prevArray, {
                  index: index,
                  url: url
                }]);
                setVideoSrc(url);
              }
            }
          }).catch(error => {
            console.error(error);
            if(type == 0) fetchVideoData(1);
          });
    }


    useEffect(() => {
      const driveUrl = videoDriveUrls.find(obj => obj.index === index);
      if (driveUrl) {
        setVideoSrc(driveUrl.url)
      } else {
        fetchVideoData(1);
        if(isFrist){
          fetchVideoData(0);
        }else{
          fetchVideoData(1);
        }
      }
    }, []);


    useEffect(() => {
      const video = videoRef.current;
      if(video && videoSrc){
        if(isPlay){
          setTimeout(() => {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise
                    .catch(error => {
                        video.muted = true;
                        video.play()
                            .catch(error => {
                                console.log('Replay failed: ', error.message);
                            });
                    });
            }
          }, 100);
        }else{
          video.pause();
        }
      }
    }, [isPlay, videoSrc]);

    
    return (
      <>
        { !isRound || !videoSrc ?
          <div className='video-drive-player'>
            <div className='contain-loader-hozon'>
                <div className="loader-hozon"></div>
            </div>
          </div> 
        : 
          <MyPlayer videoRef={videoRef} videoSrc={videoSrc}/>
        }
      </>
    )
}

export default DrivePlayer