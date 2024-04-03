import Dropdown from '@/app/Components/DropDown/DropDown';
import React from 'react'

const ListSwitchSelection = ({state=null, setState=null, options=[], isTopDropDown=false}) => {

  
  const reState = (option) =>{
    if(option?.isNa == true){
      if(state[option?.base] == true) return true
      else return false
    }

    if(state[option?.base] == false){
      return true
    }else{
      return false
    }
  }

  return (
    <>
      {options.map((option, index) => (
        (state && reState(option)) ?
          ""
        :
          option.type == 0 ?
            <div className='item-switch-selection non-select' key={index}>
              <span>{option.label}</span>
              <span className='contain-switch'>
                <label className="switch">
                  <input type="checkbox" checked={state[option.value]} onChange={() => {setState(prevState => ({...prevState, [option.value]: !prevState[option.value]})); option.func()   }}/>
                  <span className="slider round"></span>
                </label>
              </span>
            </div>
          : option.type == 1 ?   
              <div className='item-switch-selection' key={index}>
                <span>{option.label}</span>
                <Dropdown options={option.value} indexOption={option.indexOption} setIndexOption={option.setIndexOption} zIndex='1000' isTop={isTopDropDown}></Dropdown>
              </div>
            : 
              <div className='item-switch-selection' key={index}>
                <span>{option.label}</span>
                <input type={option.type} defaultValue={option.default} min={option.min} onBlur={(e) => {option.func(e.target.value, true)}} onChange={(e) => {option.func(e.target.value, false)}} className='input-text-switch-selection'/>
              </div>
      ))}
    </>
  )
}

export default ListSwitchSelection