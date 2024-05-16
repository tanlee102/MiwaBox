import React from 'react'
import Menu from './Menu'
import '../css/pagevideo.css'
import '../css/pagevideoRes.css'


import ListSuggestVideo from './ListSuggestVideo'
import HomeVideoPage from './HomeVideoPage'
import MyVideoPage from './MyVideoPage'

const VideoPage = () => {
  return (
      <div id='page-video-container'>
            <div id='menu-video-page'>
                  <Menu></Menu>
            </div>

            <HomeVideoPage/>
            {/* <MyVideoPage/> */}

      </div>
  )
}

export default VideoPage