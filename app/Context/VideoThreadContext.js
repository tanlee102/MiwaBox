'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

import { AppsConext } from './AppsContext';
import { AccountContext } from './AccountContext';
import { WindowContext } from './WindowContext';

import { env_SMARTCHAIN } from '../env';
import { LENGTH_LIST_VIDEO, url_image_domain, url_video_domain, url_video_upload_local, url_video_upload_worker } from '../env_video';

export const VideoThreadContext = createContext();

const VideoThreadProvider = ({ children, setDisplayCreateVideo }) => {

    const { infoApp } = useContext(AppsConext);
    const { switchNetwork, myUser } = useContext(AccountContext);
    const { currentIndex } = useContext(WindowContext);

    const [loadCreateState, setLoadCreateState] = useState(false);

    const [username, setUsername] = useState('');
    const [img, SetImg] = useState(null);
    const [file, SetFile] = useState(null);

    const [isUploadFB, setIsUploadFB] = useState(true);
    const [isUsingWorker, setIsUsingWorker] = useState(false);

    const [viParam, setViParam] = useState(null);

    const [onLoadData, setOnLoadData] = useState(false);
    const [data, setData] = useState([]);
    const [gridData, setGridData] = useState([]);
    const [videoDriveUrls, setVideoDriveUrls] = useState([]);
    
    const [curGotId, setCurGotId] = useState(0);
    const [scrolDex, setScrolDex] = useState(null);
    const [isDisplayGrid, setIsDisplayGrid] = useState(false);
    const [isScrollToBottomGrid, setIsScrollToBottomGrid] = useState(false);
  

    const sendDataVideo = async (thumbnail, index, workerID) => {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        await switchNetwork(env_SMARTCHAIN.NETWORKS[infoApp.idNetwork]);

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractWithSigner = new ethers.Contract(infoApp.appAddress, env_SMARTCHAIN.APP_CONTRACTS.video.abi, signer);

        const tx = await contractWithSigner.sendVideo(thumbnail, index, username, (isUsingWorker) ? (workerID+' , ') : ' , ');
        await tx.wait(); 

        if(isUploadFB){
          try {
            await axios.post(`${url_video_domain}file/upload/facebook?index=${index}`, {}, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${myUser.access_token}`
              }
            });
            alert('Successful Video Upload.');
          } catch (error) {
            alert('Successful Video Upload, but Failed to Upload on Facebook.');
          }
        } else {
          alert("Successful Video Upload and Non-Upload to Facebook.");
        }
        setLoadCreateState(false);
      } catch (error) {
        await Promise.all([deleteImageDrive(thumbnail), deleteVideoDrive(index)]);
        alert('Upload Blockchain Error!!');
      } finally {
        setLoadCreateState(false);
      }
    }
    
    const btnCreateVideo = async () => {
      if (username.trim().length > 0 && img && file) {
        setLoadCreateState(true);
    
        try {
          const formData = new FormData();
          formData.append('image', img);
          const res = await axios.put(`${url_image_domain}upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${myUser.access_token}`
            }
          });

            try {
              const fileFormData = new FormData();
              fileFormData.append('file', file);
              const isUsingLocal = file.size / (1024*1024) > 100;
              const response = await axios.post(`${isUsingLocal ? url_video_upload_local : url_video_upload_worker}?type_pip=2&permission=1&folder=${username}&thumbId=${res.data.id}`, fileFormData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${myUser.access_token}`
                }
              });
        
              sendDataVideo(res.data.id, response.data.index, response.data.workerID);        
            } catch (error) {
              await deleteImageDrive(res.data.id);
              throw error;
            }
      
        } catch (error) {
          console.log(error);
          alert('Upload Error!!');
          setLoadCreateState(false);
        }
      } else {
        alert('Please fill in all the required information.');
      }
    }


    const deleteImageDrive = async (id) => {
      const url = url_image_domain + 'delete/file?id=' + id;
      try {
        await axios.delete(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + myUser.access_token
          }
        });
      } catch (error) {
        throw error;
      }      
    }
    const deleteVideoDrive = async (id) => {
      const url = url_video_domain+'file/delete/'+ id;
      try {
        await axios.delete(url, {
          headers: {
            'Authorization': 'Bearer ' + myUser.access_token
          }
        });
      } catch (error) {
        throw error;
      }      
    }
    const deleteVideoFB = async (infovideo) => {
      if (confirm("You want delete this video on facebook?!") == true) {
        const url = url_video_domain+'file/delete/'+ infovideo.videoUrl + '/fb';
        try {
          const response = await axios.delete(url,{
            headers: {
              'Authorization': 'Bearer ' + myUser.access_token
            }
          });
          alert(response.data.message)
        } catch (error) {
          throw error;
        }    
      }
    }
    const deleteVideoBlock = async (id) => {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        await switchNetwork(env_SMARTCHAIN.NETWORKS[infoApp.idNetwork]);
  
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractWithSigner = new ethers.Contract(infoApp.appAddress, env_SMARTCHAIN.APP_CONTRACTS.video.abi, signer);
  
        const tx = await contractWithSigner.updateDisplayVideo(Number(id), false);
        await tx.wait();  
      } catch (error) {
        throw error
      }
    }
    
    const deleteVideo = async (infovideo) => {
        if (confirm("You want delete this video?!") == true) {
          try {
            await deleteImageDrive(infovideo.thumbUrl);
            await deleteVideoDrive(infovideo.videoUrl);
            await deleteVideoBlock(infovideo.id);
            
            alert("Delete video successful.")
          } catch (error) {            
            if (confirm("Error in delete, Do you want delete blockchain?!") == true) {
              await deleteVideoBlock(infovideo.id)

              alert("Delete video successful.")
            }
          }
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

          if(result?.length > 0){
  
            let finalRe = [];
            let firstItemData = null;

            result.forEach((item, index) => {
              const newItem = {
                id: ethers.toNumber(item.id),
                thumbUrl: item.thumbUrl,
                videoUrl: item.videoUrl,
                username: item.username,
                link: String(item.link).split(','),
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

          }else{
            setCurGotId(-1);
            setOnLoadData(false);
            setIsScrollToBottomGrid(false);
          }

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
      if(infoApp && infoApp.appType == 2){
        getData(true, 0, true);
        setUsername(infoApp.title.toLowerCase().replace(/ /g, "_"))
      }
    }, [infoApp]);


    useEffect(() => {
      if(isDisplayGrid == true) setGridData(data);
    }, [isDisplayGrid]);


    useEffect(() => {
      if(Math.abs(data?.length - scrolDex) < 5 && infoApp?.appType == 2) getData(false, curGotId - 1, true);
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
    <VideoThreadContext.Provider  value={{  setDisplayCreateVideo, btnCreateVideo, deleteVideo, deleteVideoFB, loadCreateState, onLoadData, 
                                            setViParam, data, gridData, scrolDex, setScrolDex, isDisplayGrid, setIsDisplayGrid, setIsScrollToBottomGrid, isScrollToBottomGrid,  
                                            username, setUsername, img, SetImg, file, SetFile,
                                            videoDriveUrls, setVideoDriveUrls,
                                            isUploadFB, setIsUploadFB, isUsingWorker, setIsUsingWorker
                                        }}>
        {children}
    </VideoThreadContext.Provider>
  )
}

export default VideoThreadProvider