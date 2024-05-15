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

        <div id='my-suggested-video-container'>
            <div className='item-suggested-video'>
                <img src='https://images.unsplash.com/photo-1615220368123-9bb8faf4221b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2FtcGxlfGVufDB8fDB8fHww' />
            </div>
            <div className='item-suggested-video'>
                <img src='https://images.unsplash.com/photo-1615220368123-9bb8faf4221b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2FtcGxlfGVufDB8fDB8fHww' />
            </div>
            <div className='item-suggested-video'>
                <img src='https://images.unsplash.com/photo-1615220368123-9bb8faf4221b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2FtcGxlfGVufDB8fDB8fHww' />
            </div>
        </div>
    </div>
  )
}

export default VideoPage
