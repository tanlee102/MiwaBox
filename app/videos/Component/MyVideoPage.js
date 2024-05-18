import React, { useContext } from 'react'
import ListSuggestVideo from './ListSuggestVideo'
import { WindowContext } from '@/app/Context/WindowContext'

const MyVideoPage = ({myData, sugData, videoSrc}) => {

  const {setNotice_pop_state} = useContext(WindowContext)

  return (
    <>
        <div id='my-video-page-container'>
            <video src={videoSrc} controls playsInline></video>
        </div>

        <div id='info-video-page-container'>     
            <div id='my-info-video-page-container' className='non-select'>
                <span><svg viewBox="0 0 1024 1024"><path fill="#000000" d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"/></svg>{myData?.view ? myData?.view : 0}</span>
                <span onClick={() => {window.open(videoSrc, '_blank');}}
                ><svg viewBox="0 0 24 24" fill="none"><path d="M12.5 4V17M12.5 17L7 12.2105M12.5 17L18 12.2105" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 21H19" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Download</span>
                <span onClick={ () => { 
                  setNotice_pop_state(true); 
                  try {
                    navigator?.clipboard.writeText(window?.location?.href);  
                  } catch (error) {
                    console.log(error);
                  }
                }}
                ><svg viewBox="0 0 24 24" fill="none"><path d="M14 7H16C18.7614 7 21 9.23858 21 12C21 14.7614 18.7614 17 16 17H14M10 7H8C5.23858 7 3 9.23858 3 12C3 14.7614 5.23858 17 8 17H10M8 12H16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Share</span>
            </div>

            <div id='label-suggested-video-container'>
              Đề xuất
            </div>
            <ListSuggestVideo data={sugData}/>
            <p>@id-888</p>
        </div>
    </>
  )
}

export default MyVideoPage
