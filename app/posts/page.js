'use client'
import React, { Suspense, useContext, useEffect, useState } from 'react'
import Nav from './Component/Nav';

const MiniProfile = dynamic(() => import('../../app/Components/Dialog/MiniProfile.js'), { ssr: false })
const EditUserName = dynamic(() => import('../../app/Components/Dialog/EditUserName.js'), { ssr: false })

import "./css/Nav/Menu.css";
import "./css/Nav/MenuRes.css";
import dynamic from 'next/dynamic';
import Modal from '../Components/Dialog/Modal';
import AddPost from './Component/AddPost';

const page = () => {

  const [displayModalAddPost, setDisplayModalAddPost] = useState(true)

  return (
    <div className='main'>
        <Suspense>
          <Nav/>
        </Suspense>
        <MiniProfile/>
        <EditUserName/>
        <Modal setDisplayModal={setDisplayModalAddPost} displayModal={displayModalAddPost} title={"Add Video"} body={<AddPost/>} displayfooter={false}></Modal>
    </div>
  )
}

export default page