import React from 'react'
import Menu from './Menu'
import '../css/pagevideo.css'

const VideoPage = () => {
  return (
    <div id='page-video-container'>
        <div id='menu-video-page'>
            <Menu></Menu>
        </div>
        <div id='my-video-page-container'>
              <video src="http://media.w3.org/2010/05/sintel/trailer.mp4" controls></video>
        </div>
    </div>
  )
}

export default VideoPage
