import React from 'react'
import Menu from './Menu'
import '../css/pagevideo.css'
import '../css/pagevideoRes.css'

const VideoPage = () => {
  return (
    <div id='page-video-container'>

        <div id='menu-video-page'>
            <Menu></Menu>
        </div>

        <div id='my-video-page-container'>
              <video src="https://rr2---sn-npoldne7.c.drive.google.com/videoplayback?expire=1715864423&ei=N9lFZoSjK9XHp84PzKutsA0&ip=162.158.178.53&id=a7c343cbd4a9f6f3&itag=37&source=webdrive&requiressl=yes&xpc=EghonaK1InoBAQ==&mh=wf&mm=32%2C26&mn=sn-npoldne7%2Csn-3pm7knee&ms=su%2Conr&mv=m&mvi=2&pl=24&ttl=transient&susc=dr&driveid=1ZE00VVs6TmC6qOvRlwdHKfHQ3WZq2UVR&app=explorer&eaua=MiXkJn4gakU&mime=video/mp4&vprv=1&prv=1&cnr=14&dur=30.093&lmt=1715709888786722&mt=1715853161&fvip=4&subapp=UNKNOWN&txp=0011224&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cttl%2Csusc%2Cdriveid%2Capp%2Ceaua%2Cmime%2Cvprv%2Cprv%2Ccnr%2Cdur%2Clmt&sig=AJfQdSswRQIgKMY0C9X5E_OgCfTwUKezacrG-EbnFu4WmaBRs3jzDjsCIQDUuf1r4RZ77Aaz3qmH_SB6U9W8rM6VirqjT77-ThISZg==&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl&lsig=AHWaYeowRAIgBsqsTRrijm-FzC7HByjeRdIpp6cGgsLOopP06_wsKKgCIHhPzuHjAh2rAZxdOHXBXlNYS8eoUvbPt4SLRB0p9t3q" controls></video>
        </div>

        <div id='info-video-page-container'>
        
          <div id='my-info-video-page-container'>
            <span><svg viewBox="0 0 1024 1024"><path fill="#000000" d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"/></svg>201</span>
            <span><svg viewBox="0 0 24 24" fill="none"><path d="M12.5 4V17M12.5 17L7 12.2105M12.5 17L18 12.2105" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 21H19" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Download</span>
            <span><svg viewBox="0 0 24 24" fill="none"><path d="M14 7H16C18.7614 7 21 9.23858 21 12C21 14.7614 18.7614 17 16 17H14M10 7H8C5.23858 7 3 9.23858 3 12C3 14.7614 5.23858 17 8 17H10M8 12H16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Share</span>
          </div>

          <div id='label-suggested-video-container'>
              Đề xuất
          </div>

          <div id='my-suggested-video-container'>
              <div className='item-suggested-video'>
                    <span><svg viewBox="0 0 1024 1024"><path fill="#000000" d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"/></svg>201</span>
                    <img src='https://images.unsplash.com/photo-1615220368123-9bb8faf4221b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2FtcGxlfGVufDB8fDB8fHww' />
              </div>
              <div className='item-suggested-video'>
                    <span><svg viewBox="0 0 1024 1024"><path fill="#000000" d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"/></svg>201</span>
                    <img src='https://thumb.miwabox.live/1AHxjMRwEMqxQawexhXewfrrQm_04DmRG.jpeg'/>
              </div>
              <div className='item-suggested-video'>
                    <span><svg viewBox="0 0 1024 1024"><path fill="#000000" d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"/></svg>201</span>
                    <img src='https://thumb.miwabox.live/1Hg7CwlkADBbd3bEJ1XZX_zH5FWajF2vq.jpeg' />
              </div>
              <div className='item-suggested-video'>
                    <span><svg viewBox="0 0 1024 1024"><path fill="#000000" d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"/></svg>201</span><img src='https://thumb.miwabox.live/1TeCOpZHPg6yHEEVec35pL81Iw4sfP0oF.jpeg' />
              </div>
              <div className='item-suggested-video'>
                    <span><svg viewBox="0 0 1024 1024"><path fill="#000000" d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"/></svg>201</span>
                    <img src='https://thumb.miwabox.live/1Goh3X-JJFKP3ylbGmbmJXMlGK7rGIdmD.jpeg' />
              </div>
              <div className='item-suggested-video'>
                    <span><svg viewBox="0 0 1024 1024"><path fill="#000000" d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"/></svg>201</span><img src='https://thumb.miwabox.live/1AHxjMRwEMqxQawexhXewfrrQm_04DmRG.jpeg' />
              </div>
              <div className='item-suggested-video'>
                    <span><svg viewBox="0 0 1024 1024"><path fill="#000000" d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"/></svg>201
                    </span>
                  <img src='https://thumb.miwabox.live/1Hg7CwlkADBbd3bEJ1XZX_zH5FWajF2vq.jpeg' />
              </div>
              <div className='item-suggested-video'>
                    <span>
                        <svg viewBox="0 0 1024 1024"><path fill="#000000" d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"/></svg>
                        201
                    </span>
                  <img src='https://thumb.miwabox.live/1TeCOpZHPg6yHEEVec35pL81Iw4sfP0oF.jpeg' />
              </div>
              <div className='item-suggested-video'>
                    <span><svg viewBox="0 0 1024 1024"><path fill="#000000" d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"/></svg>201</span><img src='https://thumb.miwabox.live/1Goh3X-JJFKP3ylbGmbmJXMlGK7rGIdmD.jpeg' />
              </div>
          </div>

        </div>

    </div>
  )
}

export default VideoPage