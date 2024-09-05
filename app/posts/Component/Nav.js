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

    const router = useRouter();

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
    const changeMode = () => {}

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
                {/*LOGO*/}
                <Link href="/">
                    <div className="wrap-logo wrap-home-icon">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="603.000000pt" height="669.000000pt" viewBox="0 0 603.000000 669.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,669.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M1615 5695 c-764 -486 -1391 -889 -1393 -895 -2 -5 1 -10 7 -10 16 0 15 -2857 0 -2862 -16 -5 11 -48 29 -48 8 0 630 -392 1383 -870 1289 -820 1370-870 1393 -858 13 7 643 407 1399 888 893 567 1373 878 1367 884 -14 14 -14
                        2858 0 2872 6 6 -485 324 -1382 894 -766 487 -1397 886 -1402 887 -6 1 -636
                        -396 -1401 -882z m2646 -95 c684 -435 1245 -794 1246 -798 3 -10 -2486 -1588
                        -2500 -1584 -12 4 -2478 1569 -2488 1580 -6 6 2476 1590 2492 1591 4 1 566
                        -355 1250 -789z m-2576 -1725 c666 -422 1220 -776 1233 -788 l22 -20 0 -1344
                        c0 -739 -2 -1343 -5 -1343 -3 0 -178 109 -388 243 -210 134 -389 246 -398 249
                        -13 5 -1319 836 -1671 1064 l-108 69 0 1352 0 1353 53 -34 c28 -18 596 -379
                        1262 -801z m3973 -522 l-3 -1357 -255 -162 c-711 -449 -2278 -1439 -2298
                        -1452 l-22 -14 2 1362 3 1362 1280 808 c704 444 1283 809 1288 809 4 1 6 -610
                        5 -1356z"/>
                        <path d="M2020 4063 c0 -5 221 -149 490 -320 l488 -313 479 306 c263 168 485
                        312 493 320 12 12 -126 14 -968 14 -540 0 -982 -3 -982 -7z"/>
                        <path d="M1060 3322 c0 -5 -34 -222 -75 -482 -41 -260 -75 -478 -75 -484 0 -9
                        278 -196 292 -196 2 0 18 85 33 190 18 116 33 184 38 175 4 -8 51 -133 103
                        -277 53 -145 99 -267 104 -271 4 -5 54 57 110 138 56 80 104 144 106 143 2 -2
                        15 -91 29 -198 14 -107 28 -212 31 -234 6 -36 13 -42 151 -133 80 -52 146 -93
                        148 -91 4 3 -143 1180 -148 1183 -45 33 -219 145 -225 145 -5 0 -51 -63 -102
                        -140 l-94 -140 -16 43 c-9 23 -51 143 -94 267 l-78 225 -109 73 c-105 70 -129
                        81 -129 64z"/>
                        <path d="M2130 2096 l0 -543 137 -89 c75 -49 140 -90 145 -92 4 -2 8 241 8
                        541 l0 545 -139 91 c-77 50 -142 91 -145 91 -4 0 -6 -245 -6 -544z"/>
                        <path d="M4974 3367 l-161 -102 -190 -662 c-110 -381 -186 -663 -179 -662 6 0
                        76 42 156 93 l145 93 21 73 21 74 177 113 c173 110 196 122 196 104 0 -5 7
                        -25 15 -44 l15 -36 155 97 c85 53 155 101 155 105 0 8 -343 815 -359 844 -4 8
                        -60 -22 -167 -90z m85 -641 c-32 -23 -171 -107 -174 -104 -3 3 68 276 81 308
                        3 9 23 -26 51 -93 25 -59 44 -109 42 -111z"/>
                        <path d="M4280 2921 l-135 -88 -30 -240 -30 -241 -103 149 c-57 82 -107 149
                        -111 149 -5 0 -55 -126 -111 -280 -57 -154 -104 -279 -106 -278 -1 2 -14 86
                        -29 188 -15 102 -30 188 -34 192 -11 12 -286 -171 -285 -190 1 -41 138 -968
                        143 -974 6 -7 221 126 232 144 4 6 46 121 94 257 48 135 90 249 94 253 4 5 48
                        -55 99 -133 63 -96 96 -138 104 -133 135 80 219 139 223 157 2 12 34 267 70
                        567 36 300 68 555 71 568 3 14 0 22 -8 21 -7 0 -74 -40 -148 -88z"/>
                        </g>
                        </svg>
                    </div>
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