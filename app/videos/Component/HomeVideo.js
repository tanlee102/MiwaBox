import { WindowContext } from '@/app/Context/WindowContext';
import Link from 'next/link';
import React, { useContext } from 'react'

const HomeVideo = ({data}) => {

    const {currentIndex} = useContext(WindowContext);

  return (
    <div id='home-video-page'>
        <div id='info-video-page-container'>     
            <div id='my-suggested-video-container' className='my-folder-video-container'>
                {data?.map((item, index) => (
                <Link href={'/?id='+currentIndex+'&folder='+item.name}>
                    <div key={String(index) + String(item.name)} className='item-suggested-video'>
                        <span><svg viewBox="5 -30 320 320"><path d="M224.093,0H53.952c-4.971,0-9,4.029-9,9v260.045c0,3.592,2.136,6.839,5.433,8.263c3.298,1.425,7.126,0.75,9.74-1.713l78.897-74.352l78.897,74.352c1.704,1.605,3.923,2.45,6.175,2.45c1.203,0,2.417-0.241,3.565-0.737c3.297-1.423,5.433-4.671,5.433-8.263V9C233.093,4.029,229.064,0,224.093,0z M215.093,18v13.158H62.952V18H215.093zM145.196,182.326c-1.733-1.633-3.953-2.45-6.173-2.45s-4.439,0.817-6.173,2.45l-69.897,65.871V49.158h152.141v199.039L145.196,182.326z"/></svg>{item?.name ? item?.name : 0}</span>
                        <span className='item-folder-video-name'><svg viewBox="0 0 24 24" fill="none"><path d="M20 7L4 7" stroke="black" stroke-width="1.5" stroke-linecap="round"/><path d="M15 12L4 12" stroke="black" stroke-width="1.5" stroke-linecap="round"/><path d="M9 17H4" stroke="black" stroke-width="1.5" stroke-linecap="round"/></svg>{item?.total ? item?.total : 0}</span>
                        <img src= {item?.url_img} />
                    </div>
                </Link>
                ))}

            </div>
            <p>@id-888</p>
        </div>
    </div>
  )
}

export default HomeVideo
