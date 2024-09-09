import React, { useEffect, useState } from 'react';
import { url_host_domain_video_page } from '../../env_video';

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

  return (
    <>
      {videoSrc ? (
        <video controls width="100%" height="auto">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="video-drive-player">
          <div className="contain-loader-hozon">
            <div className="loader-hozon"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default DrivePlayerPost;