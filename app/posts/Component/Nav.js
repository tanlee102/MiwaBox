'use client'

import React, { useState, useEffect, useLayoutEffect, useContext } from 'react'
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter, useSearchParams } from 'next/navigation'

import { checkHasClass } from '../../helper/checkHasClass';
import { RootLayoutContext } from '@/app/Context/RootLayoutContext';
import { WindowContext } from '../Context/WindowContext';

const checkType = _width => 
    _width <= 480 ? 1 :
    _width <= 768 ? 2 :
    _width <= 1024 ? 3 :
    _width <= 1440 ? 4 :
    5;

function useWindowDimensions() {
    const [width, setWidth] = useState();
    const updateWidth = () => {
        setWidth(window?.innerWidth);
    };
    useEffect(() => {
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);
    return { width };
}


const Nav = ({}) => {

    const router = useRouter()

    const {darkMode, setDarkMode} = {};
    const {setDisplayModalAddPost} = useContext(WindowContext)

    const {myUser, logged, setDisplayMiniProfile, login} = useContext(RootLayoutContext);

    const { width } = useWindowDimensions();
    const [typeWindow, setTypeWindow] = useState(() => checkType(width));
    useLayoutEffect(() => {
        if(typeWindow > 2){
            setShowListItems(false)
        }else{
            setShowSearchItem(false)
        }
    }, []);
    useEffect(() => {
        const newType = checkType(width);
        if (typeWindow !== newType) {
            setTypeWindow(newType);
            if(newType > 2){
                setShowListItems(false)
                setShowSearchItem(true)
            }else{
                setShowSearchItem(false)
            }
        }
    }, [width, typeWindow]);



    const [showListItems, setShowListItems] = useState(false);
    const [showSearchItem, setShowSearchItem] = useState(true);
    const [isFocus,setIsFocus] = useState(false);
    const [searchBorder, setSearchBorder] = useState("");


    var MenuClick = function(event) {
        var x = event.target;
        if(checkHasClass(x, 'mark-item')){
            setMenuProfile(false);  
        }else if(checkHasClass(x, 'mark-search')){
            setMenuProfile(false);  
        }else if(checkHasClass(x, 'search-button')){
            //No ACT
        }else if(checkHasClass(x, 'wrap-item-mb')){
            //No ACT
        }else if(checkHasClass(x, 'wrap-search')){
            //No ACT
        }else if(checkHasClass(x, 'wrap-profile')){
            //No ACT
        }else{
            if(typeWindow <= 2){
                setShowSearchItem(false)
            }
            setShowListItems(false)
            setMenuProfile(false);  
        }
    };


    const focus_searchBorder_Fu = () => {
        setSearchBorder("1pt solid cornflowerblue");
    }
    const out_searchBorder_Fu = () => {
        if(darkMode) setSearchBorder("1pt solid black");
        else setSearchBorder("1pt solid whitesmoke");
    }
    useEffect(() => {
        if(darkMode) setSearchBorder("1pt solid black");
        else setSearchBorder("1pt solid whitesmoke");
    }, [darkMode])




    const [menuProfile, setMenuProfile] = useState(false);
    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            getSearch();
        }
    }
    const getSearch = () => {
        if(String(document.getElementById('search-bar').value).length > 0){
            router.push('/'+'?title='+searchValue)
        }
    }
    const changeMode = () => {
        Cookies.set('dark_mode', !darkMode, {path: '/', expires: 365});
        setDarkMode(!darkMode);
    }

    const searchParams = useSearchParams();
    const title = searchParams.get('title');
    const [searchValue, setSearchValue] = useState(title || "");

    useEffect(()=>{
        if(!title)
        setSearchValue("")
    },[title])


