'use client'
import Modal from '@/app/Components/Dialog/Modal'
import React, { useContext, useEffect, useState } from 'react'
import AddPost from '../Component/AddPost'
import { WindowContext } from '../Context/WindowContext'
import '../css/style/Post/Post.css'
import dynamic from 'next/dynamic'
import PostContent from '../Component/PostContent'

const MiniProfile = dynamic(() => import('../../../app/Components/Dialog/MiniProfile.js'), { ssr: false })
const EditUserName = dynamic(() => import('../../../app/Components/Dialog/EditUserName.js'), { ssr: false })

const Page = ({ params }) => {

  const { displayModalAddPost, setDisplayModalAddPost } = useContext(WindowContext);
  const [postData, setPostData] = useState(null);
  
  // Use the ID from params
  const { index } = params;

  // Construct the fetch URL using params.id
  const fetchUrl = `https://html-back.abelonokieepmi.workers.dev?id=${index}`;

  useEffect(() => {
    // Fetching data from the constructed URL
    fetch(fetchUrl)
      .then(response => response.json())
      .then(data => setPostData(data))
      .catch(error => console.error("Error fetching data:", error));
  }, [fetchUrl]);

  // If data is not yet loaded, show a loading message
  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='contain-mypost-content'>

      {/* Displaying post content */}
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