'use client'
import React, { useContext, useState } from 'react'

import ListWord from '../../Lang/Components/ListWord'
import ListSwitchSelection from '../../Lang/Components/ListSwitchSelection'
import BottomMenu from '../../Lang/Components/BottomMenu'
import { SettingContext } from '@/app/Lang/Context/SettingContext'
import { link_words } from '@/app/Lang/env'

const page = () => {

  const { stateThird, setStateThird, options_third, options_first_list, indexOptionFirst } = useContext(SettingContext);
  const [dispayOption, setDisplayOption] = useState(false)

  return (
    <div>
        <BottomMenu setDisplayOption={setDisplayOption} dispayOption={dispayOption}></BottomMenu>
        <div className='list-switch-selection' style={{display: dispayOption ? "block" : "none"}}>
            <ListSwitchSelection options={options_third} state={stateThird} setState={setStateThird}></ListSwitchSelection>
            {/* <ListSwitchSelection options={options_first_list} state={null} setState={null} isTopDropDown={true}></ListSwitchSelection> */}
        </div>
        <ListWord url={link_words[indexOptionFirst]} label={options_first_list[0].value[indexOptionFirst]} isAudio={stateThird.audio} isRandom={stateThird.random} isTrans={stateThird.txtsub}></ListWord>
    </div>
  )
}

export default page