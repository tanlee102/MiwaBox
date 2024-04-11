'use client';

import { useEffect, useRef } from 'react';
import 'plyr/dist/plyr.css';
import Hls from 'hls.js';

const HLSVideoPlayer = ({ src }) => {
    const videoRef = useRef(null);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;
  
      // video.controls = true;
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
  
    return (
        <video data-displaymaxtap  ref={videoRef}/>
    );
}

export default HLSVideoPlayer