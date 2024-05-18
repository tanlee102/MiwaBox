import React from 'react'

const LoadMore = ({loadState, setLoadState, btnAct}) => {
  return (
    <div className="load-more non-select">
        { (loadState || loadState == -1)?  "" : <div className="button-load-more"><span onClick={() => {setLoadState(true); btnAct()}}>Xem thêm</span></div> }
        { (loadState && loadState !== -1)? <div className="loader-circle"><div></div></div> : ""}
    </div>
  )
}

export default LoadMore