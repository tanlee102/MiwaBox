import React from 'react'

const ItemApp = ({isPin=false, isSelected=false, isBorder=false, svgTag, index="...", title="...", address="TESTNET", appType=2}) => {
  return (
    <div className={`item-app ${isPin ? 'pin-item-app' : ''} ${isSelected ? 'selected-item-app' : ''}`} style={{borderBottom: isBorder ? "0.5px solid rgb(189, 189, 189)" : "none"}}>
        <div className={String("image-item-app image-type-app-"+appType)}>
            {svgTag}
        </div>
        <div className="info-item-app">
            <p>{'@' + index}</p>
            <p>{title}</p>
            <p>{address}</p>
        </div>
    </div>
  )
}

export default ItemApp
