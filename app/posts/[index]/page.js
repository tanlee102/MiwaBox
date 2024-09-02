'use client'
import Modal from '@/app/Components/Dialog/Modal'
import React, { useContext, useEffect, useState } from 'react'
import AddPost from '../Component/AddPost'
import { WindowContext } from '../Context/WindowContext'
import '../css/style/Post/PostContent.css'

const Page = ({ params }) => {

  console.log(params)

  const { displayModalAddPost, setDisplayModalAddPost } = useContext(WindowContext)
  const [postData, setPostData] = useState(null)
  
  // Use the ID from params
  const { index } = params;

  // Construct the fetch URL using params.id
  const fetchUrl = `https://html-back.caculus103.workers.dev?id=${index}`;

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
    <div>
      <Modal 
        setDisplayModal={setDisplayModalAddPost} 
        displayModal={displayModalAddPost} 
        title={"Add Post"} 
        body={<AddPost />} 
        displayfooter={false} 
      />

      {/* Displaying post content */}
      <div className="post-container">
        <h1>{postData.title}</h1>
        <h2>{postData.stitle}</h2>
        <p>By: {postData.displayName} ({postData.email})</p>
        <p>Tags: {postData.tags.join(', ')}</p>

        <div className="media-content">
          {postData.content.map((media, index) => (
            <div key={index} className="media-item">
              {/* Display media (e.g., images) */}
              <img src={`https://drive.google.com/uc?export=view&id=${media.id}`} alt={media.description} />
              <p>{media.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page
