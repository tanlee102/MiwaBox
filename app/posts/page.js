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

          <div class="item-post">
                <div class="aspect-ratio-container">
                    <img src="https://i.imgflip.com/707bul.png" class="post-image" alt="Post Image"/>
                </div>
              <div class="post-details">
                  <div class="post-footer">
                      <ul class="post-footer-list">
                          <li class="post-username">Tan Le</li>
                          <li class="post-date">23/12/2022</li>
                      </ul>
                  </div>
                  <h2 class="post-title">Thông báo về Death Click (Chrome Extension)</h2>
                  <p class="post-description">
                      Hình thành Thời gian đầu khi mình mới tạo nhóm J2TEAM Community, Facebook...
                  </p>
              </div>
          </div>

          <div class="item-post">
              <div class="aspect-ratio-container">
            <img src="https://i.imgflip.com/707bul.png" class="post-image" alt="Post Image"/>
        </div>
              <div class="post-details">
                  <div class="post-footer">
                      <ul class="post-footer-list">
                          <li class="post-username">Tan Le</li>
                          <li class="post-date">23/12/2022</li>
                      </ul>
                  </div>
                  <h2 class="post-title">Thông báo về Death Click (Chrome Extension)</h2>
                  <p class="post-description">
                      Hình thành Thời gian đầu khi mình mới tạo nhóm J2TEAM Community, Facebook...
                  </p>
              </div>
          </div>


          <div class="item-post">
              <div class="aspect-ratio-container">
            <img src="https://i.imgflip.com/707bul.png" class="post-image" alt="Post Image"/>
        </div>
              <div class="post-details">
                  <div class="post-footer">
                      <ul class="post-footer-list">
                          <li class="post-username">Tan Le</li>
                          <li class="post-date">23/12/2022</li>
                      </ul>
                  </div>
                  <h2 class="post-title">Thông báo về Death Click (Chrome Extension)</h2>
                  <p class="post-description">
                      Hình thành Thời gian đầu khi mình mới tạo nhóm J2TEAM Community, Facebook...
                  </p>
              </div>
          </div>


          <div class="item-post">
              <div class="aspect-ratio-container">
            <img src="https://i.imgflip.com/707bul.png" class="post-image" alt="Post Image"/>
        </div>
              <div class="post-details">
                  <div class="post-footer">
                      <ul class="post-footer-list">
                          <li class="post-username">Tan Le</li>
                          <li class="post-date">23/12/2022</li>
                      </ul>
                  </div>
                  <h2 class="post-title">Thông báo về Death Click (Chrome Extension)</h2>
                  <p class="post-description">
                      Hình thành Thời gian đầu khi mình mới tạo nhóm J2TEAM Community, Facebook...
                  </p>
              </div>
          </div>

          <div class="item-post">
              <div class="aspect-ratio-container">
            <img src="https://i.imgflip.com/707bul.png" class="post-image" alt="Post Image"/>
        </div>
              <div class="post-details">
                  <div class="post-footer">
                      <ul class="post-footer-list">
                          <li class="post-username">Tan Le</li>
                          <li class="post-date">23/12/2022</li>
                      </ul>
                  </div>
                  <h2 class="post-title">Thông báo về Death Click (Chrome Extension)</h2>
                  <p class="post-description">
                      Hình thành Thời gian đầu khi mình mới tạo nhóm J2TEAM Community, Facebook...
                  </p>
              </div>
          </div>

          <div class="item-post">
              <div class="aspect-ratio-container">
            <img src="https://i.imgflip.com/707bul.png" class="post-image" alt="Post Image"/>
        </div>
              <div class="post-details">
                  <div class="post-footer">
                      <ul class="post-footer-list">
                          <li class="post-username">Tan Le</li>
                          <li class="post-date">23/12/2022</li>
                      </ul>
                  </div>
                  <h2 class="post-title">Thông báo về Death Click (Chrome Extension)</h2>
                  <p class="post-description">
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