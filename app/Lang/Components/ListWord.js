"use client"

import { randomSort } from '@/app/helper/randomSort';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { part_of_speech, prefix_url_audio } from '../env';
   
const ListWord = ({label="", isRandom=false, isAudio=true, isTrans=true, url}) => {

    const [data, setData] = useState([]);
    const [isplaying, setIsplaying] = useState(false);
    const [currentItemId, setCurrentItemId] = useState(-1);

    async function getData() {
      try {
          let res = []
          if(localStorage.getItem(url)) res = localStorage.getItem(url)
          else{
            res = await axios.get(url); 
            res = JSON.stringify(res.data)
            try {
              localStorage.setItem(url, res) 
            } catch (error) {
              console.log(error)
            }
          }
          return res   
      } catch (error) {
          console.log(error)
          return []
      }
    }

    async function getDataWords(){
      let res = await getData();
      res = JSON.parse(res);
      if(isRandom) res.sort(randomSort);
      setData(res);
    }

    useEffect(() => {
      getDataWords()
    }, [isRandom])

    useEffect(() =>{
      getDataWords()
    }, [])


    const playAudio = async (word, index) => {
      if(isplaying == false && isAudio == true){
        setIsplaying(true)
        setCurrentItemId(index)
        const audio = new Audio(prefix_url_audio+"audio_us/"+word+".mp3");
        await audio.play();
        setTimeout(() => {
          setCurrentItemId(-1);
          setIsplaying(false)
        }, 400)
      }
    };


  return (

    <div className='contain-list-word'>
        <div className='title-list-word'>Danh sách từ vựng {label}</div>
        {data.map((item, index) => (
            <div key={index} style={{backgroundColor: currentItemId == index ? "rgb(128, 171, 251)" : "white", color:  currentItemId == index ? "white" : "", borderColor: currentItemId == index ? "none" : "", cursor: isAudio ? "pointer" : "default"}} onClick={() => {playAudio(item.key, index)}} className='item-list-word non-select'>
                <span style={{opacity:  currentItemId == index ? "1" : ""}}><p>{index+1}</p></span>
                <span style={{color:  currentItemId == index ? "white" : ""}}><p>{item.key}</p></span>
                <span style={{opacity:  currentItemId == index ? "1" : ""}}><p>{part_of_speech[item.type]}</p></span>
                <span style={{color:  currentItemId == index ? "white" : ""}}>
                  {isTrans ? item.trans : ""}
                </span>
            </div>
        ))}
    </div>
  )
}

export default ListWord