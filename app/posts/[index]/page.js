import React from 'react';

import '../css/style/Post/Post.css';

import { host_post_image_domain, host_post_json_domain } from '../env';
import PostContent from '../Component/PostContent';

const getRandomHostUrl = () => {
  return host_post_json_domain[Math.floor(Math.random() * host_post_json_domain.length)];
};

export async function generateMetadata({ params }) {
  const { index } = params;
  const postData = await fetch(`${getRandomHostUrl()}?id=${index}`).then((res) => res.json());

  const fullTitle = postData.title;
  const sentences = fullTitle.match(/[^.!?]+[.!?]*/g) || [];
  const keywords = [fullTitle, ...sentences].join(', ');

  return {
    title: postData.title,
    description: postData.stitle,
    keywords,
    openGraph: {
      images: [`${host_post_image_domain}/?id=${postData?.content[0]?.id}`],
    },
  };
}

export default async function Page({ params }) {

  const { index } = params;
  const postData = await fetch(`${getRandomHostUrl()}?id=${index}`).then((res) => res.json());

  return (
    <div className='contain-mypost-content'>
      <div className="mypost-content">
        <PostContent postData={postData} idFile={index} />
      </div>
    </div>
  );
}