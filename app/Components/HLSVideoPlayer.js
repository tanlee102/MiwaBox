import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const HLSVideoPlayer = ({ src }) => {
    const videoRef = useRef(null);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;
  
      video.controls = true;
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
      }else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = src;
      }else {
        console.error(
          'This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API'
        );
      }
    }, [src, videoRef]);
  
    return (
        <video data-displaymaxtap  ref={videoRef}/>
    );
}

export default HLSVideoPlayer