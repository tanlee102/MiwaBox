'use client'
import React, { useContext, useEffect, useState } from 'react'

import '../css/style/Post/Post.css'

import Modal from '@/app/Components/Dialog/Modal'
import AddPost from '../Component/AddPost'
import dynamic from 'next/dynamic'
import PostContent from '../Component/PostContent'
const MiniProfile = dynamic(() => import('../../../app/Components/Dialog/MiniProfile.js'), { ssr: false })
const EditUserName = dynamic(() => import('../../../app/Components/Dialog/EditUserName.js'), { ssr: false })

import { WindowContext } from '../Context/WindowContext'

const Page = ({ params }) => {

  const { displayModalAddPost, setDisplayModalAddPost } = useContext(WindowContext);
  const [postData, setPostData] = useState(null);
  
  const { index } = params;

  const fetchUrl = `https://html-back.abelonokieepmi.workers.dev?id=${index}`;

  useEffect(() => {
    fetch(fetchUrl)
      .then(response => response.json())
      .then(data => setPostData(data))
      .catch(error => console.error("Error fetching data:", error));
  }, [fetchUrl]);

  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='contain-mypost-content'>

      <div className="mypost-content">
        <PostContent postData={postData} idFile={index} />
      </div>

      <MiniProfile/>
      <EditUserName/>
      <Modal setDisplayModal={setDisplayModalAddPost} displayModal={displayModalAddPost} title={"Add Post"} body={<AddPost/>} displayfooter={false}></Modal>
    
    </div>
  )
}

export default Page