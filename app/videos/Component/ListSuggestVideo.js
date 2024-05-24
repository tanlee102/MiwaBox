import { url_image_domain } from '@/app/env_video'
import { nanoid } from 'nanoid'
import React, { useContext } from 'react'
import { VideoPageContext } from '../Context/VideoPageContext'
import { useRouter } from 'next/navigation'
import { WindowContext } from '@/app/Context/WindowContext'
import Link from 'next/link'

const ListSuggestVideo = ({data}) => {
  
  const {folder} = useContext(VideoPageContext);
  const {currentIndex} = useContext(WindowContext);
  
  return (
    <>
        <div id='my-suggested-video-container'>
            {data?.map((item) => (
              <Link href={'/?id='+currentIndex+'&folder='+folder+'&vid='+item.index}>
                <div key={nanoid()} className='item-suggested-video'>
                    <span><svg viewBox="0 0 1024 1024"><path fill="#000000" d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"/></svg>{item?.view ? item?.view : 0}</span>
                    {item?.title ? <span className='title-item-suggested-video'>{item.title}</span> : ""}
                    <img src= { url_image_domain + item?.thumbId + '.jpeg'} />
                </div>
              </Link>
            ))}

        </div>
    </>
  )
}

export default ListSuggestVideo
