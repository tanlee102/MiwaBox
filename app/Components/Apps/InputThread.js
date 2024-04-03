import React, { useContext, useEffect } from 'react'
import { AppsConext } from '@/app/Context/AppsContext';
import { InputContext } from '@/app/Context/InputContext'
import { ThreadContext } from '@/app/Context/ThreadContext';

const InputThread = () => {

  const { setDisplayInputBox, listUrlImage, setListUrlImage, addMessages, addText,
          boldMode, setBoldMode, headMode, setHeadMode, centerMode, setCenterMode, loadSending } = useContext(InputContext);
  const { infoApp } = useContext(AppsConext);
  const { getNextMessages } = useContext(ThreadContext);


  useEffect(() => {
    const videoElements = document.getElementsByTagName('video');
    const videosArray = Array.from(videoElements);
    videosArray.forEach((video) => {
      video.currentTime = 2;
    });
  }, []);


  const handleRemoveItem = (index) => {
    const updatedList = [...listUrlImage];
    updatedList.splice(index, 1);
    setListUrlImage(updatedList);
  };


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if(infoApp.appType == 0){
        addMessages(getNextMessages);
      }else{
        addText();
      }
      console.log("Sending...");
    }
  };


  const onPaste = (e) => {
    e.preventDefault();
    var text = (e.originalEvent || e).clipboardData.getData('text/plain');
    document.execCommand("insertText", false, text);
  };


  return (
    <div className="contain-input-thread">
        
      <div style={{display: infoApp?.appType == 0 ? "none" : "flex"}} className="style-input-thread">
        <span onClick={() => {setHeadMode(!headMode)}} style={{backgroundColor: headMode ? "rgb(115, 115, 115)" : "rgb(231, 231, 231)"}}><svg style={{fill: headMode ? "white" : "black"}} fill="#000000" viewBox="0 0 325.495 325.496"><path d="M317.884,12.818c-0.062-5.479-4.521-9.889-10-9.889H10c-5.523,0-10,4.479-10,10v55c0,5.523,4.477,10,10,10h22.596c3.039,0,5.912-1.381,7.809-3.752l16.998-21.248h71.592v259.635c0,5.523,4.477,10,10,10h40c5.521,0,10-4.477,10-10V52.93h71.512l17.082,21.264c1.898,2.363,4.767,3.736,7.797,3.736h22.588c2.66,0,5.212-1.061,7.089-2.945c1.877-1.887,2.926-4.441,2.911-7.102L317.884,12.818z"/><path d="M245.502,274.937c2.627,3.408,7.144,4.754,11.207,3.342l12.756-4.438l-0.002,38.723c0,2.652,1.053,5.197,2.928,7.072s4.421,2.93,7.072,2.93h9.992c5.521,0,10-4.479,10-10v-38.725l12.756,4.438c4.064,1.416,8.578,0.066,11.205-3.342c2.627-3.41,2.779-8.117,0.375-11.688l-31.035-46.113c-1.858-2.762-4.969-4.418-8.297-4.418s-6.438,1.656-8.295,4.418l-31.037,46.113C242.725,266.82,242.875,271.527,245.502,274.937z"/></svg></span>
        <span onClick={() => {setBoldMode(!boldMode)}} style={{backgroundColor: boldMode ? "rgb(115, 115, 115)" : "rgb(231, 231, 231)"}}><svg style={{fill: boldMode ? "white" : "black"}} fill="#000000" viewBox="-1.5 0 24 24"><path d="m21.22 7.091c-.005-3.915-3.178-7.087-7.093-7.091h-11.946c-1.205 0-2.182.977-2.182 2.182s.977 2.182 2.182 2.182h.927v15.272h-.927c-1.205 0-2.182.977-2.182 2.182s.977 2.182 2.182 2.182h11.946.003c3.914 0 7.087-3.173 7.087-7.087 0-1.908-.754-3.64-1.981-4.915l.002.002c1.226-1.269 1.981-3 1.981-4.906 0-.001 0-.002 0-.003zm-7.09 2.727h-6.657v-5.455h6.655c1.506 0 2.727 1.221 2.727 2.727s-1.221 2.727-2.727 2.727zm0 9.818h-6.657v-5.454h6.655c1.506 0 2.727 1.221 2.727 2.727s-1.221 2.727-2.727 2.727z"/></svg></span>
        <span onClick={() => {setCenterMode(!centerMode)}} style={{backgroundColor: centerMode ? "rgb(115, 115, 115)" : "rgb(231, 231, 231)"}}><svg style={{fill: centerMode ? "white" : "black"}} fill="#000000" viewBox="0 0 52 52"><path d="M48,6.5C48,5.7,47.3,5,46.5,5h-41C4.7,5,4,5.7,4,6.5v3C4,10.3,4.7,11,5.5,11h41c0.8,0,1.5-0.7,1.5-1.5V6.5z"/><path d="M42,18.5c0-0.8-0.7-1.5-1.5-1.5h-29c-0.8,0-1.5,0.7-1.5,1.5v3c0,0.8,0.7,1.5,1.5,1.5h29c0.8,0,1.5-0.7,1.5-1.5V18.5z"/><path d="M40,42.5c0-0.8-0.7-1.5-1.5-1.5h-25c-0.8,0-1.5,0.7-1.5,1.5v3c0,0.8,0.7,1.5,1.5,1.5h25c0.8,0,1.5-0.7,1.5-1.5V42.5z"/><path d="M48,30.5c0-0.8-0.7-1.5-1.5-1.5h-41C4.7,29,4,29.7,4,30.5v3C4,34.3,4.7,35,5.5,35h41c0.8,0,1.5-0.7,1.5-1.5V30.5z"/></svg></span>
      </div>

      <div className="input-thread">
        <div style={{display: listUrlImage.length === 0 ? "none" : "flex"}} className="contain-input-url">
          <div className="contain-input-url-items">
            {listUrlImage.map((item, index) => (
                <div key={index}>
                  <svg onClick={() => handleRemoveItem(index)} viewBox="0 0 24 24">
                    <path
                      d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
                      fill="#0F0F0F"
                    />
                  </svg>
                  <span>
                    {item.type === 0 ? (
                      <img src={item.url} alt="Image" />
                    ) : (
                      <video src={item.url} poster={String(item.url).includes(".m3u8") ? "/icon/item/hls.png" : ""} />
                    )}
                  </span>
                </div>
              ))}      
          </div>
        </div>
        <div className="contain-input-thr">
          <div onPaste={(e) => onPaste(e)} onKeyDown={handleKeyDown} contentEditable='true' className="input-thr"  placeholder="Aa"></div>
          <div className="btn-input-thread">
              <svg onClick={() => {setDisplayInputBox(true)}} viewBox="0 0 24 24" fill="none"><path d="M9.16488 17.6505C8.92513 17.8743 8.73958 18.0241 8.54996 18.1336C7.62175 18.6695 6.47816 18.6695 5.54996 18.1336C5.20791 17.9361 4.87912 17.6073 4.22153 16.9498C3.56394 16.2922 3.23514 15.9634 3.03767 15.6213C2.50177 14.6931 2.50177 13.5495 3.03767 12.6213C3.23514 12.2793 3.56394 11.9505 4.22153 11.2929L7.04996 8.46448C7.70755 7.80689 8.03634 7.47809 8.37838 7.28062C9.30659 6.74472 10.4502 6.74472 11.3784 7.28061C11.7204 7.47809 12.0492 7.80689 12.7068 8.46448C13.3644 9.12207 13.6932 9.45086 13.8907 9.7929C14.4266 10.7211 14.4266 11.8647 13.8907 12.7929C13.7812 12.9825 13.6314 13.1681 13.4075 13.4078M10.5919 10.5922C10.368 10.8319 10.2182 11.0175 10.1087 11.2071C9.57284 12.1353 9.57284 13.2789 10.1087 14.2071C10.3062 14.5492 10.635 14.878 11.2926 15.5355C11.9502 16.1931 12.279 16.5219 12.621 16.7194C13.5492 17.2553 14.6928 17.2553 15.621 16.7194C15.9631 16.5219 16.2919 16.1931 16.9495 15.5355L19.7779 12.7071C20.4355 12.0495 20.7643 11.7207 20.9617 11.3787C21.4976 10.4505 21.4976 9.30689 20.9617 8.37869C20.7643 8.03665 20.4355 7.70785 19.7779 7.05026C19.1203 6.39267 18.7915 6.06388 18.4495 5.8664C17.5212 5.3305 16.3777 5.3305 15.4495 5.8664C15.2598 5.97588 15.0743 6.12571 14.8345 6.34955" stroke="#000000" strokeWidth="2" strokeLinecap="round"/></svg>
              {loadSending ? <div className="loader-roundo"></div> : ""}
              {loadSending ? "" : <svg onClick={() => {infoApp?.appType == 0 ? addMessages(getNextMessages) : addText()}} fill="#000000" viewBox="0 0 24 24" id="send" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg"><path id="primary" d="M21.66,12a2,2,0,0,1-1.14,1.81L5.87,20.75A2.08,2.08,0,0,1,5,21a2,2,0,0,1-1.82-2.82L5.46,13l.45-1-.45-1L3.18,5.87A2,2,0,0,1,5.87,3.25l14.65,6.94A2,2,0,0,1,21.66,12Z"></path><path id="secondary" d="M12,12a1,1,0,0,1-1,1H5.46l.45-1-.45-1H11A1,1,0,0,1,12,12Z"></path></svg>
              }
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputThread
