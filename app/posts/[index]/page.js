import React from 'react';

import '../css/style/Post/Post.css';

import PostContent from '../Component/PostContent';

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
    </div>
  );
}
