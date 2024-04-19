'use client'
import React, { useContext, useEffect, useState } from 'react'
import ListSwitchSelection from '../Lang/Components/ListSwitchSelection'
import axios from 'axios';
import Link from 'next/link';
import { link_words_today, part_of_speech } from '../Lang/env';
import { SettingContext } from '../Lang/Context/SettingContext';


async function getData() {
  try {
      let url = link_words_today
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
 


const page = () => {


  const [data, setData] = useState([]);
  async function getDataWords(){
    let res = await getData();
    setData(res)
  }
  useEffect(() =>{
    getDataWords()
  }, [])



  const { stateFirst, setStateFirst, options_first, options_first_list,
          stateSecond, setStateSecond, options_second, 
          stateThird, setStateThird, options_third} = useContext(SettingContext);



  //HAND LOCALSTORAGE------------------

  useEffect(() => {
    if(stateFirst.random != -1) localStorage.setItem("randomState", stateFirst.random)
  }, [stateFirst.random])

  useEffect(() => {
    setStateFirst(prevState => ({...prevState, random: localStorage.getItem("randomState") !== "false" }));
  }, [])



  useEffect(() => {
    if(stateSecond.txtinput != -1) localStorage.setItem("inputToMove", stateSecond.txtinput)
  }, [stateSecond.txtinput])

  useEffect(() => {
    setStateSecond(prevState => ({...prevState, txtinput: localStorage.getItem("inputToMove") !== "false" }));
  }, [])




  return (

    <div className='main'>

      <div className='contain-generate'>

        <div id='title-enlang-app'>5000 từ vựng tiếng Anh thông dụng</div>
        <div className='list-switch-generate'>
          <ListSwitchSelection options={options_first} state={stateFirst} setState={setStateFirst} isTopDropDown={false}></ListSwitchSelection>
          <ListSwitchSelection options={options_first_list} isTopDropDown={false}></ListSwitchSelection>
          {stateFirst.random ?
            <ListSwitchSelection options={options_second} state={stateSecond} setState={setStateSecond}></ListSwitchSelection>
            :
            <ListSwitchSelection options={options_third} state={stateThird} setState={setStateThird}></ListSwitchSelection>
          }
        </div>

        <div id='action-enlang-app'>
          <div>
          <Link href={"/"}>
            <span>
              <svg viewBox="0 0 603.000000 669.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,669.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M1615 5695 c-764 -486 -1391 -889 -1393 -895 -2 -5 1 -10 7 -10 16 0 15 -2857 0 -2862 -16 -5 11 -48 29 -48 8 0 630 -392 1383 -870 1289 -820 1370 -870 1393 -858 13 7 643 407 1399 888 893 567 1373 878 1367 884 -14 14 -14 2858 0 2872 6 6 -485 324 -1382 894 -766 487 -1397 886 -1402 887 -6 1 -636 -396 -1401 -882z m2646 -95 c684 -435 1245 -794 1246 -798 3 -10 -2486 -1588 -2500 -1584 -12 4 -2478 1569 -2488 1580 -6 6 2476 1590 2492 1591 4 1 566 -355 1250 -789z m-2576 -1725 c666 -422 1220 -776 1233 -788 l22 -20 0 -1344 c0 -739 -2 -1343 -5 -1343 -3 0 -178 109 -388 243 -210 134 -389 246 -398 249 -13 5 -1319 836 -1671 1064 l-108 69 0 1352 0 1353 53 -34 c28 -18 596 -379 1262 -801z m3973 -522 l-3 -1357 -255 -162 c-711 -449 -2278 -1439 -2298 -1452 l-22 -14 2 1362 3 1362 1280 808 c704 444 1283 809 1288 809 4 1 6 -610 5 -1356z"/> <path d="M2020 4063 c0 -5 221 -149 490 -320 l488 -313 479 306 c263 168 485 312 493 320 12 12 -126 14 -968 14 -540 0 -982 -3 -982 -7z"/> <path d="M1060 3322 c0 -5 -34 -222 -75 -482 -41 -260 -75 -478 -75 -484 0 -9 278 -196 292 -196 2 0 18 85 33 190 18 116 33 184 38 175 4 -8 51 -133 103 -277 53 -145 99 -267 104 -271 4 -5 54 57 110 138 56 80 104 144 106 143 2 -2 15 -91 29 -198 14 -107 28 -212 31 -234 6 -36 13 -42 151 -133 80 -52 146 -93 148 -91 4 3 -143 1180 -148 1183 -45 33 -219 145 -225 145 -5 0 -51 -63 -102 -140 l-94 -140 -16 43 c-9 23 -51 143 -94 267 l-78 225 -109 73 c-105 70 -129 81 -129 64z"/> <path d="M2130 2096 l0 -543 137 -89 c75 -49 140 -90 145 -92 4 -2 8 241 8 541 l0 545 -139 91 c-77 50 -142 91 -145 91 -4 0 -6 -245 -6 -544z"/> <path d="M4974 3367 l-161 -102 -190 -662 c-110 -381 -186 -663 -179 -662 6 0 76 42 156 93 l145 93 21 73 21 74 177 113 c173 110 196 122 196 104 0 -5 7 -25 15 -44 l15 -36 155 97 c85 53 155 101 155 105 0 8 -343 815 -359 844 -4 8 -60 -22 -167 -90z m85 -641 c-32 -23 -171 -107 -174 -104 -3 3 68 276 81 308 3 9 23 -26 51 -93 25 -59 44 -109 42 -111z"/> <path d="M4280 2921 l-135 -88 -30 -240 -30 -241 -103 149 c-57 82 -107 149 -111 149 -5 0 -55 -126 -111 -280 -57 -154 -104 -279 -106 -278 -1 2 -14 86 -29 188 -15 102 -30 188 -34 192 -11 12 -286 -171 -285 -190 1 -41 138 -968 143 -974 6 -7 221 126 232 144 4 6 46 121 94 257 48 135 90 249 94 253 4 5 48 -55 99 -133 63 -96 96 -138 104 -133 135 80 219 139 223 157 2 12 34 267 70 567 36 300 68 555 71 568 3 14 0 22 -8 21 -7 0 -74 -40 -148 -88z"/> </g> </svg>
            </span>
          </Link>
          <Link href={stateFirst.random==false ? "/enlang/list" : "/enlang/random"}>
            <span>
              Thực hiện
            </span>
          </Link>
          </div>
        </div>

      </div>


      <div id='random-list-word-enlang-app'> 
        <div className='contain-list-word'>
          <div className='title-list-word'>Từ vựng hôm nay</div>
          {data.map((item, index) => (
            <div className='item-list-word' key={index}>
                <span><p>{index+1}</p></span>
                <span><p>{item.key}</p></span>
                <span><p>{part_of_speech[item.type]}</p></span>
                <span>{item.trans}</span>
            </div>
          ))}
        </div>
      </div>


    </div>
  )
}

export default page