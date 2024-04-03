import React, { useContext, useEffect, useState }  from 'react'
import { hideMainScrollBar } from '@/app/helper/hideMainScrollBar';
import { WindowContext } from '@/app/Context/WindowContext';
import { env_LANG } from '@/app/env_lang';

const InputDialog = ({displayBox, setDisplayBox, addUrl}) => {

  const {language} = useContext(WindowContext);

  useEffect(() => {
    hideMainScrollBar(displayBox);
  }, [displayBox]);

  const [choseType, setChoseType] = useState(0);
  const [url, setUrl] = useState('');

  const handleChange = (event) => {
    setChoseType(Number(event.target.value));
  }
  const handleInputChange = (event) => {
    setUrl(event.target.value);
  };

  return (
    <div  className={displayBox ? "dialog-confirm dialog-form active-confirm" : "dialog-confirm dialog-form"}>
      <div>
        <div>
            <header> 
              <h3>{env_LANG[language].add_url[0]}</h3> 
              <i className="fa fa-close" aria-hidden="true" onClick={() => setDisplayBox(false)}></i>
            </header>

            <div className="dialog-msg dialog-nokit"> 
                <select onChange={(e) => {handleChange(e)}} >
                    <option value="0">{env_LANG[language].type_media[0]}</option>
                    <option value="1">{env_LANG[language].type_media[1]}</option>
                </select>

                 <input
                    id="text-nokit-dialog"
                    contentEditable="true"
                    placeholder={env_LANG[language].add_url[1]}
                    value={url}
                    onChange={handleInputChange}
                    />
            
            </div>

            <footer>
                <div className="controls"> 
                    <button className="button button-danger doAction button-action-box-nokit" onClick={() => {addUrl(choseType, url, () => {
                        setUrl("")
                        setDisplayBox(false)
                    })}}>Thêm</button>  
                    <button className="button button-default cancelAction" onClick={() => setDisplayBox(false)}>Hủy</button>
                </div>
            </footer>

        </div>
      </div>
    </div>
  )
}

export default InputDialog