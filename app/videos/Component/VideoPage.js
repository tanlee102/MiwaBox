import React, { useContext, useEffect, useState } from 'react'
import '../css/pagevideo.css'
import '../css/pagevideoRes.css'

import Menu from './Menu'
import HomeVideoPage from './HomeVideoPage'
import MyVideoPage from './MyVideoPage'
import HomeVideo from './HomeVideo'

import { VideoPageContext } from '../Context/VideoPageContext'
import { LENGTH_LIST_VIDEO_PAGE, url_host_domain_video_page } from '@/app/env_video'
import Cookies from 'js-cookie'

async function getListVideo(id,folder) {
      const res = await fetch(url_host_domain_video_page+'api/list?curId='+id+'&folder='+folder)
      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
      return res.json();
}

async function getListFolder() {
      const res = await fetch(url_host_domain_video_page+'api/folder')
      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
      return res.json();
}

const VideoPage = () => {

      const {vid, setFolder} = useContext(VideoPageContext);
      
      const [loadState, setLoadState] = useState(false);
      const [displayLoadMore, setDisplayLoadMore] = useState(false);

      const [listFolder, setListFolder] = useState([]);
      const [folderNames, setFolderNames] = useState([]);
      const [listVideo, setListVideo] = useState([]);
      const [curID, setCurID] = useState("s");
      const {folder} = useContext(VideoPageContext);

      const fetchListVideo = async (isStart = false) => {
            if(folder){
                  if(isStart){
                        setListVideo([])
                        setDisplayLoadMore(true)
                  }
                  setLoadState(true);

                  const tmpData = await getListVideo(isStart ? "s" : curID, folder)
                  if(tmpData.length > 0){
                        
                        if(isStart) setListVideo(tmpData)
                        else setListVideo([...listVideo,...tmpData])
                        setCurID(tmpData[tmpData.length - 1]._id)
                        
                        if(tmpData.length >= LENGTH_LIST_VIDEO_PAGE) setLoadState(false)
                        else setDisplayLoadMore(false)
            
                  }else{
                        setDisplayLoadMore(false)
                  }
            }
      }
      useEffect(() => {
            fetchListVideo(true)
      }, [folder])



      const [sugData, setSugData] = useState([])
      const [myData, setMyData] = useState(null)

      const [videoSrc, setVideoSrc] = useState("");
      const [abe, setAbe] = useState(Cookies.get('abe') ? (String(Cookies.get('abe'))) : null);
    
      const fetchVideoAndSuggestion = async () => {
            setSugData([])
            setVideoSrc("")

            fetch(url_host_domain_video_page+'api/item?index='+vid)
            .then(response => {if (response.status === 200) return response.json();})
            .then(data => {
                  if(data && data?.folder){
                        setMyData(data);
                        setFolder(data?.folder);

                        const driveUrl = data?.driveUrl;
                        if (driveUrl && Array.isArray(driveUrl)) {
                              const url = (driveUrl[driveUrl.length - 1])
                              if(url){
                              setVideoSrc(url);
                              }
                        }
        
                        fetch(url_host_domain_video_page+'api/suggestion?folder='+data?.folder+'&_idItem='+data?._id+(abe ? '&abe='+encodeURIComponent(abe) : ""))
                        .then(response => {if (response.status === 200) {return response.json();}})
                        .then(da => {
                              if(da?.myItemSet){
                                    setSugData(da?.myItemSet);
                              }
                              if(da?.codeEn){
                                    setAbe(da.codeEn);
                                    Cookies.set('abe', String(da.codeEn), { expires: 90, path: '/' });
                              }
                        }).catch(error => {
                              console.error(error);
                        });
                  }
            }).catch(error => {
                  console.error(error);
            });

      }

      useEffect(() => {
            if(vid) fetchVideoAndSuggestion();
      }, [vid])



      const fetchListFolder = async () => {
            const dataFolder = await getListFolder();
            const filteredData = dataFolder.filter(item => item.name !== "public");
            const names = filteredData.map(item => item.name);
            names.unshift('home')
            setFolderNames(names);
            setListFolder(filteredData)
      }
      useEffect(() =>{
            fetchListFolder();
      },[])

      return (
            <div id='page-video-container'>
                  <div id='menu-video-page'>
                        <Menu data={folderNames}></Menu>
                  </div>
                  {vid ? 
                  <MyVideoPage      sugData={sugData}
                                    myData={myData}
                                    videoSrc={videoSrc}
                                    /> 
                  : 
                  <> {
                        (folder !== 'home' && folder !== 'Home') || vid !== null ?
                              <HomeVideoPage    data={listVideo} 
                                                displayLoadMore={displayLoadMore} 
                                                loadState={loadState} 
                                                setLoadState={setLoadState} 
                                                fetchData={fetchListVideo}
                              /> : 
                              <HomeVideo    
                                    data={listFolder} 
                              />
                  }
                  </>
                  }
            </div>
      )
}

export default VideoPage