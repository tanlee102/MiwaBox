'use client';

import React, { createContext, useContext } from 'react'
import { WindowContext } from './WindowContext';

import Modal from '@/app/Components/Dialog/Modal';
import AddPost from '../Component/AddPost';

export const PostContext = createContext();

const PostProvider = ({ children }) => {

  const {displayModalAddPost, setDisplayModalAddPost} = useContext(WindowContext);

  return (
    <PostContext.Provider value={{}}>
        {children}
        <Modal setDisplayModal={setDisplayModalAddPost} displayModal={displayModalAddPost} title={"Add Post"} body={<AddPost />} displayfooter={false} />
    </PostContext.Provider>
  )
}

export default PostProvider
