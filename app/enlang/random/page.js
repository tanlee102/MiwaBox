'use client'

import "../../Lang/css/random.css"
import "../../Lang/css/randomRes.css"

import UnderlineInput from '@/app/Lang/Components/UnderlineInput'
import React, { useContext, useEffect, useRef, useState } from 'react'
import BottomMenu from '@/app/Lang/Components/BottomMenu'
import ListSwitchSelection from '@/app/Lang/Components/ListSwitchSelection'
import { SettingContext } from '@/app/Lang/Context/SettingContext'
import axios from 'axios'
import { link_words, part_of_speech, prefix_url_audio } from '@/app/Lang/env'

const page = () => {
  
  const [dispayOption, setDisplayOption] = useState(false);
  const {options_first_list, stateSecond, setStateSecond, options_second, indexOptionFirst} = useContext(SettingContext);

  const [data, setData] = useState([]);

  const [word, setWord] = useState("")
  const [pow, setPow] = useState("")
  const [trans, setTrans] = useState("")
  const [nChar, setNChar] = useState(5);

  const [isPause , setIsPause] = useState(false);
  
  const intervalIdRef = useRef(null);
  const [listCon, setListCon] = useState([]);
  const [listConIndex, setListConIndex] = useState([]);
  const countRef = useRef(-1);


  const audioRef = useRef(stateSecond.audio)
  useEffect(() =>{
    audioRef.current = stateSecond.audio
  }, [stateSecond.audio])

  const typeAudioRef = useRef(stateSecond.voice)
  useEffect(() => {
    typeAudioRef.current = stateSecond.voice
  }, [stateSecond.voice])



  async function getData() {
    try {
        let url = link_words[indexOptionFirst]
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
        return JSON.parse(res)   
    } catch (error) {
        console.log(error)
        return []
    }
  }

  async function getDataWords(){
    let res = await getData();
    setData(res);
  }


  async function getRandomJson() {
    const randomIndex = Math.floor(Math.random() * data.length);

    if(listConIndex.indexOf(randomIndex) === -1){
      const randomJson = data[randomIndex];
      setListConIndex((listConIndex) => [...listConIndex, randomIndex]);
      return randomJson;
    }else{
      return getRandomJson();
    }
  }


  const setInfoWord = async (data_info) => {
    setWord(data_info.key) 
    setPow(data_info.type) 
    setTrans(data_info.trans) 

    if(audioRef.current){
      let voice = typeAudioRef.current ? "audio_gb" : "audio_us"
      const audio = new Audio(prefix_url_audio + voice +"/"+data_info.key+".mp3");
      await audio.play();
    }
  }


  const initializeRandom = async () => {
    if(data.length > 0){

      if(countRef.current >= listCon.length - 1){
        let infoWord = await getRandomJson();

        setInfoWord(infoWord);

        setNChar(infoWord.key.length);
        setListCon((listCon) => [...listCon, infoWord]);
        countRef.current = countRef.current + 1;
      }else{
        let tmp = listCon[countRef.current + 1]
        setInfoWord(tmp)
        countRef.current = countRef.current + 1;
      }

    }
  }

  const startInterval = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
    intervalIdRef.current = setInterval(initializeRandom, stateSecond.time*1000);
  };

  const deleteInterval = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
  };




  //HANDLE SWITCH -----------------------------------
  useEffect(() => {
    if(stateSecond.txtinput == false){
      startInterval()
    }
  }, [stateSecond.time]);


  useEffect(() => {

    if(stateSecond.txtinput == false){
      startInterval()
    }else{
      setIsPause(false)
      deleteInterval()
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [stateSecond.txtinput]);



  //HANDLE PAUSE -----------------------------------
  useEffect(() => {
    if(stateSecond.txtinput == false){
      if(isPause == true){
        deleteInterval()
      }else{
        startInterval()
      }
    }
  }, [isPause])




  //HANDLE MOVE LEFT RIGHT -----------------------------------
  function moveLeft(){
    setIsPause(true)
    if(countRef.current - 1 >= 0){
      let tmp = listCon[countRef.current - 1]
      setInfoWord(tmp)
      countRef.current = countRef.current - 1;
    }
  }

  function moveRight(){
    setIsPause(true)
    initializeRandom();
  }



  //HANDLE AUDIO CLICK -----------------------------------
  const handleAudio1Click = async () => {
    const audio = new Audio(prefix_url_audio+"audio_gb/"+word+".mp3");
    await audio.play();
  };

  const handleAudio2Click = async () => {
    const audio = new Audio(prefix_url_audio+"audio_us/"+word+".mp3");
    await audio.play();
  };



  //HANDLE ENTER -----------------------------------
  const handlerEnter = async (text, callback) =>{
      callback(String(text).toLowerCase() === word)
      if(String(text).toLowerCase() === word){
        initializeRandom()
      }
  }




  //INITIAL -----------------------------------
  useEffect(() => {
    if(data.length > 0){
      if(stateSecond.txtinput == false){
        initializeRandom();
        startInterval();
      }else{
        setIsPause(false);
        deleteInterval();
        initializeRandom();
      }
    }
  }, [data]);

  useEffect(() => {
    getDataWords()
  }, [])


  useEffect(() => {
    getDataWords()
  }, [indexOptionFirst])




  //HAND LOCALSTORAGE------------------

  useEffect(() => {
    if(stateSecond.txtinput != -1) localStorage.setItem("inputToMove", stateSecond.txtinput)
  }, [stateSecond.txtinput])

  useEffect(() => {
    setStateSecond(prevState => ({...prevState, txtinput: localStorage.getItem("inputToMove") !== "false" }));
  }, [])



  
  return (
    <div className='main'>
     
        <div className='title-random-word'>Từ vựng ngẫu nhiên {options_first_list[0].value[indexOptionFirst]}</div>
        <div className='contain-random'>

          <p className={stateSecond?.engsub ? "" : "hide"}>{word}</p>
          <p>- {part_of_speech[pow]} -</p>
          <p className={stateSecond?.vietsub ? "" : "hide"}>{trans}</p>

          <div className='volume-random'>
            <span onClick={handleAudio1Click}>
                <svg fill="#000000" viewBox="0 0 115.3 115.3"> <g> <path d="M47.9,14.306L26,30.706H6c-3.3,0-6,2.7-6,6v41.8c0,3.301,2.7,6,6,6h20l21.9,16.4c4,3,9.6,0.2,9.6-4.8v-77 C57.5,14.106,51.8,11.306,47.9,14.306z"/> <path d="M77.3,24.106c-2.7-2.7-7.2-2.7-9.899,0c-2.7,2.7-2.7,7.2,0,9.9c13,13,13,34.101,0,47.101c-2.7,2.7-2.7,7.2,0,9.899 c1.399,1.4,3.199,2,4.899,2s3.601-0.699,4.9-2.1C95.8,72.606,95.8,42.606,77.3,24.106z"/> <path d="M85.1,8.406c-2.699,2.7-2.699,7.2,0,9.9c10.5,10.5,16.301,24.4,16.301,39.3s-5.801,28.8-16.301,39.3 c-2.699,2.7-2.699,7.2,0,9.9c1.4,1.399,3.2,2.1,4.9,2.1c1.8,0,3.6-0.7,4.9-2c13.1-13.1,20.399-30.6,20.399-49.2 c0-18.6-7.2-36-20.399-49.2C92.3,5.706,87.9,5.706,85.1,8.406z"/> </g> </svg>
            </span>
            <span onClick={handleAudio2Click}>
                <svg fill="#000000" viewBox="0 0 115.3 115.3"> <g> <path d="M47.9,14.306L26,30.706H6c-3.3,0-6,2.7-6,6v41.8c0,3.301,2.7,6,6,6h20l21.9,16.4c4,3,9.6,0.2,9.6-4.8v-77 C57.5,14.106,51.8,11.306,47.9,14.306z"/> <path d="M77.3,24.106c-2.7-2.7-7.2-2.7-9.899,0c-2.7,2.7-2.7,7.2,0,9.9c13,13,13,34.101,0,47.101c-2.7,2.7-2.7,7.2,0,9.899 c1.399,1.4,3.199,2,4.899,2s3.601-0.699,4.9-2.1C95.8,72.606,95.8,42.606,77.3,24.106z"/> <path d="M85.1,8.406c-2.699,2.7-2.699,7.2,0,9.9c10.5,10.5,16.301,24.4,16.301,39.3s-5.801,28.8-16.301,39.3 c-2.699,2.7-2.699,7.2,0,9.9c1.4,1.399,3.2,2.1,4.9,2.1c1.8,0,3.6-0.7,4.9-2c13.1-13.1,20.399-30.6,20.399-49.2 c0-18.6-7.2-36-20.399-49.2C92.3,5.706,87.9,5.706,85.1,8.406z"/> </g> </svg>
            </span>
          </div>


          {stateSecond.txtinput ? 
              <UnderlineInput nChar={nChar} handlerEnter={handlerEnter}></UnderlineInput> 
            :
              <div className='move-left-or-right-random-word'>
                <span onClick={() => {moveLeft()}}>
                  <svg viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z" fill="#000000"/></svg>
                </span>
                <span onClick={() => setIsPause(!isPause)}>
                  {isPause == false ?
                    <svg viewBox="0 0 24 24" fill="none" ><path d="M8.5 7V18" stroke="#000000" strokeWidth="3" strokeLinecap="round"/><path d="M15.5 7V12.5V18" stroke="#000000" strokeWidth="3" strokeLinecap="round"/></svg>
                  :
                    <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.286 3.407A1.5 1.5 0 0 0 6 4.684v14.632a1.5 1.5 0 0 0 2.286 1.277l11.888-7.316a1.5 1.5 0 0 0 0-2.555L8.286 3.407z" fill="#000000"/></svg>
                  }
                </span>
                <span onClick={() => {moveRight()}}>
                  <svg viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M8.29289 4.29289C8.68342 3.90237 9.31658 3.90237 9.70711 4.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L9.70711 19.7071C9.31658 20.0976 8.68342 20.0976 8.29289 19.7071C7.90237 19.3166 7.90237 18.6834 8.29289 18.2929L14.5858 12L8.29289 5.70711C7.90237 5.31658 7.90237 4.68342 8.29289 4.29289Z" fill="#000000"/></svg>
                </span>
              </div> 
          }
        </div>

        <p id="notice-random-word">Hãy click vào màn hình bất kỳ để nghe audio nếu bạn đã refresh trang web</p>


        <div className='list-switch-selection' style={{display: dispayOption ? "block" : "none"}}>
            <ListSwitchSelection options={options_second} state={stateSecond} setState={setStateSecond}></ListSwitchSelection>
            <ListSwitchSelection options={options_first_list} state={null} setState={null} isTopDropDown={true}></ListSwitchSelection>
        </div>

        <BottomMenu setDisplayOption={setDisplayOption} dispayOption={dispayOption}></BottomMenu>

    </div>
  )
}

export default page