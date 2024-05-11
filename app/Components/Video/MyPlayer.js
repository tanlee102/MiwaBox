import { useCallback, useEffect, useState } from 'react'
import './css/main.css'
import './css/play.css'

const MyPlayer = ({videoRef, videoSrc}) => {


    const [playing, setPlaying] = useState(true);

    const [progress, setProgress] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const [currentTime, setCurrentTime] = useState(0);

    const [mute, setMute] = useState(videoRef.current ? videoRef.current.mute : false);


    const handlePlayPause = useCallback(() => {
        if (playing) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setPlaying(!playing);
    }, [playing, videoRef]);


    const handleVolume = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setMute(videoRef.current.muted);
        }
    }, [videoRef]);

    useEffect(() => {
        if (videoRef.current) {
            setMute(videoRef.current.muted);
        }
    }, [videoRef?.current?.muted])



    const formatTime = useCallback((time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time - minutes * 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }, []);

    const handleSeekChange = useCallback((e) => {
        const newTime = (e.target.value / 100) * videoRef.current.duration;
        videoRef.current.currentTime = newTime;
        setProgress(e.target.value);
    }, [videoRef]);

    const handleSeekMouseDown = useCallback(() => {
        setIsDragging(true);
    }, []);
    const handleSeekMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        const handleTimeUpdate = () => {
            if (!isDragging) {
                const newProgress = (videoRef?.current?.currentTime / videoRef?.current?.duration) * 100;
                setProgress(newProgress);
                setCurrentTime(videoRef.current?.currentTime);
            }
        };

        videoRef.current.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            videoRef?.current?.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [isDragging, videoRef]);



    const toggleFullScreen = useCallback(() => {
        if (!document.fullscreenElement) {
            videoRef.current.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen(); 
            }
        }
    }, [videoRef]);
    
    
  return (
    <div id='my-player-container'>

        <div id="my-player">

            <div id="b-play" onClick={handlePlayPause}>
                {!playing ? 
                    <div id="b-play-btn"> 
                        <svg viewBox="-1.5 -5 135 135" x="0px" y="0px" fill="white" stroke="#000000" strokeWidth="0" >
                            <path d="M113.956,57.006l-97.4-56.2c-4-2.3-9,0.6-9,5.2v112.5c0,4.6,5,7.5,9,5.2l97.4-56.2 C117.956,65.105,117.956,59.306,113.956,57.006z"></path>
                        </svg>
                    </div>
                    : ""
                }
            </div>

            <div id='s-play'>
                <div id='m-play'>

                    {!playing ? 
                    <div onClick={handlePlayPause} id="play-btn"> 
                        <svg width="100%" height="100%" viewBox="-1.5 -5 135 135" x="0px" y="0px" fill="white"
                            stroke="#000000" strokeWidth="0"  >
                            <path d="M113.956,57.006l-97.4-56.2c-4-2.3-9,0.6-9,5.2v112.5c0,4.6,5,7.5,9,5.2l97.4-56.2 C117.956,65.105,117.956,59.306,113.956,57.006z"></path>
                        </svg>
                    </div>
                    :
                    <div onClick={handlePlayPause} id="pause-btn">
                        <svg width="100%" height="100%" viewBox="-1.5 -1.5 32 32" x="0px" y="0px"  fill="white" stroke="#000000" strokeWidth="0">
                            <path d="M12.213,3v22.824c0,1.656-1.343,3-3,3H3.889c-1.658,0-3-1.344-3-3V3c0-1.656,1.342-3,3-3h5.324 C10.87,0,12.213,1.344,12.213,3z M24.935,0h-5.323c-1.658,0-3,1.344-3,3v22.824c0,1.656,1.342,3,3,3h5.323c1.658,0,3-1.344,3-3V3 C27.935,1.344,26.594,0,24.935,0z"></path> 
                        </svg>   
                    </div>
                    }

                    <div id='time-seek-bar'>{formatTime(currentTime)}</div>

                    <div id="volume-btn" onClick={handleVolume}>
                        {!mute ?
                            <svg  viewBox="0 0 24 24" fill="none"><path d="M12.1657 2.14424C12.8728 2.50021 13 3.27314 13 3.7446V20.2561C13 20.7286 12.8717 21.4998 12.1656 21.8554C11.416 22.2331 10.7175 21.8081 10.3623 21.4891L4.95001 16.6248H3.00001C1.89544 16.6248 1.00001 15.7293 1.00001 14.6248L1 9.43717C1 8.3326 1.89543 7.43717 3 7.43717H4.94661L10.3623 2.51158C10.7163 2.19354 11.4151 1.76635 12.1657 2.14424ZM11 4.63507L6.00618 9.17696C5.82209 9.34439 5.58219 9.43717 5.33334 9.43717H3L3.00001 14.6248H5.33334C5.58015 14.6248 5.81823 14.716 6.00179 14.881L11 19.3731V4.63507Z" fill="#000000"/><path d="M16.0368 4.73124C16.1852 4.19927 16.7368 3.88837 17.2688 4.03681C20.6116 4.9696 23 8.22106 23 12C23 15.779 20.6116 19.0304 17.2688 19.9632C16.7368 20.1117 16.1852 19.8007 16.0368 19.2688C15.8884 18.7368 16.1993 18.1852 16.7312 18.0368C19.1391 17.3649 21 14.9567 21 12C21 9.04332 19.1391 6.63512 16.7312 5.96321C16.1993 5.81477 15.8884 5.2632 16.0368 4.73124Z" fill="#000000"/><path d="M16.2865 8.04192C15.7573 7.88372 15.2001 8.18443 15.0419 8.71357C14.8837 9.24271 15.1844 9.79992 15.7136 9.95812C16.3702 10.1544 17 10.9209 17 12C17 13.0791 16.3702 13.8456 15.7136 14.0419C15.1844 14.2001 14.8837 14.7573 15.0419 15.2865C15.2001 15.8156 15.7573 16.1163 16.2865 15.9581C17.9301 15.4667 19 13.8076 19 12C19 10.1924 17.9301 8.53333 16.2865 8.04192Z" fill="#000000"/></svg>
                            :
                            <svg  viewBox="0 0 24 24" fill="none"><path  d="M13 3.7446C13 3.27314 12.8728 2.50021 12.1657 2.14424C11.4151 1.76635 10.7163 2.19354 10.3623 2.51158L4.94661 7.43717H3C1.89543 7.43717 1 8.3326 1 9.43717L1.00001 14.6248C1.00001 15.7293 1.89544 16.6248 3.00001 16.6248H4.95001L10.3623 21.4891C10.7175 21.8081 11.416 22.2331 12.1656 21.8554C12.8717 21.4998 13 20.7286 13 20.2561V3.7446ZM6.00618 9.17696L11 4.63507V19.3731L6.00179 14.881C5.81823 14.716 5.58015 14.6248 5.33334 14.6248H3.00001L3 9.43717H5.33334C5.58219 9.43717 5.82209 9.34439 6.00618 9.17696Z" fill="#000000"/><path d="M15.2929 8.29289C15.6834 7.90237 16.3166 7.90237 16.7071 8.29289L19 10.5858L21.2929 8.29289C21.6834 7.90237 22.3166 7.90237 22.7071 8.29289C23.0976 8.68342 23.0976 9.31658 22.7071 9.70711L20.4142 12L22.7071 14.2929C23.0976 14.6834 23.0976 15.3166 22.7071 15.7071C22.3166 16.0976 21.6834 16.0976 21.2929 15.7071L19 13.4142L16.7071 15.7071C16.3166 16.0976 15.6834 16.0976 15.2929 15.7071C14.9024 15.3166 14.9024 14.6834 15.2929 14.2929L17.5858 12L15.2929 9.70711C14.9024 9.31658 14.9024 8.68342 15.2929 8.29289Z" fill="#000000"/></svg>
                        }
                    </div>

                    <div id="expand-btn" onClick={toggleFullScreen}>
                        <svg viewBox="1.6 1.5 15 15" fill="white">
                            <path d="M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z"/>
                        </svg>
                    </div>

                </div>

                <div id="seek-bar">
                    <input id="thumb" type="range" value={progress} max="100" step="0.1" onChange={handleSeekChange} onMouseDown={handleSeekMouseDown} onMouseUp={handleSeekMouseUp} />
                    <progress id="progress" value={progress} max="100"></progress>
                </div>

            </div>

        </div>

        <video id="myVideo" controls={false} src={videoSrc} playsInline loop ref={videoRef}></video>

    </div>
  )
}

export default MyPlayer