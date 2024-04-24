import React, { useEffect, useState } from 'react'

const OneDrivePlayer = ({src}) => {
  const [videoSrc, setVideoSrc] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch(src)
      .then(response => {
        if (response.status != 200) setIsError(true);
        return response.json();
      })
      .then(data => {
        setVideoSrc(data?.webUrl);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsError(true);
      });
  }, []);
  

  return (
    isError ? 
    <img className='video-onedrive-player' src="https://answers-afd.microsoft.com/static/images/image-not-found.jpg" alt="Error loading video" /> :
      videoSrc.length == 0 ?
      <div className='video-onedrive-player loading-video-onedrive-player'>
        <div className='contain-loader-hozon'>
            <div className="loader-hozon"></div>
        </div>
      </div>
      : <video crossOrigin="anonymous" className='video-onedrive-player' src={videoSrc} controls></video>
  )
}

export default OneDrivePlayer