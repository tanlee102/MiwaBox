'use client'
import React, { Suspense, useContext, useEffect, useState } from 'react'
import Nav from './Component/Nav';

const MiniProfile = dynamic(() => import('../../app/Components/Dialog/MiniProfile.js'), { ssr: false })
const EditUserName = dynamic(() => import('../../app/Components/Dialog/EditUserName.js'), { ssr: false })

import "./css/Nav/Menu.css";
import "./css/Nav/MenuRes.css";
import dynamic from 'next/dynamic';

const page = () => {

  return (
    <div className='main'>
        <Suspense>
          <Nav/>
        </Suspense>
        <MiniProfile/>
        <EditUserName/>
    </div>
  )
}

export default page