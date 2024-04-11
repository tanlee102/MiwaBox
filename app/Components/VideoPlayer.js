'use client';

import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import 'plyr/dist/plyr.css';

const VideoPlayer = ({ src, isPlay=false, isMobile=false}) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
    
        video.controls = true;
        video.playsInline = isMobile;
        if(!src.includes('.m3u8')){
            video.src = src;
        }else if (Hls.isSupported()) {
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
        const player = new Plyr(video, {
            controls: ['play', 'progress', 'current-time', 'fullscreen', 'mute'],
            controlBar: {
            volume: false,
            }}
        );

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
        }

    }, [src, videoRef]);
    
    
    return (
        <video
            data-displaymaxtap
            playsInline={isMobile ? true : false}
            controls
            loop
            ref={videoRef}
        ></video>
    );
}

export default VideoPlayer