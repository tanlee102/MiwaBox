import { WindowContext } from '@/app/Context/WindowContext'
import Cookies from 'js-cookie';
import Link from 'next/link';
import React, { useContext } from 'react'

const Welcome = () => {

    const {language, setLanguage} = useContext(WindowContext);

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
        Cookies.set('mylang', event.target.value, { expires: 365, path: '/' });
        window.location.href = '/';
      };

  return (
    <div className='contain-welcome'>
        
        <select value={language} onChange={handleLanguageChange}>
            <option value="vi">Vietnamese</option>
            <option value="en">English</option>
        </select>

        <div className='contain-typewriter'>
            <div className="typewriter">
                <div>Welcome to Miwa Box.</div>
            </div>
        </div>

        <div className='welcome-text'>A media platform that blends blockchain technology with reliable storage for public videos, images, and posts. We provide decentralized communication with the added benefits of transparency and secure access.</div>
       
        <div className='contain-list-launching-app'>
            <p>Suggested Sites</p>
            <div className='list-launching-app non-select'>
            <Link href={"/?id=888"}>
                <span>
                    <img src='/icon/apps/playbutton.png' />
                </span>
            </Link>
            <Link href={"/enlang"}>
                <span>
                    <img src='/icon/apps/5000_0.png' />
                </span>
            </Link>
            <Link href={"/posts"}>
                <span>
                    <img src='/icon/apps/post.png' />
                </span>
            </Link>
            <a target="_blank" href="https://cuongonepiece.netlify.app/?episode=1">
                <span>
                    <img src='/icon/apps/oplogo.png' />
                </span>
            </a>
      
            </div>
        </div>

    </div>
  )
}

export default Welcome