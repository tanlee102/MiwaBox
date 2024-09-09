import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { url_host_domain_video_page } from '../../env_video';
import 'plyr/dist/plyr.css';

const DrivePlayerPost = ({ index }) => {
  const [videoSrc, setVideoSrc] = useState(null);

  const fetchVideoData = async () => {
    try {
      const response = await fetch(`${url_host_domain_video_page}api/item?index=${index}`);
      if (response.status === 200) {
        const data = await response.json();
        const driveUrl = data?.driveUrl;

        if (driveUrl && Array.isArray(driveUrl)) {
          const url = driveUrl[driveUrl.length - 1]; // Get the last URL in the array
          if (url) {
            setVideoSrc(url); // Set the video source URL
          }
        }
      }
    } catch (error) {
      console.error('Error fetching video data:', error);
    }
  };

  useEffect(() => {
    fetchVideoData(); // Fetch video data when the component mounts
  }, [index]);

  const videoRef = useRef(null);

  useLayoutEffect(() => {
    if (videoRef.current) {
      const Plyr = require('plyr');
      const player = new Plyr(videoRef.current, {});

      return () => {
        if (player) {
          player.destroy();
          videoRef.current = null;
        }
      };
    }
  }, [videoSrc]);

  return (
    <>
      {videoSrc ? (
        <div className='video-plyr-container'>
          <div>
            <video controls ref={videoRef} src={videoSrc}></video>
          </div>
        </div>
      ) : (
        <div className="video-drive-post-load-player">
          <div className="contain-loader-hozon">
            <div className="loader-hozon"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default DrivePlayerPost;