'use client';

import { useEffect, useRef } from 'react';
import 'plyr/dist/plyr.css';
import Hls from 'hls.js';

const HLSVideoPlayer = ({ src, isPlay }) => {
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

    useEffect(() => {
        const video = videoRef.current;

        if(isPlay){
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
        }else{
            video.pause();
        }
    }, [isPlay])
  
    return (
        <video data-displaymaxtap playsInline ref={videoRef}/>
    );
}

export default HLSVideoPlayer