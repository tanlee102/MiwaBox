import React, { useContext, useRef, useEffect } from 'react'
import { VideoThreadContext } from '../Context/VideoThreadContext';

const DrivePlayer = ({index,  isPlay=false}) => {
   
    const videoRef = useRef(null);
    const { videoDriveUrls, setVideoDriveUrls } = useContext(VideoThreadContext);
    const host_url = 'https://one.miwabox.live'
    // const host_url = 'http://localhost:3000'

    const callPlay = async () => {
      if(isPlay){
        setTimeout(() => {
          const video = videoRef.current;
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
        }, 888);
      }
    }

    useEffect(() => {

      const video = videoRef.current;
      const driveUrl = videoDriveUrls.find(obj => obj.index === index);

      if (driveUrl) {

        console.log('has drive url')
        video.src = driveUrl.url
        callPlay();

      } else {

        fetch(host_url+'/drive/get/'+index+'/drive')
            .then(response => {
              if (response.status === 200) { // Check if status code is 200
                return response.json();
              }
            })
            .then(data => {
              const driveUrl = data?.driveUrl;
              if (driveUrl) {
                const url = (driveUrl[driveUrl.length - 1])
                setVideoDriveUrls(prevArray => [...prevArray, {
                  index: index,
                  url: url
                }]);
                video.src = url
                callPlay()
              }
            }).catch(error => {
              console.error(error);
            });

      }

    }, []);
    
    return (
      <>
        {!videoRef.current?.src ?
        <div className='video-drive-player'>
          <div className='contain-loader-hozon'>
              <div className="loader-hozon"></div>
          </div>
        </div> : ""}
        <video className='video-onedrive-player' playsinline controls loop ref={videoRef}></video>
      </>
    )
}

export default DrivePlayer