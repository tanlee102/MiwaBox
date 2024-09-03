'use client'
import React, { Suspense, useContext, useEffect, useState } from 'react'

const MiniProfile = dynamic(() => import('../../app/Components/Dialog/MiniProfile.js'), { ssr: false })
const EditUserName = dynamic(() => import('../../app/Components/Dialog/EditUserName.js'), { ssr: false })

import dynamic from 'next/dynamic';
import Modal from '../Components/Dialog/Modal';
import AddPost from './Component/AddPost';
import { WindowContext } from './Context/WindowContext';

const page = () => {

  const {displayModalAddPost, setDisplayModalAddPost} = useContext(WindowContext)

  return (
    <div className='main'>

      <div className='list-posts'> 

          <div className="item-post">
                <div className="aspect-ratio-container">
                    <img src="https://i.imgflip.com/707bul.png" className="post-image" alt="Post Image"/>
                </div>
              <div className="post-details">
                  <div className="post-footer">
                      <ul className="post-footer-list">
                          <li className="post-username">Tan Le</li>
                          <li className="post-date">23/12/2022</li>
                      </ul>
                  </div>
                  <h2 className="post-title">Thông báo về Death Click (Chrome Extension)</h2>
                  <p className="post-description">
                      Hình thành Thời gian đầu khi mình mới tạo nhóm J2TEAM Community, Facebook...
                  </p>
              </div>
          </div>

          <div className="item-post">
              <div className="aspect-ratio-container">
            <img src="https://i.imgflip.com/707bul.png" className="post-image" alt="Post Image"/>
        </div>
              <div className="post-details">
                  <div className="post-footer">
                      <ul className="post-footer-list">
                          <li className="post-username">Tan Le</li>
                          <li className="post-date">23/12/2022</li>
                      </ul>
                  </div>
                  <h2 className="post-title">Thông báo về Death Click (Chrome Extension)</h2>
                  <p className="post-description">
                      Hình thành Thời gian đầu khi mình mới tạo nhóm J2TEAM Community, Facebook...
                  </p>
              </div>
          </div>


          <div className="item-post">
              <div className="aspect-ratio-container">
            <img src="https://i.imgflip.com/707bul.png" className="post-image" alt="Post Image"/>
        </div>
              <div className="post-details">
                  <div className="post-footer">
                      <ul className="post-footer-list">
                          <li className="post-username">Tan Le</li>
                          <li className="post-date">23/12/2022</li>
                      </ul>
                  </div>
                  <h2 className="post-title">Thông báo về Death Click (Chrome Extension)</h2>
                  <p className="post-description">
                      Hình thành Thời gian đầu khi mình mới tạo nhóm J2TEAM Community, Facebook...
                  </p>
              </div>
          </div>


          <div className="item-post">
              <div className="aspect-ratio-container">
            <img src="https://i.imgflip.com/707bul.png" className="post-image" alt="Post Image"/>
        </div>
              <div className="post-details">
                  <div className="post-footer">
                      <ul className="post-footer-list">
                          <li className="post-username">Tan Le</li>
                          <li className="post-date">23/12/2022</li>
                      </ul>
                  </div>
                  <h2 className="post-title">Thông báo về Death Click (Chrome Extension)</h2>
                  <p className="post-description">
                      Hình thành Thời gian đầu khi mình mới tạo nhóm J2TEAM Community, Facebook...
                  </p>
              </div>
          </div>

          <div className="item-post">
              <div className="aspect-ratio-container">
            <img src="https://i.imgflip.com/707bul.png" className="post-image" alt="Post Image"/>
        </div>
              <div className="post-details">
                  <div className="post-footer">
                      <ul className="post-footer-list">
                          <li className="post-username">Tan Le</li>
                          <li className="post-date">23/12/2022</li>
                      </ul>
                  </div>
                  <h2 className="post-title">Thông báo về Death Click (Chrome Extension)</h2>
                  <p className="post-description">
                      Hình thành Thời gian đầu khi mình mới tạo nhóm J2TEAM Community, Facebook...
                  </p>
              </div>
          </div>

          <div className="item-post">
              <div className="aspect-ratio-container">
            <img src="https://i.imgflip.com/707bul.png" className="post-image" alt="Post Image"/>
        </div>
              <div className="post-details">
                  <div className="post-footer">
                      <ul className="post-footer-list">
                          <li className="post-username">Tan Le</li>
                          <li className="post-date">23/12/2022</li>
                      </ul>
                  </div>
                  <h2 className="post-title">Thông báo về Death Click (Chrome Extension)</h2>
                  <p className="post-description">
                      Hình thành Thời gian đầu khi mình mới tạo nhóm J2TEAM Community, Facebook...
                  </p>
              </div>
          </div>



      </div>

        <MiniProfile/>
        <EditUserName/>
        <Modal setDisplayModal={setDisplayModalAddPost} displayModal={displayModalAddPost} title={"Add Post"} body={<AddPost/>} displayfooter={false}></Modal>
    </div>
  )
}

export default page