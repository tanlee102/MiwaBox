'use client';

import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const VideoPlayer = ({ src, isPlay=false }) => {
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
      
    }, [src, videoRef]);






    useEffect(() => {

        if(isPlay){
            const video = videoRef.current;

            const playVideo = () => {
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
            };
        
            const onLoad = () => {
                video.removeEventListener('loadedmetadata', onLoad);
                video.removeEventListener('loadeddata', onLoad);
                playVideo();
            };
        
            video.addEventListener('loadedmetadata', onLoad);
            video.addEventListener('loadeddata', onLoad);
        
            return () => {
                video.removeEventListener('loadedmetadata', onLoad);
                video.removeEventListener('loadeddata', onLoad);
            };
        }

    }, [src, videoRef]);

    
  
    return (
        <video data-displaymaxtap playsInline controls ref={videoRef}/>
    );
}

export default VideoPlayer