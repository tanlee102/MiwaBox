'use client';

import React, { createContext, useContext, useEffect, useState } from 'react'
import { AppsConext } from './AppsContext';
import { AccountContext } from './AccountContext';
import { env_SMARTCHAIN } from '../env';
import { ethers, id } from 'ethers';
import { LENGTH_LIST_VIDEO, url_image_domain } from '../env_video';
import { WindowContext } from './WindowContext';
import axios from 'axios';

export const VideoThreadContext = createContext();

const VideoThreadProvider = ({ children, setDisplayCreateVideo }) => {

    const { infoApp } = useContext(AppsConext);
    const { switchNetwork } = useContext(AccountContext);
    const { currentIndex } = useContext(WindowContext);

    const [loadCreateState, setLoadCreateState] = useState(false);

    const [username, setUsername] = useState('');
    const [img, SetImg] = useState(null);
    const [file, SetFile] = useState(null);
    const [password, setPassword] = useState('');

    const [viParam, setViParam] = useState(null);

    const [onLoadData, setOnLoadData] = useState(false);
    const [data, setData] = useState([]);
    const [gridData, setGridData] = useState([]);
    const [videoDriveUrls, setVideoDriveUrls] = useState([]);
    
    const [curGotId, setCurGotId] = useState(0);
    const [scrolDex, setScrolDex] = useState(null);
    const [isDisplayGrid, setIsDisplayGrid] = useState(false);
    const [isScrollToBottomGrid, setIsScrollToBottomGrid] = useState(false);




    const sendDataVideo = async (thumbnail, index) => {

      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        await switchNetwork(env_SMARTCHAIN.NETWORKS[infoApp.idNetwork]);

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractWithSigner = new ethers.Contract(infoApp.appAddress, env_SMARTCHAIN.APP_CONTRACTS.video.abi, signer);

        const tx = await contractWithSigner.sendVideo(thumbnail, index, username, ' , ');
        await tx.wait(); 

        setLoadCreateState(false);
      } catch (error) {
        console.log(error)
        setLoadCreateState(false);
      }
    }

    const deleteImageDrive = async (id) => {
      const url = url_image_domain + 'delete/file' + '?password=' + password + '&id=' + id;
      axios.get(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => console.log(response.data))
      .catch(error => console.error('Error:', error));      
    }
    
    const deleteVideoDrive = async (id) => {
      const url = 'https://one.miwabox.live/drive/delete/'+ id + '?password=' + password;
      axios.get(url, {
      })
      .then(response => console.log(response.data))
      .catch(error => console.error('Error:', error));      
    }
    

    const btnCreateVideo = async () => {

      if(password.trim().length > 0 && username.trim().length > 0){
        setLoadCreateState(true);

        var formData = new FormData();
        formData.append('image', img);
        formData.append('password', password);
        axios.post(url_image_domain+'api', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        }).then(res => {

            var fileFormData = new FormData();
            fileFormData.append('file', file);
            
            axios.post('http://localhost:3000/drive/upload?password='+password+'&type_pip=2&permission=1&folder='+username, fileFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
              sendDataVideo(res.data.id, response.data.index);
            }).catch(error => {
                console.log(error);
                deleteImageDrive(res.data.id);
                setLoadCreateState(false);
            });

        }).catch(error => {
            console.log(error);
        });

      }else{
        alert('Please fill in all the required information.');
      }      
    }


    const deleteVideo = async (infovideo) =>{
      console.log(infovideo)

      deleteImageDrive(infovideo.thumbUrl)
      deleteVideoDrive(infovideo.videoUrl)

      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        await switchNetwork(env_SMARTCHAIN.NETWORKS[infoApp.idNetwork]);

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractWithSigner = new ethers.Contract(infoApp.appAddress, env_SMARTCHAIN.APP_CONTRACTS.video.abi, signer);

        const tx = await contractWithSigner.updateDisplayVideo(Number(infovideo.id), false);
        await tx.wait(); 

        setLoadCreateState(false);
      } catch (error) {
        console.log(error)
        setLoadCreateState(false);
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
    <VideoThreadContext.Provider  value={{  setDisplayCreateVideo, btnCreateVideo, deleteVideo, loadCreateState, onLoadData, 
                                            setViParam, data, gridData, scrolDex, setScrolDex, isDisplayGrid, setIsDisplayGrid, setIsScrollToBottomGrid, isScrollToBottomGrid,  
                                            username, setUsername, img, SetImg, file, SetFile, password, setPassword,
                                            videoDriveUrls, setVideoDriveUrls
                                        }}>
        {children}
    </VideoThreadContext.Provider>
  )
}

export default VideoThreadProvider