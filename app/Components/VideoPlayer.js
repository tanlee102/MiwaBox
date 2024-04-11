'use client';

import { useEffect, useRef } from 'react';
import 'plyr/dist/plyr.css';
import Hls from 'hls.js';

const HLSVideoPlayer = ({ src, isPlay=false }) => {
    const videoRef = useRef(null);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;
  
      video.controls = true;
      video.playsInline = true;
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
      }else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
      }else {
        try {
          video.src = src;
        } catch (error) {
          console.error('Error setting video source:', error);
        }
        console.error('This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API');
      }

      const Plyr = require('plyr');
      new Plyr(video, {});
      
    }, [src, videoRef]);

    // useEffect(() => {

    //     setTimeout(() => {
    //         const video = videoRef.current;

    //         if(isPlay){
    //             video.muted = false;
    //             const playPromise = video.play();
    //             if (playPromise !== undefined) {
    //                 playPromise
    //                 .catch(error => {
    //                     console.log(error)
    //                     video.muted = true;
    //                     video.play()
    //                     .catch(error => {
    //                         console.log('Replay failed: ', error.message);
    //                     });
    //                 });
    //             }
    //         }else{
    //             video.pause();
    //         }
    //     }, 300)

    // }, [isPlay])




    // useEffect(() => {

    //     if(isPlay == true){
    //         const video = videoRef.current;
    
    //         const playVideo = () => {
    //             const playPromise = video.play();
    //             if (playPromise !== undefined) {
    //                 playPromise
    //                     .catch(error => {
    //                         console.log(error);
    //                         video.muted = true;
    //                         video.play()
    //                             .catch(error => {
    //                                 console.log('Replay failed: ', error.message);
    //                             });
    //                     });
    //             }
    //         };
        
    //         const onLoad = () => {
    //             video.removeEventListener('loadedmetadata', onLoad);
    //             video.removeEventListener('loadeddata', onLoad);
    //             playVideo();
    //         };
        
    //         video.addEventListener('loadedmetadata', onLoad);
    //         video.addEventListener('loadeddata', onLoad);
        
    //         return () => {
    //             video.removeEventListener('loadedmetadata', onLoad);
    //             video.removeEventListener('loadeddata', onLoad);
    //         };
    //     }

    // }, []);
    
    // useEffect(() => {
    //     const video = videoRef.current;
    
    //     if (!isPlay) {
    //         video.pause();
    //     }else{
    //         const playPromise = video.play();
    //         if (playPromise !== undefined) {
    //             playPromise
    //                 .catch(error => {
    //                     console.log(error);
    //                     video.muted = true;
    //                     video.play()
    //                         .catch(error => {
    //                             console.log('Replay failed: ', error.message);
    //                         });
    //                 });
    //         }
    //     }
    // }, [isPlay]);



    // useEffect(() => {
    //     const video = videoRef.current;
    
    //     const playVideo = () => {
    //         const playPromise = video.play();
    //         if (playPromise !== undefined) {
    //             playPromise
    //                 .catch(error => {
    //                     console.log(error);
    //                     video.muted = true;
    //                     video.play()
    //                         .catch(error => {
    //                             console.log('Replay failed: ', error.message);
    //                         });
    //                 });
    //         }
    //     };
    
    //     const onLoad = () => {
    //         video.removeEventListener('loadedmetadata', onLoad);
    //         video.removeEventListener('loadeddata', onLoad);
    //         playVideo();
    //     };
    
    //     if (isPlay) {
    //         video.addEventListener('loadedmetadata', onLoad);
    //         video.addEventListener('loadeddata', onLoad);
    //         playVideo(); // Play the video immediately if isPlay is true
    //     } else {
    //         video.pause();
    //     }
    
    //     return () => {
    //         video.removeEventListener('loadedmetadata', onLoad);
    //         video.removeEventListener('loadeddata', onLoad);
    //     };
    // }, [isPlay]);
  
    return (
        <video data-displaymaxtap playsInline ref={videoRef}/>
    );
}

export default HLSVideoPlayer