'use client';

import { useEffect, useRef } from 'react';
import 'plyr/dist/plyr.css';
import Hls from 'hls.js';

const HLSVideoPlayer = ({ src, isPlay }) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);

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
      playerRef.current = new Plyr(video, {});
      
    }, [src, videoRef]);

    useEffect(() => {
        console.log(isPlay)
        if(isPlay){
                const buttons = document.querySelectorAll('.plyr__controls__item.plyr__control[data-plyr="play"]');
                if (buttons.length >= 2) {
                  const playButton = buttons[1]; // Select the second button
                  playButton.click();
                }
              
                playerRef.current.play();

                const playPromise = videoRef.current.play();

                if (playPromise !== undefined) {
                  playPromise
                    .then(() => {
                      // Playback has started
                      alert('Playback started');
                    })
                    .catch(error => {
                      // Playback failed
                      alert('Playback failed: ' + error.message);

                    });
                }
        }else{
            videoRef.current.pause();
        }
    }, [isPlay])
  
    return (
        <video data-displaymaxtap playsInline ref={videoRef}/>
    );
}

export default HLSVideoPlayer