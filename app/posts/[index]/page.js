import React from 'react';

import '../css/style/Post/Post.css';

import dynamic from 'next/dynamic';
import PostContent from '../Component/PostContent';

const MiniProfile = dynamic(() => import('../../../app/Components/Dialog/MiniProfile.js'), { ssr: false });
const EditUserName = dynamic(() => import('../../../app/Components/Dialog/EditUserName.js'), { ssr: false });

export async function generateMetadata({ params }) {
  const { index } = params;
  const postData = await fetch(`https://html-back.abelonokieepmi.workers.dev?id=${index}`).then((res) => res.json());
  return {
    title: postData.title,
    description: postData.stitle,
  };
}

export default async function Page({ params }) {
  const { index } = params;

  // Fetch data for page rendering
  const postData = await fetch(`https://html-back.abelonokieepmi.workers.dev?id=${index}`).then((res) => res.json());

  return (
    <div className='contain-mypost-content'>
      <div className="mypost-content">
        <PostContent postData={postData} idFile={index} />
      </div>
      <MiniProfile />
      <EditUserName />
    </div>
  );
}
