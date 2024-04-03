"use client";

import React, { createContext, useState } from 'react'
import { defaultTime } from '../env';

export const SettingContext = createContext();

const SettingProvider = ({ children }) => {


    const [stateFirst, setStateFirst] = useState({
        random: -1,
    });
    const options_first = [
        { type: 0, 
          label: 'Chế độ ngẫu nhiên', 
          value: 'random', 
          func: () => {
          }
        },
    ];



    const [indexOptionFirst, setIndexOptionFirst] = useState(0);    
    const options_first_list = [
        { type: 1, 
          label: 'Cấp độ (CEFR)', 
          value: ['A1 - 1077','A2 - 993','B1 - 901','B2 - 1573','C1 - 1404'], 
          indexOption: indexOptionFirst, 
          setIndexOption: setIndexOptionFirst, 
        },
    ];



    const [stateSecond, setStateSecond] = useState({
        audio: true,
        txtinput: -1,
        voice: true,
        time: defaultTime,
        vietsub: true,
        engsub: true
    });
    const options_second = [
        { type: 0, 
          label: 'Nhập để chuyển tiếp', 
          value: 'txtinput', 
          func: () => {
          }
        },
        { type: 2, 
          label: 'Thời gian',
          type: 'number',
          default: String(defaultTime),
          min: String(defaultTime),
          base: 'txtinput',
          isNa: true,
          func: (text, isBlur) => {
            if(isBlur){
              setStateSecond(prevState => ({...prevState, time: Number(text)}));
            }
          }
        },
        { type: 0, 
          label: 'Audio', 
          value: 'audio', 
          func: () => {
          }
        },
        { type: 0,
          label: 'Giọng GB', 
          value: 'voice', 
          base: 'audio',
          func: () => {
          }
        },
        { type: 0, 
          label: 'Tiếng Việt', 
          value: 'vietsub', 
          func: () => {
          }
        },
        { type: 0, 
          label: 'Tiếng Anh', 
          value: 'engsub', 
          func: () => {
          }
        },
    ];
    
    


    const [stateThird, setStateThird] = useState({
        audio: true,
        txtsub: true,
        random: false
    });
    const options_third = [
        { type: 0, 
          label: 'Tiếng Việt', 
          value: 'txtsub', 
          func: () => {
          }
        },
        { type: 0, 
          label: 'Audio', 
          value: 'audio', 
          func: () => {
          }
        },
        { type: 0, 
          label: 'Ngẫu nhiên', 
          value: 'random', 
          func: () => {
          }
        },
    ];
    
    

  return (
    <SettingContext.Provider  value={{stateFirst, setStateFirst, options_first, options_first_list, indexOptionFirst,
                                      stateSecond, setStateSecond, options_second, 
                                      stateThird, setStateThird, options_third
                                    }}>
        {children}
    </SettingContext.Provider>
  )
}

export default SettingProvider