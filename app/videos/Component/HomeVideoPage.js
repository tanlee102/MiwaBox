import React from 'react'
import ListSuggestVideo from './ListSuggestVideo'
import LoadMore from '@/app/Components/LoadMore'

const HomeVideoPage = ({data, displayLoadMore, loadState, setLoadState, fetchData}) => {
    
  return (
    <div id='home-video-page'>
        <div id='info-video-page-container'>     
            <ListSuggestVideo data={data}/>
            {displayLoadMore ? <LoadMore loadState={loadState} setLoadState={setLoadState} btnAct={() => {fetchData()}}/> : "" }
            <p>@id-888</p>
        </div>
    </div>

  )
}

export default HomeVideoPage