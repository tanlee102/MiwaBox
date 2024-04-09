import React, { useContext } from 'react'
import Dropdown from './DropDown/DropDown'
import { AppsConext } from '../Context/AppsContext'
import { env_SMARTCHAIN } from '../env';
import { getStringSizeInBytes } from '../helper/getStringSizeInBytes';
import { WindowContext } from '../Context/WindowContext';
import { AccountContext } from '../Context/AccountContext';
import { env_LANG } from '../env_lang';

const Create = () => {

    const {idNetwork, setIdNetwork, choseCategory, setChoseCategory, chosePrivacy, setChosePrivacy, title, setTitle, 
           loadCreateState, infoSM} = useContext(AppsConext);

    const {language} = useContext(WindowContext)
    const {user} = useContext(AccountContext)

  return (
    <div className='contain-create-app'>
        {loadCreateState == 0 ?
        <>
            <div className='row-create-app'>
                <div>{env_LANG[language].add_sm[1]}</div>
                <Dropdown setIndexOption={setIdNetwork} options={env_SMARTCHAIN.NETWORKS.map(network => network.chainName)}/>
            </div>

            <div className='row-create-app'>
                <div>{env_LANG[language].add_sm[2]}</div>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => {getStringSizeInBytes(String(e.target.value)) > 31 ? alert(env_LANG[language].alert_msg[6]) : setTitle(e.target.value);}}
                    placeholder="Aa"
                />
            </div>

            <div className='row-create-app'>
                <div>{env_LANG[language].add_sm[3]}</div>
                <div>
                    <span onClick={() => {setChoseCategory(0)}} className={choseCategory == 0 ? 'selected-create-app' : ''}>
                        <svg className='strokecolor' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 12H8.009M11.991 12H12M15.991 12H16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" strokeWidth="1.5"/></svg>
                        <p>{env_LANG[language].add_sm[4]}</p>
                    </span>

                    <span onClick={() => {setChoseCategory(1)}} className={choseCategory == 1 ? 'selected-create-app' : ''}>
                        <svg className='strokecolor' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" strokeWidth="1.5"/><path d="M7 18L7 15" strokeWidth="1.5" strokeLinecap="round"/><path d="M12 18V12" strokeWidth="1.5" strokeLinecap="round"/><path d="M17 18V9" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        <p>{env_LANG[language].add_sm[5]}</p>
                    </span>

                    {user && user.admin ? 
                        <span onClick={() => {setChoseCategory(2)}} className={choseCategory == 2 ? 'selected-create-app' : ''}>
                            <svg style={{fill: 'none'}} viewBox="0 0 24 24"><path d="M19.5617 7C19.7904 5.69523 18.7863 4.5 17.4617 4.5H6.53788C5.21323 4.5 4.20922 5.69523 4.43784 7" stroke="#1C274C" strokeWidth="1.5"/><path d="M17.4999 4.5C17.5283 4.24092 17.5425 4.11135 17.5427 4.00435C17.545 2.98072 16.7739 2.12064 15.7561 2.01142C15.6497 2 15.5194 2 15.2588 2H8.74099C8.48035 2 8.35002 2 8.24362 2.01142C7.22584 2.12064 6.45481 2.98072 6.45704 4.00434C6.45727 4.11135 6.47146 4.2409 6.49983 4.5" stroke="#1C274C" strokeWidth="1.5"/><path d="M14.5812 13.6159C15.1396 13.9621 15.1396 14.8582 14.5812 15.2044L11.2096 17.2945C10.6669 17.6309 10 17.1931 10 16.5003L10 12.32C10 11.6273 10.6669 11.1894 11.2096 11.5258L14.5812 13.6159Z" stroke="#1C274C" strokeWidth="1.5"/><path d="M2.38351 13.793C1.93748 10.6294 1.71447 9.04765 2.66232 8.02383C3.61017 7 5.29758 7 8.67239 7H15.3276C18.7024 7 20.3898 7 21.3377 8.02383C22.2855 9.04765 22.0625 10.6294 21.6165 13.793L21.1935 16.793C20.8437 19.2739 20.6689 20.5143 19.7717 21.2572C18.8745 22 17.5512 22 14.9046 22H9.09536C6.44881 22 5.12553 22 4.22834 21.2572C3.33115 20.5143 3.15626 19.2739 2.80648 16.793L2.38351 13.793Z" stroke="#1C274C" strokeWidth="1.5"/></svg>
                            <p>Video</p>
                        </span>
                    :""}
                </div>
            </div>

            <div className='row-create-app'>
                <div>{env_LANG[language].add_sm[6]}</div>
                <div>
                    <span onClick={() => {setChosePrivacy(true)}} className={chosePrivacy == true ? 'selected-create-app' : ''}>
                        <svg className='strokecolor' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7.99998 3H8.99998C7.04998 8.84 7.04998 15.16 8.99998 21H7.99998"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 3C16.95 8.84 16.95 15.16 15 21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 16V15C8.84 16.95 15.16 16.95 21 15V16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 9.0001C8.84 7.0501 15.16 7.0501 21 9.0001" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <p>{env_LANG[language].dropdown_type[1]}</p>
                    </span>

                    <span onClick={() => {setChosePrivacy(false)}} className={chosePrivacy == false ? 'selected-create-app' : ''}>
                        <svg className='fillcolor' viewBox="0 0 14 14"><path d="m 10.747763,8.225634 0.560172,-1.46723 c 0.09375,-0.2461 -0.08672,-0.50861 -0.351572,-0.50861 l -1.3711332,0 c 0.2578199,-0.44298 0.4171992,-0.95159 0.4171992,-1.50004 l 0,-0.007 c 0.918776,-0.18281 1.500043,-0.44767 1.500043,-0.74299 0,-0.31172 -0.639862,-0.58829 -1.6430156,-0.77346 C 9.6438252,2.457534 9.2266259,1.684074 8.9078668,1.285624 8.6852042,1.006714 8.3008183,0.91999396 7.9820592,1.079374 l -0.6468934,0.32344 c -0.2109435,0.10548 -0.4593881,0.10548 -0.6703316,0 L 6.0179408,1.079374 c -0.3187591,-0.15938004 -0.7031451,-0.0727 -0.9258076,0.20625 -0.3164153,0.39845 -0.7359585,1.17191 -0.9515896,1.94068 -1.0008098,0.18517 -1.6406717,0.46174 -1.6406717,0.77346 0,0.29532 0.5812665,0.56018 1.5000427,0.74299 l 0,0.007 c 0,0.54845 0.1593795,1.05706 0.4171993,1.50004 l -1.3476946,0 c -0.2695389,0 -0.4500128,0.27422 -0.344541,0.52267 l 0.6047047,1.41098 c -0.9398705,0.54611 -1.5797325,1.5516 -1.5797325,2.71648 l 0,1.05003 c 0,0.57892 0.4711072,1.05003 1.0500299,1.05003 l 8.4002396,0 c 0.578922,0 1.050029,-0.47111 1.050029,-1.05003 l 0,-1.05003 c 0,-1.13441 -0.604704,-2.11881 -1.502386,-2.67429 z m -4.8727951,4.02433 -0.9750277,-4.50013 1.1625331,0.75002 0.562516,0.93753 -0.7500214,2.81258 z m 2.2500641,0 -0.7500213,-2.81258 0.562516,-0.93753 1.1625331,-0.75002 -0.9750278,4.50013 z m 0.9773716,-6.99629 c -0.091409,0.27891 -0.1640672,0.57657 -0.3867298,0.78283 -0.2367255,0.21798 -1.125032,0.52502 -1.5000427,-0.58595 -0.065627,-0.19688 -0.3609478,-0.19688 -0.4289184,0 -0.3984489,1.17659 -1.3125374,0.75939 -1.5000428,0.58595 -0.2226625,-0.20626 -0.2976647,-0.50392 -0.3867297,-0.78283 -0.01875,-0.0586 -0.1476605,-0.1336 -0.1476605,-0.13595 l 0,-0.25313 c 0.6633002,0.0844 1.4297282,0.13594 2.2500641,0.13594 0.8203358,0 1.5867639,-0.0492 2.2500641,-0.13594 l 0,0.25313 c -0.00234,0.002 -0.1312538,0.075 -0.1500043,0.13595 z"/></svg>
                        <p>{env_LANG[language].dropdown_type[0]}</p>
                    </span>
                </div>
            </div>
        </>
        : 
        <>
            { loadCreateState < 8 ?
            <>
                <div className='contain-load-create-sm'>
                    <div className='load-create-sm'>
                        <div className="loader-create">
                            <div className="cuboid">
                                <div className="side"></div>
                                <div className="side"></div>
                                <div className="side"></div>
                                <div className="side"></div>
                                <div className="side"></div>
                                <div className="side"></div>
                            </div>
                            <div className="cuboid">
                                <div className="side"></div>
                                <div className="side"></div>
                                <div className="side"></div>
                                <div className="side"></div>
                                <div className="side"></div>
                                <div className="side"></div>
                            </div>
                            <div className="cuboid">
                                <div className="side"></div>
                                <div className="side"></div>
                                <div className="side"></div>
                                <div className="side"></div>
                                <div className="side"></div>
                                <div className="side"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='loading-list-create-sm'>
                    {loadCreateState >= 1 ? <p>{env_LANG[language].add_sm[8]} {env_SMARTCHAIN.NETWORKS[idNetwork]?.chainName}...</p> : "" }
                    {loadCreateState >= 2 ? <p>{env_LANG[language].add_sm[9]}...</p> : "" }
                    {loadCreateState >= 3 ? <p>{env_LANG[language].add_sm[10]}!!</p> : "" }
                    {loadCreateState >= 4 ? <p>{env_LANG[language].add_sm[11]} {env_SMARTCHAIN.NETWORK.chainName}...</p> : "" }
                    {loadCreateState >= 5 ? <p>{env_LANG[language].add_sm[12]}...</p> : "" }
                    {loadCreateState >= 6 ? <p>{env_LANG[language].add_sm[13]}!!</p> : "" }
                    {loadCreateState >= 7 ? <p>{env_LANG[language].add_sm[14]}...</p> : "" }
                </div>
            </>
            : 
            <>
                {loadCreateState == 8 ?
                    <div className='info-sm-created'>
                        <p>Index: {infoSM?.id}</p>
                        <p>{env_LANG[language].add_sm[15]}: {infoSM?.title}</p>
                        <p>{env_LANG[language].add_sm[16]}: {infoSM?.appAddress}</p>
                        <p>{env_LANG[language].add_sm[17]}: {infoSM?.creatorAddress}</p>
                        <p>{env_LANG[language].add_sm[18]}: {infoSM?.privacy ? env_LANG[language].dropdown_type[1] : env_LANG[language].dropdown_type[0]}</p>
                        <p>{env_LANG[language].add_sm[19]}: {infoSM?.appType == 0 ? env_LANG[language].add_sm[4] : env_LANG[language].add_sm[5]}</p>
                        <p>{env_LANG[language].add_sm[20]}: {env_SMARTCHAIN.NETWORKS[Number(infoSM?.idNetwork)]?.chainName}</p>
                        <span onClick={() => {
                            window.location.href = '/?id='+infoSM?.id;
                        }}>{env_LANG[language].add_sm[21]}</span>
                    </div>
                :
                    <div className='info-sm-created'>
                        {env_LANG[language].add_sm[22]}!!
                    </div>   
                }
            </>
            }
        </>
        }
    </div>
  )
}

export default Create