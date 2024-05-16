import React, { useState } from 'react'
import ListSuggestVideo from './ListSuggestVideo'
import LoadMore from '@/app/Components/LoadMore'

const HomeVideoPage = () => {
    const [loadState, setLoadState] = useState(false)
  return (
    <div id='home-video-page'>
        <div id='info-video-page-container'>     
            <ListSuggestVideo/>
            <LoadMore loadState={loadState} setLoadState={setLoadState} btnAct={() => {}}/>    
            <p>@id-888</p>
        </div>
    </div>

  )
}

export default HomeVideoPage
