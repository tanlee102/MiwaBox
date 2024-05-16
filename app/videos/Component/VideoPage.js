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
              <video src="https://video.xx.fbcdn.net/o1/v/t2/f2/m69/An-PyW8ZzG4TCVH1yVxLe6rcEfsl3-DQL81rAKtINw0LPfber36lZTTrbY0kvrCo_gulGlsAj9lFPpKMEuHtqp8.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6Im9lcF9oZCJ9&_nc_ht=video-iad3-1.xx.fbcdn.net&_nc_cat=111&strext=1&vs=e88457b8ed635dd&_nc_vs=HBksFQIYOnBhc3N0aHJvdWdoX2V2ZXJzdG9yZS9HSjFoVGhvZnVOSFRjWkVEQUVNd2p2cWs2aVU3Ym1kakFBQUYVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dDVWFjeHA5SGlWcWpvRURBRENjUFRyUUVfTVhidjRHQUFBRhUCAsgBAEsHiBJwcm9ncmVzc2l2ZV9yZWNpcGUBMQ1zdWJzYW1wbGVfZnBzABB2bWFmX2VuYWJsZV9uc3ViACBtZWFzdXJlX29yaWdpbmFsX3Jlc29sdXRpb25fc3NpbQAoY29tcHV0ZV9zc2ltX29ubHlfYXRfb3JpZ2luYWxfcmVzb2x1dGlvbgAddXNlX2xhbmN6b3NfZm9yX3ZxbV91cHNjYWxpbmcAEWRpc2FibGVfcG9zdF9wdnFzABUAJQAcjBdAAAAAAAAAABERAAAAJs6yrdua6voCFQIoAkMzGAt2dHNfcHJldmlldxwXQDLVP3ztkWgYIWRhc2hfZ2VuMmh3YmFzaWNfaHEyX2ZyYWdfMl92aWRlbxIAGBh2aWRlb3MudnRzLmNhbGxiYWNrLnByb2Q4ElZJREVPX1ZJRVdfUkVRVUVTVBsKiBVvZW1fdGFyZ2V0X2VuY29kZV90YWcGb2VwX2hkE29lbV9yZXF1ZXN0X3RpbWVfbXMBMAxvZW1fY2ZnX3J1bGUHdW5tdXRlZBNvZW1fcm9pX3JlYWNoX2NvdW50ATERb2VtX2lzX2V4cGVyaW1lbnQADG9lbV92aWRlb19pZA80NjA5NDc4MTMxMzAyNDYSb2VtX3ZpZGVvX2Fzc2V0X2lkDzk5MjI4MTMyNTYyMzk5NRVvZW1fdmlkZW9fcmVzb3VyY2VfaWQPODMzMDU1NDQyMTg1MzgzHG9lbV9zb3VyY2VfdmlkZW9fZW5jb2RpbmdfaWQQMTA3OTQ0NjA2MzE1NjA5Mg52dHNfcmVxdWVzdF9pZAAlAhwAJcQBGweIAXMENjgwMQJjZAoyMDI0LTA1LTEzA3JjYgEwA2FwcAlzdG9yeWxpbmUCY3QZQ09OVEFJTkVEX1BPU1RfQVRUQUNITUVOVBNvcmlnaW5hbF9kdXJhdGlvbl9zCTE4Ljg1Mjk5MwJ0cxVwcm9ncmVzc2l2ZV9lbmNvZGluZ3MA&ccb=9-4&oh=00_AYCHFoDaFamFk8VR1yGhiQa6og9-i3WK7psUJx4KujQL9w&oe=6647A9B6&_nc_sid=1d576d&_nc_rid=435176652659231&_nc_store_type=1" controls></video>
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

          <p>@id-888</p>

        </div>

    </div>
  )
}

export default VideoPage