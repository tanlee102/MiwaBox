import React, { useContext } from 'react'
import { VideoThreadContext } from '../Context/VideoThreadContext';
import { AppsConext } from '../Context/AppsContext';
import { AccountContext } from '../Context/AccountContext';

const CreateVideo = () => {

    const { username, setUsername, file, SetFile, SetImg, 
            isUploadFB, setIsUploadFB, isUsingWorker, setIsUsingWorker} = useContext(VideoThreadContext)
    const {infoApp} = useContext(AppsConext);
    const {account} = useContext(AccountContext);
  
    
    const puttingFile = (e) => {
        var file = e.target.files[0];
        var url = URL.createObjectURL(file);
        var videoPlayer = document.getElementById('myVideo');
        videoPlayer.src = url;

        SetFile(file);
    }

    const createThumbnail = () => {
        var videoPlayer = document.getElementById('myVideo');
        var canvas = document.getElementById('thumbnailCanvas');
        var ctx = canvas.getContext('2d');
        
        var scale = 0.3;
        canvas.width = videoPlayer.videoWidth * scale;
        canvas.height = videoPlayer.videoHeight * scale;
        
        ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
        var thumbnailDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        var thumbnailImg = document.createElement('img');
        thumbnailImg.src = thumbnailDataUrl;
        var thumbnailContainer = document.getElementById('thumbnailContainer');
        thumbnailContainer.innerHTML = '';
        thumbnailContainer.appendChild(thumbnailImg);
        var thumbnailBlob = dataURLtoBlob(thumbnailDataUrl);
        var thumbnailFile = new File([thumbnailBlob], 'thumbnail.jpg', {type: 'image/jpeg'});

        SetImg(thumbnailFile);
    }
    function dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
    }


  return (
    <>
    {String(infoApp?.creatorAddress).toLowerCase() === String(account).toLowerCase() ?
    <div className='contain-create-video-thread'>

        <div>
           <input onChange={puttingFile} type="file" id="videoUpload" accept="video/*"/>
        </div>

        <div style={{display: file !== null ? "flex" : "none"}}>
            <video crossOrigin="anonymous" id='myVideo' controls></video>
            <span onClick={createThumbnail} id="captureThumbnailBtn">
                <svg viewBox="0 0 24 24"><path d="M3 9.8541C3 8.83011 3.83011 8 4.8541 8V8C5.55638 8 6.19839 7.60322 6.51246 6.97508L7.33333 5.33333C7.44329 5.11342 7.49827 5.00346 7.56062 4.90782C7.8859 4.40882 8.41668 4.08078 9.00848 4.01299C9.1219 4 9.24484 4 9.49071 4H14.5093C14.7552 4 14.8781 4 14.9915 4.01299C15.5833 4.08078 16.1141 4.40882 16.4394 4.90782C16.5017 5.00346 16.5567 5.11342 16.6667 5.33333L17.4875 6.97508C17.8016 7.60322 18.4436 8 19.1459 8V8C20.1699 8 21 8.83011 21 9.8541V14.8571C21 16.8619 21 17.8643 20.5402 18.5961C20.3004 18.9777 19.9777 19.3004 19.5961 19.5402C18.8643 20 17.8619 20 15.8571 20H8.14286C6.1381 20 5.13571 20 4.4039 19.5402C4.02229 19.3004 3.69961 18.9777 3.45983 18.5961C3 17.8643 3 16.8619 3 14.8571V9.8541Z" stroke="#222222"/><circle cx="12" cy="13" r="3.5" stroke="#222222"/></svg>
            </span>
            <canvas id="thumbnailCanvas" style={{display: 'none'}}></canvas>
            <div id="thumbnailContainer"></div>
        </div>

        <div>
            <input value={username} type='text' placeholder='Username'
                onChange={(event) => {
                    setUsername(event.target.value);
                }} />
        </div>

        <label>
            <br/>
            <input type="checkbox" checked={isUploadFB} onChange={() => {setIsUploadFB(!isUploadFB)}}/>Upload FB
        </label>

        <label>
            <br/>
            <input type="checkbox" checked={isUsingWorker} onChange={() => {setIsUsingWorker(!isUsingWorker)}}/>Using Worker
        </label>

    </div>
    : ""}
    </>
  )
}

export default CreateVideo