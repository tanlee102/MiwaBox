'use client';

import React, { createContext, useContext, useEffect, useState } from 'react'
import { AppsConext } from './AppsContext';
import { AccountContext } from './AccountContext';
import { env_SMARTCHAIN } from '../env';
import { ethers } from 'ethers';
import { LENGTH_LIST_VIDEO, url_upload } from '../env_video';
import { WindowContext } from './WindowContext';

export const VideoThreadContext = createContext();

const VideoThreadProvider = ({ children, setDisplayCreateVideo }) => {

    const { infoApp } = useContext(AppsConext);
    const { switchNetwork } = useContext(AccountContext);
    const { currentIndex } = useContext(WindowContext);

    
    const [loadCreateState, setLoadCreateState] = useState(false);

    const [url, setUrl] = useState('');
    const [publicUrl, setPublicUrl] = useState('');
    const [username, setUsername] = useState('');
    const [link, setLink] = useState('');
    const [file, SetFile] = useState(null);
    const [password, setPassword] = useState('');

    const [viParam, setViParam] = useState(null);

    const [onLoadData, setOnLoadData] = useState(false);
    const [data, setData] = useState([]);
    const [gridData, setGridData] = useState([]);
    

    const [curGotId, setCurGotId] = useState(0);
    const [scrolDex, setScrolDex] = useState(null);
    const [isDisplayGrid, setIsDisplayGrid] = useState(false);
    const [isScrollToBottomGrid, setIsScrollToBottomGrid] = useState(false);

  



    const sendDataVideo = async (thumbnail) => {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        await switchNetwork(env_SMARTCHAIN.NETWORKS[infoApp.idNetwork]);

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractWithSigner = new ethers.Contract(infoApp.appAddress, env_SMARTCHAIN.APP_CONTRACTS.video.abi, signer);

        const tx = await contractWithSigner.sendVideo(thumbnail, publicUrl, username, link);
        await tx.wait(); 

        setLoadCreateState(false);
      } catch (error) {
        console.log(error)
      }
    }



    const btnCreateVideo = async () => {

      if(publicUrl.trim().length > 0 && username.trim().length > 0 && link.trim().length > 0){

        var formData = new FormData();
        formData.append('image', file, 'miwabox_thumb_img.jpeg');
        formData.append('password', password);
    
        fetch(url_upload, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Request failed with status ' + response.status);
            }
        })
        .then(data => {
          sendDataVideo(data.id)
        })
        .catch(error => {
          console.log(error)
        });

        setLoadCreateState(true);

      }else{
        alert('Please fill in all the required information.');
      }      
    }










    const getFirstVideo = async (viParam) => {
      const provider = new ethers.JsonRpcProvider(env_SMARTCHAIN.NETWORKS[infoApp.idNetwork].rpcUrls[0]);
      const contract = new ethers.Contract(infoApp.appAddress, env_SMARTCHAIN.APP_CONTRACTS.video.abi, provider);
      let result = await contract.getOne(viParam);

      if(result?.videoUrl === ''){
        result = null
      }else{
        result = {
          id: ethers.toNumber(result.id),
          thumbUrl: result.thumbUrl,
          videoUrl: result.videoUrl,
          username: result.username,
          link: String(result.link).split(','),
          // display: Boolean(result.display),
          // timestamp: result.timestamp
        };
      }
      return result
    }

    const getData = async (isLast = true,  _currentId, isVideoData = true) => {

      if(onLoadData == false && _currentId >= 0){

        setOnLoadData(true);
        console.log('LOAD VIDEO DATA!!!');

        const provider = new ethers.JsonRpcProvider(env_SMARTCHAIN.NETWORKS[infoApp.idNetwork].rpcUrls[0]);
        const contract = new ethers.Contract(infoApp.appAddress, env_SMARTCHAIN.APP_CONTRACTS.video.abi, provider);

        try {
          const result = await contract.getVideos(isLast, _currentId, LENGTH_LIST_VIDEO);
  
          let finalRe = [];
          let firstItemData = null;

          result.forEach((item, index) => {
            const newItem = {
              id: ethers.toNumber(item.id),
              thumbUrl: item.thumbUrl,
              videoUrl: item.videoUrl,
              username: item.username,
              link: String(item.link).split(','),
              // display: Boolean(item.display),
              // timestamp: item.timestamp
            };

            finalRe.push(newItem);

            if (index === result.length - 1) {
              setCurGotId(newItem.id);
            }

            if (newItem.id === viParam) {
              firstItemData = newItem;
            }
          });


          if(viParam || viParam == 0){
            if(firstItemData == null){
              firstItemData = await getFirstVideo(viParam);
            }
            finalRe.unshift(firstItemData);
            setViParam(null);
          }
  
          if(isLast){
            setData(finalRe);
            setGridData([]);
            setScrolDex(0);
            setIsDisplayGrid(false);
          }else{
            let newList = [...data, ...finalRe]
            setData(newList);
            if(isVideoData){
              if(isDisplayGrid == true) setGridData(newList);
            }else{
              setGridData(newList);
            }
          }
  
          setOnLoadData(false);
          setIsScrollToBottomGrid(false);

        } catch (error) {

          console.log(error);
          setOnLoadData(false);
          setIsScrollToBottomGrid(false);

          if(isLast){
            setData([]);
            setGridData([]);
            setScrolDex(0);
          }
        }

      }
    }













    
    useEffect(() => {
      if(infoApp && infoApp.appType == 2) getData(true, 0, true);
    }, [infoApp]);


    useEffect(() => {
      if(isDisplayGrid == true) setGridData(data);
    }, [isDisplayGrid]);


    useEffect(() => {
      if(Math.abs(data?.length - scrolDex) < 5) getData(false, curGotId - 1, true);
    }, [scrolDex]);


    useEffect(() => {
      if(isScrollToBottomGrid) getData(false, curGotId - 1, false);
    }, [isScrollToBottomGrid]);




    useEffect(() => { //This is very important
      if(data.length > 0){
        setData([]);
        setGridData([]);
        setScrolDex(0);
        setCurGotId(0);
        setIsScrollToBottomGrid(false);
      }
    },[currentIndex]);

  return (
    <VideoThreadContext.Provider  value={{  setDisplayCreateVideo, btnCreateVideo, loadCreateState, onLoadData, 
                                            setViParam, data, gridData, scrolDex, setScrolDex, isDisplayGrid, setIsDisplayGrid, setIsScrollToBottomGrid, isScrollToBottomGrid,  
                                            url, setUrl, publicUrl, setPublicUrl, username, setUsername, link, setLink, file, SetFile, password, setPassword
                                        }}>
        {children}
    </VideoThreadContext.Provider>
  )
}

export default VideoThreadProvider