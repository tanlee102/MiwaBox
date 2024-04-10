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

        <div className='welcome-text'>The groundbreaking media platform powered by blockchain technology. We harness the power of blockchain to provide decentralized communication, offering you the advantages of transparency and immutability.</div>
       
        <div className='contain-list-launching-app'>
            <p>Suggested Sites</p>
            <div className='list-launching-app'>
            <Link href={"/enlang"}>
                <span>
                    <img src='/icon/apps/5000_0.png' />
                </span>
            </Link>
      
            </div>
        </div>

    </div>
  )
}

export default Welcome
