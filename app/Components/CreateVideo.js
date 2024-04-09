import React, { useContext, useState } from 'react'
import HLSVideoPlayer from './HLSVideoPlayer';
import { VideoThreadContext } from '../Context/VideoThreadContext';

const CreateVideo = () => {


    const {url, setUrl, publicUrl, setPublicUrl, username, setUsername, link, setLink, SetFile, password, setPassword} = useContext(VideoThreadContext)


    const createThumbnail = () => {
        var video = document.querySelector('.contain-create-video-thread video');
        var canvas = document.getElementById('thumbnailCanvas');
        var ctx = canvas.getContext('2d');
        
        var scale = 0.4;
        canvas.width = video.videoWidth * scale;
        canvas.height = video.videoHeight * scale;
        
        // Draw current frame of the video onto the canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Create thumbnail image from the canvas data
        var thumbnailDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        
        // Create img element with the thumbnail
        var thumbnailImg = document.createElement('img');
        thumbnailImg.src = thumbnailDataUrl;
        
        // Remove existing thumbnail image, if any
        var thumbnailContainer = document.getElementById('thumbnailContainer');
        thumbnailContainer.innerHTML = '';
    
        // Append the new thumbnail image to the document
        thumbnailContainer.appendChild(thumbnailImg);
    
        // Convert data URL to Blob
        var thumbnailBlob = dataURLtoBlob(thumbnailDataUrl);
    
        // Convert Blob to File
        var thumbnailFile = new File([thumbnailBlob], 'thumbnail.jpg', {type: 'image/jpeg'});

        SetFile(thumbnailFile);
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
    <div className='contain-create-video-thread'>
        <div>
            <input value={url} type='text' placeholder='URL'
                onChange={(event) => {
                    setUrl(event.target.value);
                }}
            />
            <span onClick={() => {
                setPublicUrl(url)
            }}><svg viewBox="0 0 367.136 367.136"><path d="M185.262,1.694c-34.777,0-68.584,9.851-97.768,28.488C59.1,48.315,36.318,73.884,21.613,104.126l26.979,13.119c25.661-52.77,78.03-85.551,136.67-85.551c83.743,0,151.874,68.13,151.874,151.874s-68.131,151.874-151.874,151.874c-49.847,0-96.44-24.9-124.571-65.042l53.219-52.964H0v113.365l39.14-38.953c13.024,17.561,29.147,32.731,47.731,44.706c29.33,18.898,63.353,28.888,98.391,28.888c100.286,0,181.874-81.588,181.874-181.874S285.548,1.694,185.262,1.694z"/></svg></span>
        </div>

        <div style={{display: publicUrl.length > 7 ? "flex" : "none"}}>
            {String(publicUrl).includes('m3u8') ?
                <HLSVideoPlayer src={(publicUrl)} />
            :
                <video crossOrigin="anonymous" id='myVideo' controls src={publicUrl}></video>
            }
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

        <div>
            <input value={link} type='text' placeholder='Link'
                onChange={(event) => {
                    setLink(event.target.value);
                }} />
        </div>

        <div>
            <input value={password} type='text' placeholder='Password'
                onChange={(event) => {
                    setPassword(event.target.value);
                }} />
        </div>

    </div>
  )
}

export default CreateVideo