return (
    <div className="wrap-bar" style={{position: 'fixed'}} onClick={(e) => {MenuClick(e);}}>
        <div className="nav-bar" >

            <div className="fr-nav-bar">

                {/*LOGO*/}
                <Link href="/posts">
                    <div className="wrap-logo"><svg viewBox="0 0 184.48 160.05"><rect className="cls-1" x="76.24" y="-7.48" width="82.8" height="175.02" rx="41.4" transform="translate(-24.63 78.17) rotate(-33.48)"/><rect className="cls-2" x="25.19" y="-7.48" width="82.8" height="175.02" rx="41.4" transform="matrix(0.84, 0.55, -0.55, 0.84, 54.53, -23.38)"/></svg></div>
                </Link>

                {/*ITEM DESKTOP*/}
                <div className="wrap-item">
                    <div className='text-nav-item icon-nav-item add-icon-nav-item' onClick={() => {setDisplayModalAddPost(true)}}>
                        <svg viewBox="0 0 24 24" fill="none"><path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/><path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/></svg>                    
                        New post
                    </div>

                    <div onClick={() => {changeMode()}} className='icon-nav-item light-bulb-icon-nav-item'>
                        <svg viewBox="0 0 512 512"><path d="m256,105.5c-83.9,0-152.2,68.3-152.2,152.2 0,83.9 68.3,152.2 152.2,152.2 83.9,0 152.2-68.3 152.2-152.2 0-84-68.3-152.2-152.2-152.2zm0,263.5c-61.4,0-111.4-50-111.4-111.4 0-61.4 50-111.4 111.4-111.4 61.4,0 111.4,50 111.4,111.4 0,61.4-50,111.4-111.4,111.4z"/><path d="m256,74.8c11.3,0 20.4-9.1 20.4-20.4v-23c0-11.3-9.1-20.4-20.4-20.4-11.3,0-20.4,9.1-20.4,20.4v23c2.84217e-14,11.3 9.1,20.4 20.4,20.4z"/><path d="m256,437.2c-11.3,0-20.4,9.1-20.4,20.4v22.9c0,11.3 9.1,20.4 20.4,20.4 11.3,0 20.4-9.1 20.4-20.4v-22.9c0-11.2-9.1-20.4-20.4-20.4z"/><path d="m480.6,235.6h-23c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h23c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4z"/><path d="m54.4,235.6h-23c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h22.9c11.3,0 20.4-9.1 20.4-20.4 0.1-11.3-9.1-20.4-20.3-20.4z"/><path d="M400.4,82.8L384.1,99c-8,8-8,20.9,0,28.9s20.9,8,28.9,0l16.2-16.2c8-8,8-20.9,0-28.9S408.3,74.8,400.4,82.8z"/><path d="m99,384.1l-16.2,16.2c-8,8-8,20.9 0,28.9 8,8 20.9,8 28.9,0l16.2-16.2c8-8 8-20.9 0-28.9s-20.9-7.9-28.9,0z"/><path d="m413,384.1c-8-8-20.9-8-28.9,0-8,8-8,20.9 0,28.9l16.2,16.2c8,8 20.9,8 28.9,0 8-8 8-20.9 0-28.9l-16.2-16.2z"/><path d="m99,127.9c8,8 20.9,8 28.9,0 8-8 8-20.9 0-28.9l-16.2-16.2c-8-8-20.9-8-28.9,0-8,8-8,20.9 0,28.9l16.2,16.2z"/></svg>
                    </div>

                </div>

                {/*BUTT0N DISPLAY ITEM*/}
                <div className="mark-item" >
                    <div id="mark-item" onClick={() => {{!showListItems ? setShowSearchItem(false) : null }; setShowListItems(!showListItems)}}>
                        {
                            !showListItems ? 
                                <svg height="100%" viewBox="0 0 512 512" width="100%" ><path d="m464.883 64.267h-417.766c-25.98 0-47.117 21.136-47.117 47.149 0 25.98 21.137 47.117 47.117 47.117h417.766c25.98 0 47.117-21.137 47.117-47.117 0-26.013-21.137-47.149-47.117-47.149z"/><path d="m464.883 208.867h-417.766c-25.98 0-47.117 21.136-47.117 47.149 0 25.98 21.137 47.117 47.117 47.117h417.766c25.98 0 47.117-21.137 47.117-47.117 0-26.013-21.137-47.149-47.117-47.149z"/><path d="m464.883 353.467h-417.766c-25.98 0-47.117 21.137-47.117 47.149 0 25.98 21.137 47.117 47.117 47.117h417.766c25.98 0 47.117-21.137 47.117-47.117 0-26.012-21.137-47.149-47.117-47.149z"/></svg>
                            :
                                <svg height="100%" viewBox="-41 -41 448 448" width="100%" ><path d="m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624 0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906 113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907 32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812 113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0"/></svg>
                        }
                    </div>
                </div>


                {logged && (
                <div className="mark-search">
                    <div id="mark-search" onClick={() => {{!showSearchItem ? setShowListItems(false) : null }; setShowSearchItem(!showSearchItem);}}>
                        {
                            !showSearchItem ?
                            <svg id="mark-show-search" x="0px" y="0px" width="100%" height="100%" viewBox="-5 -5 135 135" stroke="#000000" ><path  d="M51,102.05c10.5,0,20.2-3.2,28.3-8.6l29.3,29.3c2.301,2.3,6.101,2.3,8.5,0l5.7-5.7c2.3-2.3,2.3-6.1,0-8.5L93.4,79.35 c5.399-8.1,8.6-17.8,8.6-28.3c0-28.1-22.9-51-51-51c-28.1,0-51,22.9-51,51C0,79.149,22.8,102.05,51,102.05z M51,20.05 c17.1,0,31,13.9,31,31c0,17.1-13.9,31-31,31c-17.1,0-31-13.9-31-31C20,33.95,33.9,20.05,51,20.05z"></path> </svg>
                            :
                            <svg id="mark-close-search" height="100%" viewBox="-41 -41 448 448" width="100%" ><path d="m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624 0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906 113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907 32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812 113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0"/></svg>
                        }
                    </div>
                </div>
                )}

                
                
                {/* PROFILE ITEM */}
                {logged ?
                <div onClick={() => {(myUser) ? setDisplayMiniProfile(true) : login();}} className="wrap-profile">
                    <div className='ava-profile' onClick={() => {setMenuProfile(!menuProfile)}}>
                        <img src={myUser?.photoURL}/>
                    </div>
                </div>
                :
                <div onClick={() => {login();}} className='wrap-login-btn' >
                    <button type="button" className="login-with-google-btn" >
                        Sign in
                    </button>
                </div>
                }
            

                {/*ITEM MOBILE*/}
                {showListItems ?
                <div className="wrap-item-mb" >
                    <div className='text-nav-item icon-nav-item add-icon-nav-item' onClick={() => {setDisplayModalAddPost(true)}}>
                        <svg viewBox="0 0 24 24" fill="none"><path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/><path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/></svg>                    
                        New post
                    </div>

                    <div onClick={() => {changeMode()}} className='icon-nav-item light-bulb-icon-nav-item'>
                        <svg viewBox="0 0 512 512"><path d="m256,105.5c-83.9,0-152.2,68.3-152.2,152.2 0,83.9 68.3,152.2 152.2,152.2 83.9,0 152.2-68.3 152.2-152.2 0-84-68.3-152.2-152.2-152.2zm0,263.5c-61.4,0-111.4-50-111.4-111.4 0-61.4 50-111.4 111.4-111.4 61.4,0 111.4,50 111.4,111.4 0,61.4-50,111.4-111.4,111.4z"/><path d="m256,74.8c11.3,0 20.4-9.1 20.4-20.4v-23c0-11.3-9.1-20.4-20.4-20.4-11.3,0-20.4,9.1-20.4,20.4v23c2.84217e-14,11.3 9.1,20.4 20.4,20.4z"/><path d="m256,437.2c-11.3,0-20.4,9.1-20.4,20.4v22.9c0,11.3 9.1,20.4 20.4,20.4 11.3,0 20.4-9.1 20.4-20.4v-22.9c0-11.2-9.1-20.4-20.4-20.4z"/><path d="m480.6,235.6h-23c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h23c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4z"/><path d="m54.4,235.6h-23c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h22.9c11.3,0 20.4-9.1 20.4-20.4 0.1-11.3-9.1-20.4-20.3-20.4z"/><path d="M400.4,82.8L384.1,99c-8,8-8,20.9,0,28.9s20.9,8,28.9,0l16.2-16.2c8-8,8-20.9,0-28.9S408.3,74.8,400.4,82.8z"/><path d="m99,384.1l-16.2,16.2c-8,8-8,20.9 0,28.9 8,8 20.9,8 28.9,0l16.2-16.2c8-8 8-20.9 0-28.9s-20.9-7.9-28.9,0z"/><path d="m413,384.1c-8-8-20.9-8-28.9,0-8,8-8,20.9 0,28.9l16.2,16.2c8,8 20.9,8 28.9,0 8-8 8-20.9 0-28.9l-16.2-16.2z"/><path d="m99,127.9c8,8 20.9,8 28.9,0 8-8 8-20.9 0-28.9l-16.2-16.2c-8-8-20.9-8-28.9,0-8,8-8,20.9 0,28.9l16.2,16.2z"/></svg>
                    </div>
                </div>
                : ""}


                {/*SEARCH BAR*/}
                {logged &&
                <div className="wrap-search"  style={{display: showSearchItem ? "block" : "none"}}   >
                    <div className="search-wall" onFocus={() => {focus_searchBorder_Fu()}} onBlur={() => {out_searchBorder_Fu()}} style={{border: searchBorder}}>
                        <div onClick={() => getSearch()} className="search-button" ><svg x="0px" y="0px" width="100%" height="100%" viewBox="-5 -5 135 135"  stroke="#000000" ><path d="M51,102.05c10.5,0,20.2-3.2,28.3-8.6l29.3,29.3c2.301,2.3,6.101,2.3,8.5,0l5.7-5.7c2.3-2.3,2.3-6.1,0-8.5L93.4,79.35 c5.399-8.1,8.6-17.8,8.6-28.3c0-28.1-22.9-51-51-51c-28.1,0-51,22.9-51,51C0,79.149,22.8,102.05,51,102.05z M51,20.05 c17.1,0,31,13.9,31,31c0,17.1-13.9,31-31,31c-17.1,0-31-13.9-31-31C20,33.95,33.9,20.05,51,20.05z"></path> </svg></div>      
                        <div className="search-bar">
                            <input value={searchValue}  onChange={(e) => {setSearchValue(e.target.value)}} onBlur={() => setIsFocus(false)} onFocus={() => setIsFocus(true)} id="search-bar" onKeyDown={(e) => {_handleKeyDown(e)}} type="text" placeholder="Search" spellCheck="false" enterKeyHint="done" autoComplete='off' maxLength='35'/>
                        </div> 
                    </div>
                </div>
                }


            </div>

        </div>

    </div>
    )
}

export default Nav